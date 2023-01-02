import chalk from 'chalk'
import _, { indexOf } from 'lodash'

import { Text, code } from '~'
import type { TextResultType, TextTokenType } from '~'

import { Fold } from './type.js'
import type {
  FoldNodeType,
  FoldResultType,
  FoldTermFragmentType,
} from './type.js'

// export * from './close-evaluation.js'
export * from './close-interpolation.js'

export * from './close-line.js'
// export * from './close-parenthesis.js'
export * from './close-text.js'
export * from './comma.js'

// export * from './comment.js'
// export * from './decimal.js'
// export * from './hashtag.js'
export * from './line.js'

// export * from './open-evaluation.js'
export * from './open-indentation.js'

export * from './open-line.js'
// export * from './open-interpolation.js'
export * from './open-nesting.js'
// export * from './open-parenthesis.js'
export * from './open-text.js'
export * from './path.js'
// export * from './signed-integer.js'
export * from './string.js'
export * from './term-fragment.js'
export * from './type.js'
export * from './unsigned-integer.js'

export type FoldNestType = {
  list: Array<FoldNestType>
  parent?: FoldNestType
}

export type FoldStateHandleType = (
  input: FoldStateInputType,
) => void

export type FoldStateInputType = TextResultType & {
  state: FoldStateType
  token: TextTokenType<Text> | FoldNodeType
}

export type FoldStateType = {
  applyFragments: (token: TextTokenType<Text>) => void
  base: <T extends Fold>(like: T) => { id: number; like: T }
  count: (like: Fold) => number
  index: number
  lines: Array<any>
  nest: FoldNestType
  nextNestLevel: number
  notifyIndent: (miss?: boolean) => void
  previousNestLevel: number
  result: Array<FoldNodeType>
  stack: Array<Fold>
}

export function generateLinkTextBuildingDirections(
  input: TextResultType,
): FoldResultType {
  const result: Array<FoldNodeType> = []

  const intermediate: Array<
    FoldNodeType | TextTokenType<Text>
  > = []

  const intermediate2: Array<
    FoldNodeType | TextTokenType<Text>
  > = []

  const stack: Array<Fold> = [Fold.OpenModule]
  const counter: Record<string, number> = {}

  let previousNestLevel = 0
  let nextNestLevel = 0

  function count(like: Fold): number {
    counter[like] = counter[like] || 1
    return counter[like]++
  }

  function base<T extends Fold>(like: T) {
    return {
      id: count(like),
      like,
    }
  }

  result.push(base(Fold.OpenModule))

  const state: FoldStateType = {
    applyFragments,
    base,
    count,
    index: 0,
    lines: [],
    nest: {
      list: [],
    },
    nextNestLevel,
    notifyIndent,
    previousNestLevel,
    result,
    stack,
  }

  const stateInput = {
    ...input,
    state,
  }

  if (
    input.tokenList[0] &&
    input.tokenList[0].like !== Text.Line
  ) {
    // intermediate.push(base(Fold.OpenLine))
  }

  // state.index = 0
  // while (state.index < input.tokenList.length) {
  //   const token = input.tokenList[state.index]
  //   switch (token?.like) {
  //     case Text.Line: {
  //       if (state.index > 0) {
  //         intermediate.push(base(Fold.CloseLine))
  //       }
  //       intermediate.push(base(Fold.OpenLine))
  //       break
  //     }
  //     default:
  //       if (token) {
  //         intermediate.push(token)
  //       }
  //       break
  //   }
  //   state.index++
  // }

  state.index = 0

  while (state.index < input.tokenList.length) {
    const token = input.tokenList[state.index]
    switch (token?.like) {
      //   case Fold.OpenLine:
      //   case Fold.CloseLine: {
      //     intermediate2.push(token)
      //     state.index++
      //     break
      //   }
      case Text.TermFragment: {
        intermediate2.push(
          ...handleTermFragment({
            ...stateInput,
            token,
          }),
        )
        break
      }
      case Text.OpenInterpolation: {
        throw new Error()
      }
      default:
        if (token) {
          intermediate2.push(token)
          state.index++
        }
        break
    }
  }
  console.log(
    input.tokenList
      .map(x => `${x.like} - ${x.text}`)
      .join('\n'),
  )

  logDirectionList(intermediate2)

  function handleText(input: FoldStateInputType): void {}

  function handleNest(
    input: FoldStateInputType,
    array: Array<FoldNodeType | TextTokenType<Text>> = [],
  ): Array<FoldNodeType | TextTokenType<Text>> {
    const result: Array<FoldNodeType | TextTokenType<Text>> = []
    array.push(base(Fold.OpenNest))

    loop: while (state.index < input.tokenList.length) {
      const token = input.tokenList[state.index++]
      check: switch (token?.like) {
        case Text.TermFragment: {
          state.index--
          array.push(
            ...handleTermFragment({
              ...input,
              token,
            }),
          )
          break loop
        }
        default:
          state.index--
          break loop
      }
    }

    array.push(base(Fold.CloseNest))
    return array
  }

  function handleTermFragment(
    input: FoldStateInputType,
    depth = 0,
  ): Array<FoldNodeType | TextTokenType<Text>> {
    const array: Array<FoldNodeType | TextTokenType<Text>> = []
    let interpolationStack = 0
    loop: while (state.index < input.tokenList.length) {
      const token = input.tokenList[state.index++]
      check: switch (token?.like) {
        case Text.TermFragment: {
          // console.log(token)
          const frags = generateTermFragments(token)

          frags.forEach((frag, i) => {
            array.push(frag)
            array.push(base(Fold.TermSeparator))
          })

          array.pop()

          break check
        }
        case Text.OpenInterpolation: {
          interpolationStack++
          array.push({
            size: token.text.length,
            ...base(Fold.OpenPlugin),
          })
          array.push(
            ...handleTermFragment(
              {
                ...input,
                token,
              },
              depth + 1,
            ),
          )
          break check
        }
        case Text.Comma: {
          break loop
        }
        case Text.OpenNesting: {
          array.push(base(Fold.CloseTerm))
          array.push(
            ...handleNest({
              ...input,
              token,
            }),
          )
          break
        }
        case Text.CloseInterpolation: {
          if (interpolationStack > 0) {
            array.push(base(Fold.ClosePlugin))
            interpolationStack--
          } else {
            state.index--
            break loop
          }
          break check
        }
        case Text.Path: {
          const frags = generateTermFragments(token)

          frags.forEach((frag, i) => {
            array.push(frag)
            array.push(base(Fold.TermSeparator))
          })

          array.pop()
          break check
        }
        default:
          state.index--
          break loop
      }
    }

    const isPath =
      array.filter(x => x.like === Fold.TermSeparator).length >
      0

    const result: Array<FoldNodeType | TextTokenType<Text>> = []

    // if (depth === 0) {
    //   console.log(array)
    // }

    if (isPath) {
      result.push(base(Fold.OpenTermPath))
      result.push(base(Fold.OpenTerm))
      array.forEach((x, i) => {
        if (x.like === Fold.TermSeparator) {
          result.push(base(Fold.CloseTerm))
          result.push(base(Fold.OpenTerm))
        } else {
          result.push(x)
        }
      })
      result.push(base(Fold.CloseTerm))
      result.push(base(Fold.CloseTermPath))
    } else {
      result.push(base(Fold.OpenTerm))
      array.forEach(x => {
        result.push(x)
      })
      result.push(base(Fold.CloseTerm))
    }

    return result
  }

  logDirectionList(intermediate2)

  return

  for (const token of intermediate2) {
    const top = assertTop()
    const leafName = `fold_${_.camelCase(
      cleanText(token.like),
    )}_${_.camelCase(cleanText(top))}`
    const branchName = `fold_${_.camelCase(
      cleanText(token.like),
    )}`

    console.log(leafName)

    const leaf = (code as Record<string, unknown>)[leafName]

    if (leaf) {
      ;(leaf as FoldStateHandleType)({
        ...stateInput,
        token,
      })
      continue
    }

    const branch = (code as Record<string, unknown>)[branchName]

    if (branch) {
      ;(branch as FoldStateHandleType)({
        ...stateInput,
        token,
      })
      continue
    }

    code.throwError(
      code.generatedNotImplementedYetError(
        `${token.like} -> ${top} (${leafName}, ${branchName})`,
      ),
    )
  }

  function notifyIndent(minus = false) {
    let diff = state.nextNestLevel - state.previousNestLevel
    state.previousNestLevel = state.nextNestLevel
    state.nextNestLevel = 0

    if (diff > 0) {
      result.push(base(Fold.OpenHandle))
      stack.push(Fold.OpenHandle)
    } else if (diff < 0) {
      while (diff++ <= 0) {
        result.push(base(Fold.CloseHandle))
        stack.pop()
      }
    }
  }

  function applyFragments(token: TextTokenType<Text>) {
    const fragments = generateTermFragments(token)

    fragments.forEach((frag, i) => {
      result.push({
        ...frag,
      })

      if (i > 0 && i < fragments.length - 2) {
        result.push(base(Fold.CloseTerm))
        result.push(base(Fold.OpenTerm))
      }
    })
  }

  while (stack.length) {
    const top = stack.pop()
    switch (top) {
      case Fold.OpenHandle: {
        result.push(base(Fold.CloseHandle))
        break
      }
      case Fold.OpenModule: {
        result.push(base(Fold.CloseModule))
        break
      }
      default:
        break
    }
  }

  function assertTop(): string {
    const top = stack[stack.length - 1]
    code.assertString(top, 'top')
    return top
  }

  function generateTermFragments(
    token: TextTokenType<Text>,
  ): Array<FoldTermFragmentType> {
    const parts = token.text.split('/')

    return parts.map((fragment, i) => {
      const dereference = Boolean(fragment.match(/\*/))
      const guard = Boolean(fragment.match(/\?/))
      const query = Boolean(fragment.match(/~/))
      const name = fragment.replace(/[\*\~\?]/g, '')
      const upto = parts.slice(0, i).join('').length
      const character = {
        end:
          token.range.character.start +
          upto +
          fragment.length +
          i,
        start: token.range.character.start + upto + i,
      }
      const line = {
        end: token.range.line.start,
        start: token.range.line.start,
      }
      const offset = {
        end:
          token.range.offset.start + upto + fragment.length + i,
        start: token.range.offset.start,
      }
      return {
        dereference,
        guard,
        offset,
        query,
        range: {
          character,
          line,
          offset,
        },
        start: i > 0,
        value: name,
        ...base(Fold.TermFragment),
        like: Fold.TermFragment,
      }
    })
  }

  // console.log(result.map(x => x.like).join('\n'))

  logDirectionList(result)

  return {
    ...input,
    directions: result,
  }
}

function logDirectionList(
  directionList: Array<FoldNodeType>,
): void {
  const tree: Array<string> = ['']

  let indent = 1
  let yay = 0
  let nay = 0

  directionList.forEach(direction => {
    let color = chalk.gray
    let diff = 0
    let type = 'neutral'
    if (direction.like.match('open')) {
      indent++
      yay++
      color = chalk.green
      type = 'open'
    } else if (direction.like.match('close')) {
      diff = -1
      nay++
      color = chalk.yellow
      type = 'close'
    }

    const indentText = new Array(
      Math.max(
        0,
        type.match(/open|close/) ? indent : indent + 1,
      ),
    ).join('  ')
    const value = chalk.whiteBright(
      'value' in direction
        ? direction.value
        : 'text' in direction
        ? direction.text
        : '',
    )
    const symbol = chalk.gray(
      '', // type === 'close' ? nay : type === 'open' ? yay : '',
    )
    tree.push(
      `  ${indentText}${color(
        direction.like,
      )} ${value} ${symbol}`,
    )
    indent += diff
  })

  tree.push('')

  console.log(tree.join('\n'))
}

function cleanText(text: string): string {
  return text.replace(/^(text|fold)-/, '')
}

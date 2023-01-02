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

export * from './type.js'

export type FoldNestType = {
  list: Array<FoldNestType>
  parent?: FoldNestType
}

export type FoldStateHandleType = (
  input: FoldStateInputType,
) => void

export type FoldStateInputType = TextResultType & {
  state: FoldStateType
}

export type FoldStateType = {
  base: <T extends Fold>(like: T) => { id: number; like: T }
  count: (like: Fold) => number
  index: number
  result: Array<FoldNodeType>
  stack: Array<Fold>
}

export function generateLinkTextBuildingDirections(
  input: TextResultType,
): FoldResultType {
  const result: Array<FoldNodeType> = []

  const stack: Array<Fold> = [Fold.OpenModule]
  const counter: Record<string, number> = {}

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

  // result.push(base(Fold.OpenModule))

  const state: FoldStateType = {
    base,
    count,
    index: 0,
    result,
    stack,
  }

  const stateInput = {
    ...input,
    state,
  }

  state.index = 0

  let indent = 0
  let fromLine = false

  while (state.index < input.tokenList.length) {
    const token = input.tokenList[state.index]
    if (token) {
      switch (token.like) {
        //   case Fold.OpenLine:
        //   case Fold.CloseLine: {
        //     intermediate2.push(token)
        //     state.index++
        //     break
        //   }
        case Text.TermFragment: {
          fromLine = false
          result.push(...handleTermFragment(stateInput))
          break
        }
        case Text.OpenIndentation: {
          if (!fromLine) {
            code.throwError(
              code.generateInvalidWhitespaceError(stateInput),
            )
          }
          indent++
          result.push(base(Fold.OpenNest))
          state.index++
          break
        }
        case Text.OpenNesting: {
          code.throwError(
            code.generateInvalidWhitespaceError(stateInput),
          )
          break
        }
        case Text.Line: {
          while (indent > 0) {
            result.push(base(Fold.CloseNest))
            indent--
          }
          fromLine = true
          state.index++
          break
        }
        case Text.CloseEvaluation:
        case Text.CloseInterpolation:
        case Text.CloseParenthesis:
        case Text.CloseText:
        case Text.OpenEvaluation:
        case Text.OpenInterpolation:
        case Text.OpenNesting:
        case Text.OpenParenthesis:
        case Text.OpenText:
        case Text.Comma: {
          throw new Error(input.text)
        }
        case Text.Comment: {
          state.index++
          fromLine = false
          break
        }

        case Text.UnsignedInteger: {
          fromLine = false
          result.push({
            ...token,
            value: parseInt(token.text, 10),
            ...base(Fold.UnsignedInteger),
          })
          state.index++
          break
        }
        case Text.SignedInteger: {
          fromLine = false
          result.push({
            ...token,
            value: parseInt(token.text, 10),
            ...base(Fold.SignedInteger),
          })
          state.index++
          break
        }
        case Text.Decimal: {
          fromLine = false
          result.push({
            ...token,
            value: parseFloat(token.text),
            ...base(Fold.Decimal),
          })
          state.index++
          break
        }
        case Text.OpenPath: {
          fromLine = false
          result.push(...handlePath(stateInput))
          break
        }
        case Text.Hashtag: {
          fromLine = false
          const [hashtag, system = '', ...code] = token.text
          result.push({
            ...token,
            code: code.join(''),
            system,
            ...base(Fold.Hashtag),
          })
          state.index++
          break
        }
        default:
          fromLine = false
          state.index++
          break
      }
    }
  }

  // result.push(base(Fold.CloseModule))

  function handlePath(
    input: FoldStateInputType,
  ): Array<FoldNodeType> {
    const array: Array<FoldNodeType> = []
    array.push(base(Fold.OpenText))

    let interpolationStack = 0

    loop: while (state.index < input.tokenList.length) {
      const token = input.tokenList[state.index++]
      check: switch (token?.like) {
        case Text.String:
        case Text.Path: {
          array.push({
            ...token,
            value: token.text,
            ...base(Fold.String),
          })
          break check
        }
        case Text.OpenPath: {
          array.push({
            ...token,
            value: token.text,
            ...base(Fold.String),
          })
          break check
        }
        case Text.ClosePath: {
          break loop
        }
        case Text.OpenInterpolation: {
          interpolationStack++
          array.push({
            size: token.text.length,
            ...base(Fold.OpenPlugin),
          })
          array.push(...handleTermFragment(input))
          break check
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
        case Text.TermFragment: {
          state.index--
          array.push(...handleTermFragment(input))
          break
        }
        default:
          break loop
      }
    }

    array.push(base(Fold.CloseText))
    return array
  }

  function handleText(
    input: FoldStateInputType,
  ): Array<FoldNodeType> {
    const array: Array<FoldNodeType> = []
    array.push(base(Fold.OpenText))

    let interpolationStack = 0

    loop: while (state.index < input.tokenList.length) {
      const token = input.tokenList[state.index++]
      check: switch (token?.like) {
        case Text.String: {
          array.push({
            ...token,
            value: token.text,
            ...base(Fold.String),
          })
          break check
        }
        case Text.OpenInterpolation: {
          interpolationStack++
          array.push({
            size: token.text.length,
            ...base(Fold.OpenPlugin),
          })
          array.push(...handleTermFragment(input))
          break check
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
        default:
          break loop
      }
    }

    array.push(base(Fold.CloseText))
    return array
  }

  function handleNest(
    input: FoldStateInputType,
    array: Array<FoldNodeType> = [],
  ): Array<FoldNodeType> {
    array.push(base(Fold.OpenNest))
    handleNestContent(input, array)
    array.push(base(Fold.CloseNest))
    return array
  }

  function handleNestContent(
    input: FoldStateInputType,
    array: Array<FoldNodeType> = [],
  ): Array<FoldNodeType> {
    loop: while (state.index < input.tokenList.length) {
      const token = input.tokenList[state.index++]
      check: switch (token?.like) {
        case Text.TermFragment: {
          state.index--
          array.push(...handleTermFragment(input))
          break
        }
        case Text.Comma: {
          break
        }
        case Text.UnsignedInteger: {
          array.push({
            ...token,
            value: parseInt(token.text, 10),
            ...base(Fold.UnsignedInteger),
          })
          break
        }
        case Text.SignedInteger: {
          array.push({
            ...token,
            value: parseInt(token.text, 10),
            ...base(Fold.SignedInteger),
          })
          break
        }
        case Text.OpenPath: {
          state.index--
          array.push(...handlePath(stateInput))
          break
        }
        case Text.Decimal: {
          array.push({
            ...token,
            value: parseFloat(token.text),
            ...base(Fold.Decimal),
          })
          break
        }
        case Text.Hashtag: {
          const [hashtag, system = '', ...code] = token.text
          array.push({
            ...token,
            code: code.join(''),
            system,
            ...base(Fold.Hashtag),
          })
          break
        }
        case Text.OpenText: {
          array.push(...handleText(input))
          break
        }
        default:
          state.index--
          break loop
      }
    }

    return array
  }

  function handleParenthesis(
    input: FoldStateInputType,
    array: Array<FoldNodeType> = [],
  ): Array<FoldNodeType> {
    let bracketStack = 0
    loop: while (state.index < input.tokenList.length) {
      const token = input.tokenList[state.index++]
      check: switch (token?.like) {
        case Text.OpenParenthesis: {
          bracketStack++
          array.push(base(Fold.OpenNest))
          handleNestContent(input, array)
          break
        }
        case Text.CloseParenthesis: {
          if (bracketStack > 0) {
            array.push(base(Fold.CloseIndex))
            bracketStack--
          } else {
            state.index--
            break loop
          }
          break
        }
        // case Text.TermFragment:
        // case Text.Comma:
        // case Text.UnsignedInteger:
        // case Text.SignedInteger:
        // case Text.OpenPath:
        // case Text.Decimal:
        // case Text.Hashtag:
        // case Text.OpenText:
        //   handleNestContent(input, array)
        //   console.log('nest', input.tokenList[state.index])
        //   break
        default:
          state.index--
          break loop
      }
    }
    return array
  }

  function handleTermFragment(
    input: FoldStateInputType,
    depth = 0,
  ): Array<FoldNodeType> {
    let array: Array<FoldNodeType> = []
    const tail: Array<FoldNodeType> = []

    let bracketStack = 0
    let hasSeparator = false
    let hasIndex = false
    loop: while (state.index < input.tokenList.length) {
      const token = input.tokenList[state.index++]
      check: switch (token?.like) {
        case Text.OpenParenthesis: {
          state.index--
          tail.push(...handleParenthesis(input))
          break
        }
        case Text.TermFragment: {
          // console.log(token)
          const frags = generateTermFragments(token)
          const list: Array<FoldNodeType> = []

          frags.forEach((frag, i) => {
            if (frag.value) {
              list.push(frag)
            }

            if (i < frags.length - 1) {
              hasSeparator = true
              list.push(base(Fold.CloseTerm))
              list.push(base(Fold.OpenTerm))
            }
          })

          array.push(...list)

          break check
        }
        case Text.OpenEvaluation: {
          bracketStack++
          hasIndex = true
          array.push(base(Fold.OpenIndex))
          array.push(...handleTermFragment(input, depth + 1))
          break
        }
        case Text.CloseEvaluation: {
          if (bracketStack > 0) {
            array.push(base(Fold.CloseIndex))
            bracketStack--
          } else {
            state.index--
            break loop
          }
          break check
        }
        case Text.OpenInterpolation: {
          bracketStack++
          array.push({
            size: token.text.length,
            ...base(Fold.OpenPlugin),
          })
          array.push(...handleTermFragment(input, depth + 1))
          break check
        }
        case Text.CloseInterpolation: {
          if (bracketStack > 0) {
            array.push(base(Fold.ClosePlugin))
            bracketStack--
          } else {
            state.index--
            break loop
          }
          break check
        }
        case Text.OpenNesting: {
          tail.push(...handleNest(input))
          break loop
        }
        case Text.Path: {
          const frags = generateTermFragments(token)

          const list: Array<FoldNodeType> = []

          list.push(base(Fold.OpenTerm))
          frags.forEach((frag, i) => {
            if (frag.value) {
              list.push(frag)
            }

            if (i < frags.length - 1) {
              hasSeparator = true
              list.push(base(Fold.CloseTerm))
              list.push(base(Fold.OpenTerm))
            }
          })

          list.push(base(Fold.CloseTerm))

          array.push(...list)
          break check
        }
        default:
          state.index--
          break loop
      }
    }

    if (array[array.length - 1]?.like === Fold.TermSeparator) {
      array.pop()
    }

    const result: Array<FoldNodeType> = []

    // if (depth === 0) {
    //   console.log(array)
    // }

    if (hasIndex) {
      result.push(base(Fold.OpenTermPath))
      result.push(base(Fold.OpenTerm))

      array.forEach(x => {
        if (x.like === Fold.OpenIndex) {
          result.push(base(Fold.CloseTerm))
        }
        result.push(x)
      })

      result.push(base(Fold.CloseTermPath))
    } else if (hasSeparator) {
      result.push(base(Fold.OpenTermPath))
      result.push(base(Fold.OpenTerm))

      array.forEach(x => {
        result.push(x)
      })

      result.push(base(Fold.CloseTerm))
      result.push(base(Fold.CloseTermPath))
    } else {
      if (tail.length) {
        result.push(base(Fold.OpenHandle))
      }
      result.push(base(Fold.OpenTerm))
      array.forEach(x => {
        result.push(x)
      })
      result.push(base(Fold.CloseTerm))

      if (tail.length) {
        result.push(base(Fold.CloseHandle))
      }
    }

    result.push(...tail)

    return result
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

  // console.log(tree.join('\n'))
}

function cleanText(text: string): string {
  return text.replace(/^(text|fold)-/, '')
}

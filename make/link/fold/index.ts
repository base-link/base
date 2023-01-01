import chalk from 'chalk'

import { Text, code } from '~'
import type { TextResultType, TextTokenType } from '~'

import { Fold } from './type.js'
import type {
  FoldNodeType,
  FoldResultType,
  FoldTermFragmentType,
} from './type.js'

export * from './type.js'

export function generateLinkTextBuildingDirections(
  input: TextResultType,
): FoldResultType {
  const result: Array<FoldNodeType> = []

  console.log(input)

  let i = 0

  const stack: Array<Fold> = [Fold.OpenModule]
  const counter: Record<string, number> = {}

  let previousNestLevel = 0
  let nextNestLevel = 0

  function count(like: Fold): number {
    counter[like] = counter[like] || 1
    return counter[like]++
  }

  result.push(base(Fold.OpenModule))

  function base<T extends Fold>(like: T) {
    return {
      id: count(like),
      like,
    }
  }

  for (const token of input.tokenList) {
    const top = assertTop()

    switch (token.like) {
      case Text.CloseEvaluation: {
        code.throwError(
          code.generatedNotImplementedYetError(top),
        )
        break
      }
      case Text.CloseInterpolation: {
        switch (top) {
          case Fold.OpenPlugin: {
            result.push(base(Fold.ClosePlugin))
            stack.pop()
            break
          }
          case Fold.OpenTerm: {
            result.push(base(Fold.CloseTerm))
            stack.pop()
            result.push(base(Fold.CloseTermPath))
            stack.pop()
            result.push(base(Fold.CloseHandle))
            stack.pop()
            result.push(base(Fold.ClosePlugin))
            stack.pop()
            break
          }
          case Fold.OpenDepth: {
            result.push(base(Fold.CloseDepth))
            stack.pop()
            break
          }
          case Fold.OpenHandle: {
            result.push(base(Fold.CloseHandle))
            stack.pop()
            break
          }
          default:
            code.throwError(
              code.generatedNotImplementedYetError(top),
            )
        }
        break
      }
      case Text.CloseParenthesis: {
        code.throwError(
          code.generatedNotImplementedYetError(top),
        )
        break
      }
      case Text.CloseText: {
        switch (top) {
          case Fold.CloseDepth: {
            result.push(base(Fold.CloseText))
            break
          }
          case Fold.OpenText: {
            result.push(base(Fold.CloseText))
            stack.pop()
            break
          }
          default:
            code.throwError(
              code.generatedNotImplementedYetError(top),
            )
        }
        break
      }
      case Text.Comma: {
        switch (top) {
          case Fold.OpenTerm: {
            result.push(base(Fold.CloseTerm))
            stack.pop()
            result.push(base(Fold.CloseTermPath))
            stack.pop()
            break
          }
          default:
            code.throwError(
              code.generatedNotImplementedYetError(top),
            )
        }
        break
      }
      case Text.Comment: {
        code.throwError(
          code.generatedNotImplementedYetError(top),
        )
        break
      }
      case Text.Decimal: {
        code.throwError(
          code.generatedNotImplementedYetError(top),
        )
        break
      }
      case Text.Hashtag: {
        code.throwError(
          code.generatedNotImplementedYetError(top),
        )
        break
      }
      case Text.Line: {
        nextNestLevel = 0
        switch (top) {
          case Fold.OpenHandle: {
            break
          }
          case Fold.OpenDepth: {
            break
          }
          case Fold.OpenModule: {
            break
          }
          case Fold.OpenTerm: {
            result.push(base(Fold.CloseTerm))
            stack.pop()

            result.push(base(Fold.CloseTermPath))
            stack.pop()
            break
          }
          case Fold.String: {
            result.push({
              ...token,
              ...base(Fold.String),
            })
            break
          }
          case Fold.OpenIndentation: {
            break
          }
          default:
            code.throwError(
              code.generatedNotImplementedYetError(top),
            )
        }
        break
      }
      case Text.OpenEvaluation: {
        code.throwError(
          code.generatedNotImplementedYetError(top),
        )
        break
      }
      case Text.OpenIndentation: {
        nextNestLevel++
        switch (top) {
          case Fold.OpenHandle: {
            stack.push(Fold.OpenIndentation)
            break
          }
          case Fold.OpenModule: {
            stack.push(Fold.OpenIndentation)
            break
          }
          case Fold.OpenIndentation: {
            break
          }
          case Fold.OpenDepth: {
            stack.push(Fold.OpenIndentation)
            break
          }
          default:
            code.throwError(
              code.generatedNotImplementedYetError(top),
            )
        }
        break
      }
      case Text.OpenInterpolation: {
        switch (top) {
          case Fold.OpenTerm:
          case Fold.OpenHandle: {
            stack.push(Fold.OpenPlugin)
            result.push({
              size: token.text.length,
              ...base(Fold.OpenPlugin),
            })
            break
          }
          case Fold.OpenDepth: {
            break
          }
          default:
            code.throwError(
              code.generatedNotImplementedYetError(top),
            )
        }
        break
      }
      case Text.OpenNesting: {
        previousNestLevel++
        switch (top) {
          case Fold.OpenTerm: {
            result.push(base(Fold.CloseTerm))
            stack.pop()

            result.push(base(Fold.CloseTermPath))
            stack.pop()

            result.push(base(Fold.OpenDepth))
            stack.push(Fold.OpenDepth)
            break
          }
          case Fold.OpenTermPath: {
            result.push(base(Fold.CloseTermPath))
            stack.pop()

            result.push(base(Fold.OpenDepth))
            stack.push(Fold.OpenDepth)
            break
          }
          case Fold.OpenHandle: {
            result.push(base(Fold.OpenDepth))
            stack.push(Fold.OpenDepth)
            break
          }
          default:
            code.throwError(
              code.generatedNotImplementedYetError(top),
            )
        }
        break
      }
      case Text.OpenParenthesis: {
        code.throwError(
          code.generatedNotImplementedYetError(top),
        )
        break
      }
      case Text.OpenText: {
        switch (top) {
          case Fold.OpenDepth: {
            result.push(base(Fold.OpenText))
            stack.push(Fold.OpenText)
            break
          }
          default:
            code.throwError(
              code.generatedNotImplementedYetError(top),
            )
        }
        break
      }
      case Text.Path: {
        switch (top) {
          case Fold.OpenDepth: {
            result.push({
              ...token,
              ...base(Fold.String),
            })
            break
          }
          default:
            code.throwError(
              code.generatedNotImplementedYetError(top),
            )
        }
        break
      }
      case Text.SignedInteger: {
        code.throwError(
          code.generatedNotImplementedYetError(top),
        )
        break
      }
      case Text.String: {
        switch (top) {
          case Fold.OpenText: {
            result.push({
              ...token,
              ...base(Fold.String),
            })
            break
          }
          default:
            code.throwError(
              code.generatedNotImplementedYetError(top),
            )
        }
      }
      case Text.TermFragment: {
        switch (top) {
          case Fold.OpenModule: {
            result.push(base(Fold.OpenHandle))
            stack.push(Fold.OpenHandle)

            result.push(base(Fold.OpenTermPath))
            stack.push(Fold.OpenTermPath)

            result.push(base(Fold.OpenTerm))
            stack.push(Fold.OpenTerm)

            applyFragments(token)
            break
          }
          case Fold.OpenPlugin: {
            result.push(base(Fold.OpenHandle))
            stack.push(Fold.OpenHandle)

            result.push(base(Fold.OpenTermPath))
            stack.push(Fold.OpenTermPath)

            result.push(base(Fold.OpenTerm))
            stack.push(Fold.OpenTerm)

            applyFragments(token)
            break
          }
          case Fold.OpenDepth: {
            result.push(base(Fold.OpenHandle))
            stack.push(Fold.OpenHandle)

            result.push(base(Fold.OpenTermPath))
            stack.push(Fold.OpenTermPath)

            result.push(base(Fold.OpenTerm))
            stack.push(Fold.OpenTerm)

            applyFragments(token)
            break
          }
          case Fold.OpenHandle: {
            result.push(base(Fold.OpenTermPath))
            stack.push(Fold.OpenTermPath)

            result.push(base(Fold.OpenTerm))
            stack.push(Fold.OpenTerm)

            applyFragments(token)
            break
          }
          case Fold.OpenTerm: {
            applyFragments(token)
            break
          }
          case Fold.OpenText: {
            break
          }
          case Fold.String: {
            break
          }
          case Fold.OpenIndentation: {
            stack.pop()
            notifyIndent()

            result.push(base(Fold.OpenTermPath))
            stack.push(Fold.OpenTermPath)

            result.push(base(Fold.OpenTerm))
            stack.push(Fold.OpenTerm)

            applyFragments(token)
            break
          }
          default:
            code.throwError(
              code.generatedNotImplementedYetError(top),
            )
        }
        break
      }
      case Text.UnsignedInteger: {
        result.push({
          ...base(Fold.UnsignedInteger),
          value: parseInt(token.text, 10),
        })
        break
      }
      default:
        code.throwError(
          code.generatedNotImplementedYetError(top),
        )
    }
    i++
  }

  function notifyIndent() {
    let diff = nextNestLevel - previousNestLevel
    previousNestLevel = nextNestLevel
    nextNestLevel = 0

    if (diff > 0) {
      result.push(base(Fold.OpenDepth))
    } else if (diff < 0) {
      while (diff++ <= 0) {
        let top = assertTop()
        if (top === Fold.OpenHandle) {
          result.push(base(Fold.CloseHandle))
          stack.pop()
        }

        top = assertTop()
        if (top === Fold.OpenDepth) {
          result.push(base(Fold.CloseDepth))
          stack.pop()
        }
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
      case Fold.OpenDepth: {
        result.push(base(Fold.CloseDepth))
        break
      }
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
        end: token.start.character + upto + fragment.length + i,
        start: token.start.character + upto + i,
      }
      const line = {
        end: token.start.line,
        start: token.start.line,
      }
      const offset = {
        end: token.offset.start + upto + fragment.length + i,
        start: token.offset.start,
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

    const indentText = new Array(Math.max(0, indent + 1)).join(
      '  ',
    )
    const value = chalk.whiteBright(
      'value' in direction || 'text' in direction
        ? `${direction.value || direction.text}`
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

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

  let currentIndent = 0
  let previousIndent = 0

  let previousNestLevel = 0
  let nextNestLevel = 0

  function count(like: Fold): number {
    counter[like] = counter[like] || 1
    return counter[like]++
  }

  function captureIndent() {
    if (previousIndent === 0) {
      previousIndent = currentIndent
      currentIndent = 0
    }
  }

  function clearIndent(prev = 0) {
    previousIndent = prev
    currentIndent = 0
  }

  function indent() {
    currentIndent += 1
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
            // result.push(base(Fold.CloseHandle))
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
            // result.push(base(Fold.CloseDepth))
            // stack.pop()
            // stack.pop()
            break
          }
          case Fold.OpenText: {
            result.push(base(Fold.CloseText))
            // result.push(base(Fold.CloseDepth))
            stack.pop()
            // stack.pop()
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
        // console.log(token)
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
            // result.push(base(Fold.CloseHandle))
            // stack.pop()
            // captureIndent()
            break
          }
          case Fold.OpenDepth: {
            // result.push(base(Fold.CloseDepth))
            // result.push(base(Fold.CloseHandle))
            // stack.pop()
            // stack.pop()
            // captureIndent()
            break
          }
          case Fold.OpenModule: {
            // captureIndent()
            break
          }
          case Fold.OpenTerm: {
            // captureIndent()
            result.push(base(Fold.CloseTerm))
            stack.pop()

            result.push(base(Fold.CloseTermPath))
            stack.pop()
            break
          }
          case Fold.String: {
            // captureIndent()
            result.push({
              ...token,
              ...base(Fold.String),
            })
            break
          }
          case Fold.OpenIndentation: {
            // clearIndent(previousIndent)
            // captureIndent()
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
            stack.pop()
            stack.push(Fold.OpenIndentation)
            // result.push(base(Fold.OpenHandle))
            // stack.push(Fold.OpenHandle)
            break
          }
          case Fold.OpenModule: {
            stack.pop()
            stack.push(Fold.OpenIndentation)
            break
          }
          case Fold.OpenIndentation: {
            // stack.push(Fold.OpenIndentation)
            break
          }
          case Fold.OpenDepth: {
            stack.pop()
            // result.push(base(Fold.CloseDepth))
            // stack.pop()
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
            indent()
            result.push(base(Fold.CloseTerm))
            stack.pop()

            result.push(base(Fold.CloseTermPath))
            stack.pop()

            result.push(base(Fold.OpenDepth))
            stack.push(Fold.OpenDepth)
            break
          }
          case Fold.OpenTermPath: {
            indent()
            result.push(base(Fold.CloseTermPath))
            stack.pop()

            result.push(base(Fold.OpenDepth))
            stack.push(Fold.OpenDepth)
            break
          }
          case Fold.OpenHandle: {
            indent()
            result.push(base(Fold.OpenDepth))
            stack.push(Fold.OpenDepth)
            break
          }
          // case Fold.OpenIndentation: {
          //   notifyIndent()
          //   break
          // }
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
            // stack.push(Fold.String)
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
            // stack.pop()
            break
          }
          case Fold.OpenIndentation: {
            stack.pop()
            notifyIndent()
            // result.push(base(Fold.OpenHandle))
            // stack.push(Fold.OpenHandle)

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

  clearIndent(previousIndent)
  // notifyIndent(false)

  function notifyIndent() {
    let diff = nextNestLevel - previousNestLevel
    previousNestLevel = nextNestLevel
    nextNestLevel = 0
    // if (indentDiff > 1) {
    //   throw new Error(
    //     'Too much ' +
    //       indentDiff +
    //       ` ${currentIndent} - ${previousIndent}`,
    //   )
    // }

    if (diff > 1) {
      result.push(base(Fold.OpenDepth))
    } else if (diff < 0) {
      // while (diff++ < 0) {
      result.push(base(Fold.CloseDepth))
      // }
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

      // if (i < fragments.length - 2) {
      //   result.push(base(Fold.TermSeparator))
      // }
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

  function peek(amount = 1): TextTokenType<Text> | undefined {
    return input.tokenList[i + amount]
  }

  function assertTop(): string {
    const top = stack[stack.length - 1]
    code.assertString(top)
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

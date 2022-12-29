import chalk from 'chalk'

import {
  Lexer,
  LexerTermFragmentTokenType,
  LexerTokenBaseType,
  api,
} from '~'
import type { LexerResultType, LexerTokenType } from '~'

export type EditorRangeType = {
  end: number
  start: number
}

export enum Emitter {
  CloseDepth = 'emitter-close-depth',
  CloseHandle = 'emitter-close-handle',
  CloseIndex = 'emitter-close-index',
  CloseModule = 'emitter-close-module',
  CloseParenthesis = 'emitter-close-parenthesis',
  ClosePlugin = 'emitter-close-plugin',
  CloseTerm = 'emitter-close-term',
  CloseTermPath = 'emitter-close-term-path',
  CloseText = 'emitter-close-text',
  Comma = 'emitter-comma',
  Comment = 'emitter-comment',
  Decimal = 'emitter-decimal',
  Hashtag = 'emitter-hashtag',
  Line = 'emitter-line',
  OpenDepth = 'emitter-open-depth',
  OpenHandle = 'emitter-open-handle',
  OpenIndentation = 'emitter-open-indentation',
  OpenIndex = 'emitter-open-index',
  OpenModule = 'emitter-open-module',
  OpenParenthesis = 'emitter-open-parenthesis',
  OpenPlugin = 'emitter-open-plugin',
  OpenTerm = 'emitter-open-term',
  OpenTermPath = 'emitter-open-term-path',
  OpenText = 'emitter-open-text',
  Path = 'emitter-path',
  SignedInteger = 'emitter-signed-integer',
  String = 'emitter-string',
  TermFragment = 'emitter-term-fragment',
  TermSeparator = 'emitter-term-separator',
  UnsignedInteger = 'emitter-unsigned-integer',
}

export type EmitterCloseDepthType = {
  id: number
  like: Emitter.CloseDepth
}

export type EmitterCloseHandleType = {
  id: number
  like: Emitter.CloseHandle
}

export type EmitterCloseIndexType = {
  id: number
  like: Emitter.CloseIndex
}

export type EmitterCloseModuleType = {
  id: number
  like: Emitter.CloseModule
}

export type EmitterCloseParenthesisType = {
  id: number
  like: Emitter.CloseParenthesis
}

export type EmitterClosePluginType = {
  id: number
  like: Emitter.ClosePlugin
}

export type EmitterCloseTermPathType = {
  id: number
  like: Emitter.CloseTermPath
}

export type EmitterCloseTermType = {
  id: number
  like: Emitter.CloseTerm
}

export type EmitterCloseTextType = {
  id: number
  like: Emitter.CloseText
}

export type EmitterCommaType = {
  id: number
  like: Emitter.Comma
}

export type EmitterCommentType = {
  id: number
  like: Emitter.Comment
}

export type EmitterDecimalType = {
  id: number
  like: Emitter.Decimal
}

export type EmitterHashtagType = {
  id: number
  like: Emitter.Hashtag
}

export type EmitterLineType = {
  id: number
  like: Emitter.Line
}

export type EmitterNodeType =
  | EmitterCloseIndexType
  | EmitterCloseModuleType
  | EmitterCloseParenthesisType
  | EmitterClosePluginType
  | EmitterCloseTermPathType
  | EmitterCloseTermType
  | EmitterCloseTextType
  | EmitterCommaType
  | EmitterCommentType
  | EmitterDecimalType
  | EmitterHashtagType
  | EmitterLineType
  | EmitterOpenDepthType
  | EmitterCloseDepthType
  | EmitterOpenIndentationType
  | EmitterOpenIndexType
  | EmitterOpenModuleType
  | EmitterOpenParenthesisType
  | EmitterOpenPluginType
  | EmitterOpenTermPathType
  | EmitterOpenTermType
  | EmitterOpenTextType
  | EmitterPathType
  | EmitterSignedIntegerType
  | EmitterStringType
  | EmitterTermFragmentType
  | EmitterUnsignedIntegerType
  | EmitterOpenHandleType
  | EmitterCloseHandleType

export type EmitterOpenDepthType = {
  id: number
  like: Emitter.OpenDepth
}

export type EmitterOpenHandleType = {
  id: number
  like: Emitter.OpenHandle
}

export type EmitterOpenIndentationType = {
  id: number
  like: Emitter.OpenIndentation
}

export type EmitterOpenIndexType = {
  id: number
  like: Emitter.OpenIndex
}

export type EmitterOpenModuleType = {
  id: number
  like: Emitter.OpenModule
}

export type EmitterOpenParenthesisType = {
  id: number
  like: Emitter.OpenParenthesis
}

export type EmitterOpenPluginType = Omit<
  LexerTokenBaseType,
  'like'
> & {
  id: number
  like: Emitter.OpenPlugin
}

export type EmitterOpenTermPathType = {
  id: number
  like: Emitter.OpenTermPath
}

export type EmitterOpenTermType = {
  id: number
  like: Emitter.OpenTerm
}

export type EmitterOpenTextType = {
  id: number
  like: Emitter.OpenText
}

export type EmitterPathType = {
  id: number
  like: Emitter.Path
}

export type EmitterRangeMetadatType = {
  character: EditorRangeType
  line: EditorRangeType
  offset: EditorRangeType
}

export type EmitterResultType = LexerResultType & {
  directions: Array<EmitterNodeType>
}

export type EmitterSignedIntegerType = {
  id: number
  like: Emitter.SignedInteger
}

export type EmitterStringType = {
  id: number
  like: Emitter.String
}

export type EmitterTermFragmentType = {
  dereference: boolean
  guard: boolean
  id: number
  like: Emitter.TermFragment
  query: boolean
  range: EmitterRangeMetadatType
  start: boolean
  value: string
}

export type EmitterTermSeparatorType = {
  id: number
  like: Emitter.TermSeparator
}

export type EmitterUnsignedIntegerType = {
  id: number
  like: Emitter.UnsignedInteger
  value: number
}

export function generateLinkTextBuildingDirections(
  input: LexerResultType,
): EmitterResultType {
  const result: Array<EmitterNodeType> = []

  let i = 0

  const stack: Array<Emitter> = [Emitter.OpenModule]
  const counter: Record<string, number> = {}

  function count(like: Emitter): number {
    counter[like] = counter[like] || 1
    return counter[like]++
  }

  result.push(base(Emitter.OpenModule))

  function base<T extends Emitter>(like: T) {
    return {
      id: count(like),
      like,
    }
  }

  for (const token of input.tokenList) {
    const top = assertTop()

    switch (token.like) {
      case Lexer.CloseEvaluation: {
        break
      }
      case Lexer.CloseInterpolation: {
        switch (top) {
          case Emitter.OpenPlugin: {
            result.push(base(Emitter.ClosePlugin))
            stack.pop()
            break
          }
          case Emitter.OpenTerm: {
            result.push(base(Emitter.CloseTerm))
            stack.pop()
            result.push(base(Emitter.CloseTermPath))
            stack.pop()
            result.push(base(Emitter.CloseHandle))
            stack.pop()
            result.push(base(Emitter.ClosePlugin))
            stack.pop()
            break
          }
          case Emitter.OpenDepth: {
            result.push(base(Emitter.CloseDepth))
            stack.pop()
            break
          }
          case Emitter.OpenHandle: {
            result.push(base(Emitter.CloseHandle))
            stack.pop()
            break
          }
          default:
            api.throwError({
              code: '0023',
              note: top,
            })
        }
        break
      }
      case Lexer.CloseParenthesis: {
        break
      }
      case Lexer.CloseText: {
        break
      }
      case Lexer.Comma: {
        switch (top) {
          case Emitter.OpenTerm: {
            result.push(base(Emitter.CloseTerm))
            stack.pop()
            result.push(base(Emitter.CloseTermPath))
            stack.pop()
            break
          }
          default:
            api.throwError({
              code: '0023',
              note: top,
            })
        }
        // console.log(token)
        break
      }
      case Lexer.Comment: {
        break
      }
      case Lexer.Decimal: {
        break
      }
      case Lexer.Hashtag: {
        break
      }
      case Lexer.Line: {
        switch (top) {
          case Emitter.OpenHandle: {
            result.push(base(Emitter.CloseHandle))
            stack.pop()
            break
          }
          case Emitter.OpenDepth: {
            result.push(base(Emitter.CloseHandle))
            stack.pop()
            break
          }
          case Emitter.OpenModule: {
            break
          }
          case Emitter.OpenTerm: {
            result.push(base(Emitter.CloseTerm))
            stack.pop()

            result.push(base(Emitter.CloseTermPath))
            stack.pop()
            break
          }
          default:
            api.throwError({
              code: '0023',
              note: top,
            })
        }
        break
      }
      case Lexer.OpenEvaluation: {
        break
      }
      case Lexer.OpenIndentation: {
        break
      }
      case Lexer.OpenInterpolation: {
        switch (top) {
          case Emitter.OpenTerm:
          case Emitter.OpenHandle: {
            stack.push(Emitter.OpenPlugin)
            result.push({
              ...token,
              ...base(Emitter.OpenPlugin),
            })
            break
          }
          case Emitter.OpenDepth: {
            break
          }
          default:
            api.throwError({
              code: '0023',
              note: top,
            })
        }
        break
      }
      case Lexer.OpenNesting: {
        switch (top) {
          case Emitter.OpenTerm: {
            result.push(base(Emitter.CloseTerm))
            stack.pop()

            result.push(base(Emitter.CloseTermPath))
            stack.pop()

            result.push(base(Emitter.OpenDepth))
            stack.push(Emitter.OpenDepth)
            break
          }
          case Emitter.OpenTermPath: {
            result.push(base(Emitter.CloseTermPath))
            stack.pop()

            result.push(base(Emitter.OpenDepth))
            stack.push(Emitter.OpenDepth)
            break
          }
          case Emitter.OpenHandle: {
            result.push(base(Emitter.OpenDepth))
            stack.push(Emitter.OpenDepth)
            break
          }
          default:
            api.throwError({
              code: '0023',
              note: top,
            })
        }
        break
      }
      case Lexer.OpenParenthesis: {
        break
      }
      case Lexer.OpenText: {
        break
      }
      case Lexer.Path: {
        break
      }
      case Lexer.SignedInteger: {
        break
      }
      case Lexer.String: {
        break
      }
      case Lexer.TermFragment: {
        switch (top) {
          case Emitter.OpenModule: {
            result.push(base(Emitter.OpenHandle))
            stack.push(Emitter.OpenHandle)

            result.push(base(Emitter.OpenTermPath))
            stack.push(Emitter.OpenTermPath)

            result.push(base(Emitter.OpenTerm))
            stack.push(Emitter.OpenTerm)

            applyFragments(token)
            break
          }
          case Emitter.OpenPlugin: {
            result.push(base(Emitter.OpenHandle))
            stack.push(Emitter.OpenHandle)

            result.push(base(Emitter.OpenTermPath))
            stack.push(Emitter.OpenTermPath)

            result.push(base(Emitter.OpenTerm))
            stack.push(Emitter.OpenTerm)

            applyFragments(token)
            break
          }
          case Emitter.OpenDepth: {
            result.push(base(Emitter.OpenHandle))
            stack.push(Emitter.OpenHandle)

            result.push(base(Emitter.OpenTermPath))
            stack.push(Emitter.OpenTermPath)

            result.push(base(Emitter.OpenTerm))
            stack.push(Emitter.OpenTerm)

            applyFragments(token)
            break
          }
          case Emitter.OpenHandle: {
            result.push(base(Emitter.OpenTermPath))
            stack.push(Emitter.OpenTermPath)

            result.push(base(Emitter.OpenTerm))
            stack.push(Emitter.OpenTerm)

            applyFragments(token)
            break
          }
          case Emitter.OpenTerm: {
            applyFragments(token)
            break
          }
          default:
            api.throwError({
              code: '0023',
              note: top,
            })
        }
        break
      }
      case Lexer.UnsignedInteger: {
        result.push({
          ...base(Emitter.UnsignedInteger),
          value: parseInt(token.text, 10),
        })
        break
      }
    }
    i++
  }

  function applyFragments(token: LexerTermFragmentTokenType) {
    const fragments = generateTermFragments(token)

    fragments.forEach((frag, i) => {
      result.push({
        ...frag,
      })

      if (i > 0 && i < fragments.length - 2) {
        result.push(base(Emitter.CloseTerm))
        result.push(base(Emitter.OpenTerm))
      }

      if (i < fragments.length - 2) {
        result.push(base(Emitter.TermSeparator))
      }
    })
  }

  while (stack.length) {
    const top = stack.pop()
    switch (top) {
      case Emitter.OpenDepth: {
        result.push(base(Emitter.CloseDepth))
        break
      }
      case Emitter.OpenHandle: {
        result.push(base(Emitter.CloseHandle))
        break
      }
      case Emitter.OpenModule: {
        result.push(base(Emitter.CloseModule))
        break
      }
    }
  }

  function peek(amount = 1): LexerTokenType<Lexer> | undefined {
    return input.tokenList[i + amount]
  }

  function assertTop(): string {
    const top = stack[stack.length - 1]
    api.assertString(top)
    return top
  }

  function generateTermFragments(
    token: LexerTermFragmentTokenType,
  ): Array<EmitterTermFragmentType> {
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
        ...base(Emitter.TermFragment),
        like: Emitter.TermFragment,
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
  directionList: Array<EmitterNodeType>,
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

    const indentText = new Array(indent + 1).join('  ')
    const value = chalk.whiteBright(
      'value' in direction ? `${direction.value}` : '',
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

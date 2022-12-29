import { Lexer, LexerTokenBaseType, api } from '~'
import type { LexerResultType, LexerTokenType } from '~'

export enum Norm {
  CloseHandle = 'norm-close-handle',
  CloseIndex = 'norm-close-index',
  CloseModule = 'norm-close-module',
  CloseParenthesis = 'norm-close-parenthesis',
  ClosePlugin = 'norm-close-plugin',
  CloseTerm = 'norm-close-term',
  CloseTermFragment = 'norm-close-term-fragment',
  CloseTermPath = 'norm-close-term-path',
  CloseText = 'norm-close-text',
  Comma = 'norm-comma',
  Comment = 'norm-comment',
  Decimal = 'norm-decimal',
  Hashtag = 'norm-hashtag',
  Line = 'norm-line',
  MoveInward = 'norm-move-inward',
  MoveOutward = 'norm-move-outward',
  OpenHandle = 'norm-open-handle',
  OpenIndentation = 'norm-open-indentation',
  OpenIndex = 'norm-open-index',
  OpenModule = 'norm-open-module',
  OpenParenthesis = 'norm-open-parenthesis',
  OpenPlugin = 'norm-open-plugin',
  OpenTerm = 'norm-open-term',
  OpenTermFragment = 'norm-open-term-fragment',
  OpenTermPath = 'norm-open-term-path',
  OpenText = 'norm-open-text',
  Path = 'norm-path',
  SignedInteger = 'norm-signed-integer',
  String = 'norm-string',
  TermFragment = 'norm-term-fragment',
  UnsignedInteger = 'norm-unsigned-integer',
}

export type NormCloseHandleType = {
  id: number
  like: Norm.CloseHandle
}

export type NormCloseIndexType = {
  id: number
  like: Norm.CloseIndex
}

export type NormCloseModuleType = {
  id: number
  like: Norm.CloseModule
}

export type NormCloseParenthesisType = {
  id: number
  like: Norm.CloseParenthesis
}

export type NormClosePluginType = {
  id: number
  like: Norm.ClosePlugin
}

export type NormCloseTermFragmentType = {
  id: number
  like: Norm.CloseTermFragment
}

export type NormCloseTermPathType = {
  id: number
  like: Norm.CloseTermPath
}

export type NormCloseTermType = {
  id: number
  like: Norm.CloseTerm
}

export type NormCloseTextType = {
  id: number
  like: Norm.CloseText
}

export type NormCommaType = {
  id: number
  like: Norm.Comma
}

export type NormCommentType = {
  id: number
  like: Norm.Comment
}

export type NormDecimalType = {
  id: number
  like: Norm.Decimal
}

export type NormHashtagType = {
  id: number
  like: Norm.Hashtag
}

export type NormLineType = {
  id: number
  like: Norm.Line
}

export type NormMoveInwardType = {
  id: number
  like: Norm.MoveInward
}

export type NormMoveOutwardType = {
  id: number
  like: Norm.MoveOutward
}

export type NormNodeType =
  | NormCloseIndexType
  | NormCloseModuleType
  | NormCloseParenthesisType
  | NormClosePluginType
  | NormCloseTermFragmentType
  | NormCloseTermPathType
  | NormCloseTermType
  | NormCloseTextType
  | NormCommaType
  | NormCommentType
  | NormDecimalType
  | NormHashtagType
  | NormLineType
  | NormMoveInwardType
  | NormMoveOutwardType
  | NormOpenIndentationType
  | NormOpenIndexType
  | NormOpenModuleType
  | NormOpenParenthesisType
  | NormOpenPluginType
  | NormOpenTermFragmentType
  | NormOpenTermPathType
  | NormOpenTermType
  | NormOpenTextType
  | NormPathType
  | NormSignedIntegerType
  | NormStringType
  | NormTermFragmentType
  | NormUnsignedIntegerType
  | NormOpenHandleType
  | NormCloseHandleType

export type NormOpenHandleType = {
  id: number
  like: Norm.OpenHandle
}

export type NormOpenIndentationType = {
  id: number
  like: Norm.OpenIndentation
}

export type NormOpenIndexType = {
  id: number
  like: Norm.OpenIndex
}

export type NormOpenModuleType = {
  id: number
  like: Norm.OpenModule
}

export type NormOpenParenthesisType = {
  id: number
  like: Norm.OpenParenthesis
}

export type NormOpenPluginType = Omit<
  LexerTokenBaseType,
  'like'
> & {
  id: number
  like: Norm.OpenPlugin
}

export type NormOpenTermFragmentType = Omit<
  LexerTokenBaseType,
  'like'
> & {
  id: number
  like: Norm.OpenTermFragment
}

export type NormOpenTermPathType = {
  id: number
  like: Norm.OpenTermPath
}

export type NormOpenTermType = {
  id: number
  like: Norm.OpenTerm
}

export type NormOpenTextType = {
  id: number
  like: Norm.OpenText
}

export type NormPathType = {
  id: number
  like: Norm.Path
}

export type NormResultType = LexerResultType & {
  normalizedTokenList: Array<NormNodeType>
}

export type NormSignedIntegerType = {
  id: number
  like: Norm.SignedInteger
}

export type NormStringType = {
  id: number
  like: Norm.String
}

export type NormTermFragmentType = {
  id: number
  like: Norm.TermFragment
}

export type NormUnsignedIntegerType = {
  id: number
  like: Norm.UnsignedInteger
}

export function normalizeLinkTextAST(
  input: LexerResultType,
): NormResultType {
  const result: Array<NormNodeType> = []

  let nesting = 0
  let previousLineNesting = 0
  let i = 0

  console.log(api.prettifyJSON(input.tokenList))

  const stack: Array<Norm> = [Norm.OpenModule]
  const counter: Record<string, number> = {}

  function count(like: Norm): number {
    counter[like] = counter[like] || 1
    return counter[like]++
  }

  result.push(base(Norm.OpenModule))

  function base<T extends Norm>(like: T) {
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
          case Norm.OpenPlugin: {
            result.push(base(Norm.ClosePlugin))
            stack.pop()
            break
          }
          case Norm.OpenTermFragment: {
            result.push(base(Norm.CloseTermFragment))
            stack.pop()
            result.push(base(Norm.CloseTermPath))
            stack.pop()
            result.push(base(Norm.ClosePlugin))
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
          case Norm.OpenTermFragment: {
            stack.push(Norm.OpenPlugin)
            result.push({
              ...token,
              ...base(Norm.OpenPlugin),
            })
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
          case Norm.OpenTermFragment: {
            result.push(base(Norm.CloseTermFragment))
            stack.pop()
            result.push(base(Norm.CloseTermPath))
            stack.pop()
            result.push(base(Norm.MoveInward))
            stack.push(Norm.MoveInward)
            break
          }
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
          case Norm.OpenModule: {
            result.push(base(Norm.OpenHandle))
            stack.push(Norm.OpenHandle)

            result.push({
              ...base(Norm.OpenTermPath),
            })
            stack.push(Norm.OpenTermPath)

            result.push({
              ...token,
              ...base(Norm.OpenTermFragment),
            })
            stack.push(Norm.OpenTermFragment)

            break
          }
          case Norm.OpenTermFragment: {
            result.push(base(Norm.CloseTermFragment))
            result.push({
              ...token,
              ...base(Norm.OpenTermFragment),
            })
            break
          }
          case Norm.OpenPlugin: {
            result.push(base(Norm.OpenHandle))
            stack.push(Norm.OpenHandle)

            result.push({
              ...base(Norm.OpenTermPath),
            })
            stack.push(Norm.OpenTermPath)

            result.push({
              ...token,
              ...base(Norm.OpenTermFragment),
            })
            stack.push(Norm.OpenTermFragment)
            break
          }
          case Norm.MoveInward: {
            result.push(base(Norm.OpenHandle))
            stack.push(Norm.OpenHandle)

            result.push({
              ...base(Norm.OpenTermPath),
            })
            stack.push(Norm.OpenTermPath)

            result.push({
              ...token,
              ...base(Norm.OpenTermFragment),
            })
            stack.push(Norm.OpenTermFragment)
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
        break
      }
    }
    i++
  }

  while (stack.length) {
    const top = stack.pop()
    switch (top) {
      case Norm.OpenTermFragment: {
        result.push(base(Norm.CloseTermFragment))
        break
      }
      case Norm.OpenTermPath: {
        result.push(base(Norm.CloseTermPath))
        break
      }
      case Norm.MoveInward: {
        result.push(base(Norm.MoveOutward))
        break
      }
      case Norm.OpenModule: {
        result.push(base(Norm.CloseModule))
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

  console.log(
    api.prettifyJSON(
      result.map(x => ({
        id: x.id,
        like: x.like,
        text: x.text,
      })),
    ),
  )

  process.exit()

  return {
    ...input,
    normalizedTokenList: result,
  }
}

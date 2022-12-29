import {
  CursorRangeType,
  ErrorType,
  LEXER_TYPE,
  LexerLineRangeType,
  LexerRangeType,
  LexerSplitInputType,
  LexerTokenType,
  Norm,
  NormResultType,
  api,
} from '~'

import {
  Lexer,
  LexerResultType,
  LexerTokenBaseType,
} from '../tokenizer/index.js'

type LT = LexerTokenType<Lexer>

export enum Tree {
  Boolean = 'tree-boolean',
  Decimal = 'tree-decimal',
  Handle = 'tree-handle',
  Hashtag = 'tree-hashtag',
  Index = 'tree-index',
  Module = 'tree-module',
  Path = 'tree-path',
  Plugin = 'tree-plugin',
  SignedInteger = 'tree-signed-integer',
  String = 'tree-string',
  Term = 'tree-term',
  TermFragment = 'tree-term-fragment',
  Text = 'tree-text',
  UnsignedInteger = 'tree-unsigned-integer',
}

export type TreeBooleanType = {
  like: Tree.Boolean
  value: boolean
}

export type TreeDecimalType = LexerTokenBaseType & {
  like: Tree.Decimal
  value: number
}

export type TreeHandleType = {
  element: Array<
    | TreePathType
    | TreeTermType
    | TreeTextType
    | TreeHandleType
    | TreeUnsignedIntegerType
    | TreeSignedIntegerType
    | TreeHashtagType
    | TreeDecimalType
    | TreeStringType
  >
  like: Tree.Handle
  term: TreeTermType
}

export type TreeHashtagType = LexerTokenBaseType & {
  code: string
  like: Tree.Hashtag
  system: string
}

export type TreeIndexType = {
  element: TreeHandleType | TreeTermType | TreePathType
  like: Tree.Index
}

export type TreeMappingType = {
  'tree-boolean': TreeBooleanType
  'tree-decimal': TreeDecimalType
  'tree-handle': TreeHandleType
  'tree-hashtag': TreeHashtagType
  'tree-index': TreeIndexType
  'tree-module': TreeModuleType
  'tree-path': TreePathType
  'tree-plugin': TreePluginType
  'tree-signed-integer': TreeSignedIntegerType
  'tree-string': TreeStringType
  'tree-term': TreeTermType
  'tree-term-fragment': TreeTermFragmentType
  'tree-text': TreeTextType
  'tree-unsigned-integer': TreeUnsignedIntegerType
}

export type TreeModuleType = {
  element: Array<
    | TreePathType
    | TreeTermType
    | TreeTextType
    | TreeHandleType
    | TreeUnsignedIntegerType
    | TreeSignedIntegerType
    | TreeHashtagType
    | TreeDecimalType
    | TreeStringType
  >
  like: Tree.Module
}

export type TreeNodeType =
  | TreeTermType
  | TreeStringType
  | TreeHandleType
  | TreeUnsignedIntegerType
  | TreeTextType
  | TreePluginType
  | TreeIndexType
  | TreeDecimalType
  | TreeHashtagType
  | TreePathType
  | TreeModuleType

export type TreePathType = {
  like: Tree.Path
  segment: Array<TreeTermType | TreePathType>
}

export type TreePluginType = {
  element?: TreeHandleType | TreeTermType | TreePathType
  like: Tree.Plugin
  size: number
}

export type TreeResultType = LexerSplitInputType & {
  parseTree: TreeModuleType
}

export type TreeSignedIntegerType = LexerTokenBaseType & {
  like: Tree.SignedInteger
  value: number
}

export type TreeStringType = Omit<
  LexerTokenBaseType,
  'text'
> & {
  like: Tree.String
  value: string
}

export type TreeTermFragmentType = {
  like: Tree.TermFragment
}

export type TreeTermType = {
  dive: boolean
  guard: boolean
  key: boolean
  like: Tree.Term
  segment: Array<
    | TreeStringType
    | TreeTermType
    | TreePathType
    | TreePluginType
  >
}

export type TreeTextType = {
  like: Tree.Text
  segment: Array<TreeStringType | TreePluginType>
}

export type TreeType<T extends Tree> = TreeMappingType[T]

export type TreeUnsignedIntegerType = LexerTokenBaseType & {
  like: Tree.UnsignedInteger
  value: number
}

export type TreeWorkListCallbackType = (
  token: LexerTokenType<Lexer>,
) => void

export type TreeWorkListInputType = {
  callback: TreeWorkListCallbackType
  parent: TreeNodeType
}

export function assertLexerGenericType(
  object: unknown,
): asserts object is LexerTokenType<Lexer> {
  if (!api.isLexerGenericType(object)) {
    api.throwError()
  }
}

export function assertLexerType<T extends Lexer>(
  object: unknown,
  like: T,
): asserts object is LexerTokenType<T> {
  if (!api.isLexerType<T>(object, like)) {
    api.throwError()
  }
}

type TreeInputType = LexerSplitInputType & {
  token: LexerTokenType<Lexer>
}

type TT = TreeNodeType

export function buildParseTree(
  input: NormResultType,
): TreeResultType {
  const stack: Array<TreeNodeType> = []
  let result: TreeNodeType | undefined = undefined

  // console.log(api.prettifyJSON(input.tokenList))

  let i = 0
  while (i < input.normalizedTokenList.length) {
    const token = input.normalizedTokenList[i]
    if (!token) {
      i++
      continue
    }

    const parent = stack[stack.length - 1]
    const top = parent?.like

    switch (token.like) {
      case Norm.OpenModule: {
        const start: TreeModuleType = {
          element: [],
          like: Tree.Module,
        }
        stack.push(start)
        break
      }

      case Norm.CloseTermFragment: {
        switch (top) {
          case Tree.Path: {
            stack.pop()
            break
          }
          case Tree.Plugin: {
            stack.pop()
            break
          }
          case Tree.Module: {
            break
          }
        }
        break
      }

      case Norm.ClosePlugin: {
        stack.pop()
        break
      }

      case Norm.MoveInward: {
        break
      }

      case Norm.OpenPlugin: {
        const plugin: TreePluginType = {
          like: Tree.Plugin,
          size: token.text.length,
        }

        switch (top) {
          case Tree.Path: {
            const list = (parent as TreePathType).segment
            const last = list[list.length - 1]
            if (last) {
              last.segment.push(plugin)
            }
            break
          }
          default:
            if (top) {
              api.throwError({
                code: '0023',
                note: top,
              })
            }
        }
        stack.push(plugin)
        break
      }

      case Norm.OpenTermFragment: {
        switch (top) {
          // case Tree.Path: {
          //   break
          // }
          case Tree.Module: {
            const fragments = parse_termFragment_list(
              token.text,
              token.start.line,
              token.start.character,
              token.offset.start,
            )

            const elementList = (parent as TreeModuleType)
              .element

            const existingPath =
              elementList[elementList.length - 1]
            if (
              existingPath &&
              existingPath.like === Tree.Path
            ) {
              const last =
                existingPath.segment[
                  existingPath.segment.length - 1
                ]

              // if (last) {
              //   const first = fragments.shift()
              //   if (first) {
              //     last.segment.push(...first.segment)
              //   }
              //   // last.segment.push(...fragments)
              // } else {
              // if (last) {
              //   const first = fragments.shift()
              //   if (first) {
              //     last.segment.push(...first.segment)
              //   }
              // }
              existingPath.segment.push(...fragments)
              // }

              stack.push(existingPath)
            } else {
              const path: TreePathType = {
                like: Tree.Path,
                segment: fragments,
              }

              elementList.push(path)

              stack.push(path)
            }
            break
          }
          case Tree.Plugin: {
            const fragments = parse_termFragment_list(
              token.text,
              token.start.line,
              token.start.character,
              token.offset.start,
            )

            const path: TreePathType = {
              like: Tree.Path,
              segment: fragments,
            }

            ;(parent as TreePluginType).element = path
            break
          }
          case Tree.Path: {
            const fragments = parse_termFragment_list(
              token.text,
              token.start.line,
              token.start.character,
              token.offset.start,
            )

            api.assertTreeType(parent, Tree.Path)
            const last =
              parent.segment[parent.segment.length - 1]
            // if (last) {
            //   const first = fragments.shift()
            //   if (first) {
            //     last.segment.push(...first.segment)
            //   }
            // }
            break
          }
          default:
            if (top) {
              api.throwError({
                code: '0023',
                note: top,
              })
            }
        }
        break
      }

      case Norm.CloseModule: {
        result = stack.pop()
        console.log(api.prettifyJSON(result))
        break
      }
    }

    i++
  }

  api.assertTreeType(result, Tree.Module)

  return {
    ...input,
    parseTree: result,
  }
}

function createString(
  value: string,
  start: LexerLineRangeType,
  end: LexerLineRangeType,
  offset: LexerRangeType,
): TreeStringType {
  return {
    end,
    like: Tree.String,
    offset,
    start,
    value,
  }
}

function parse_termFragment_list(
  string: string,
  line: number,
  character: number,
  total: number,
): Array<TreeTermType> {
  const parts = string.split('/')
  return parts.map((fragment, i) => {
    const dive = Boolean(fragment.match(/\*/))
    const guard = Boolean(fragment.match(/\?/))
    const key = Boolean(fragment.match(/~/))
    const name = fragment.replace(/[\*\~\?]/g, '')
    const upto = parts.slice(0, i).join('').length
    const start = {
      character: character + upto + i,
      line,
    }
    const end = {
      character: character + upto + fragment.length + i,
      line,
    }
    const offset = {
      end: total + upto + fragment.length + i,
      start: total,
    }
    return {
      dive,
      guard,
      key,
      like: Tree.Term,
      segment: [createString(name, start, end, offset)],
    }
  })
}

export function generateUnhandledTreeResolver(
  input: TreeInputType & { scope?: string },
): ErrorType {
  const token = input.token

  const range: CursorRangeType = {
    end: {
      character: token.end.character,
      line: token.end.line,
    },
    start: {
      character: token.start.character,
      line: token.start.line,
    },
  }

  const text = api.generateHighlightedError(
    input.textInLines,
    range,
  )

  return {
    code: `0022`,
    file: input.path,
    note: `We haven't implemented a handler for the \`${
      token.like
    }\` item${
      input.scope ? ` in the \`${input.scope}\` scope` : ''
    } yet.`,
    text,
  }
}

export function isLexerGenericType(
  object: unknown,
): object is LexerTokenType<Lexer> {
  return (
    api.isRecord(object) &&
    'like' in object &&
    LEXER_TYPE.includes((object as LexerTokenType<Lexer>).like)
  )
}

export function isLexerType<T extends Lexer>(
  object: unknown,
  like: T,
): object is LexerTokenType<T> {
  return (
    api.isRecord(object) &&
    'like' in object &&
    (object as LexerTokenType<Lexer>).like === like
  )
}

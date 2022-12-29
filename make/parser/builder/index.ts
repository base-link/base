import {
  CursorRangeType,
  ErrorType,
  LEXER_TYPE,
  LexerLineRangeType,
  LexerRangeType,
  LexerSplitInputType,
  LexerTokenType,
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
  element: TreeHandleType | TreeTermType | TreePathType
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
  input: LexerResultType,
): TreeResultType {
  const start: TreeModuleType = {
    element: [],
    like: Tree.Module,
  }

  const result = start
  const stack: Array<TreeNodeType> = [start]

  console.log(api.prettifyJSON(input.tokenList))

  let i = 0
  while (i < input.tokenList.length) {
    const token = input.tokenList[i]
    api.assertLexerGenericType(token)
    const parent = stack[stack.length - 1]
    if (!parent) {
      i++
      continue
    }

    switch (token.like) {
      case Lexer.TermFragment: {
        consume()

        stack.push(consume_start_termFragment(parent, token))
        break
      }

      case Lexer.OpenNesting: {
        stack.pop()
      }
    }

    i++
  }

  console.log(api.prettifyJSON(start))

  function peek(amount = 1) {
    return input.tokenList[i + amount]
  }

  function consume_start_termFragment_fragments(
    token: LexerTokenType<Lexer.TermFragment>,
  ): Array<TreeTermType> {
    const fragments = parse_termFragment_list(
      token.text,
      token.start.line,
      token.start.character,
      token.offset.start,
    )

    let next = peek()

    loop: while (next) {
      switch (next.like) {
        case Lexer.OpenInterpolation: {
          consume()

          const plugin = consume_start_openInterpolation(next)
          const last = fragments[fragments.length - 1]

          if (!last) {
            throw new Error('oops')
          }

          last.segment.push(plugin)

          break
        }
        case Lexer.TermFragment: {
          consume()

          const childFragments =
            consume_start_termFragment_fragments(next)
          const first = childFragments.shift()
          const last = fragments[fragments.length - 1]

          if (!first) {
            throw new Error('Oops')
          }

          if (!last) {
            throw new Error('Oops')
          }

          last.segment.push(...first.segment)

          fragments.push(...childFragments)
          break
        }
        default:
          break loop
      }
      next = peek()
    }

    return fragments
  }

  function consume_start_openInterpolation(
    token: LexerTokenType<Lexer.OpenInterpolation>,
  ): TreePluginType {
    const fragments: Array<TreeTermType> = []

    let next = peek()
    loop: while (next) {
      switch (next.like) {
        case Lexer.TermFragment: {
          consume()

          const childFragments =
            consume_start_termFragment_fragments(next)
          const last = fragments[fragments.length - 1]
          if (last) {
            const first = childFragments.shift()
            if (first) {
              last.segment.push(...first.segment)
            }
          }
          fragments.push(...childFragments)
          break
        }
        case Lexer.OpenInterpolation: {
          const childPlugin =
            consume_start_openInterpolation(next)
          const last = fragments[fragments.length - 1]
          // fragments.push(childPlugin)
          if (last) {
            last.segment.push(childPlugin)
          } else {
            throw new Error('Oops')
          }
          break
        }
        case Lexer.OpenEvaluation: {
        }
        default:
          break loop
      }
      next = peek()
    }

    if (fragments.length > 1) {
      const path = build_start_termFragment_path(fragments)

      const plugin: TreePluginType = {
        element: path,
        like: Tree.Plugin,
        size: token.text.length,
      }

      return plugin
    } else {
      const handle = build_start_termFragment_term(fragments)
      const plugin: TreePluginType = {
        element: handle,
        like: Tree.Plugin,
        size: token.text.length,
      }
      return plugin
    }
  }

  function consume(amount = 1) {
    i += amount
    const t = input.tokenList[i]
    api.assertLexerGenericType(t)
    return t
  }

  function build_start_termFragment_path(
    fragments: Array<TreeTermType>,
  ): TreePathType {
    const path: TreePathType = {
      like: Tree.Path,
      segment: fragments,
    }
    return path
  }

  function build_start_termFragment_term(
    fragments: Array<TreeTermType>,
  ): TreeHandleType {
    const term = fragments[0]
    api.assertTreeType(term, Tree.Term)
    const handle: TreeHandleType = {
      element: [],
      like: Tree.Handle,
      term,
    }
    return handle
  }

  function append_term_handle_to_parent(
    parent: TT,
    handle: TreeHandleType | TreePathType,
  ): void {
    switch (parent.like) {
      case Tree.Module: {
        parent.element.push(handle)
        break
      }
      case Tree.Handle: {
        parent.element.push(handle)
        break
      }
    }
  }

  function consume_start_termFragment(
    parent: TT,
    token: LexerTokenType<Lexer.TermFragment>,
  ): TreeHandleType | TreePathType {
    const fragments =
      consume_start_termFragment_fragments(token)

    if (fragments.length > 1) {
      const path = build_start_termFragment_path(fragments)
      append_term_handle_to_parent(parent, path)
      return path
    } else {
      const term = build_start_termFragment_term(fragments)
      append_term_handle_to_parent(parent, term)
      return term
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

  return {
    ...input,
    parseTree: result,
  }
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

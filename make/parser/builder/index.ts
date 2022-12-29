import {
  CursorRangeType,
  ErrorType,
  LEXER_TYPE,
  LexerLineRangeType,
  LexerRangeType,
  LexerSplitInputType,
  LexerTokenType,
  Norm,
  NormNodeType,
  NormResultType,
  api,
} from '~'

import {
  Lexer,
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
  hook?: TreeTermType | TreePathType
  like: Tree.Handle
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
  state: {
    index: number
    stack: Array<TreeNodeType>
  }
  token: NormNodeType
}

type TT = TreeNodeType

export function attach_handle_module(
  input: TreeInputType,
  handle: TreeHandleType,
): void {
  const current =
    input.state.stack[input.state.stack.length - 1]
  api.assertTreeType(current, Tree.Module)

  current.element.push(handle)
}

export function buildParseTree(
  input: NormResultType,
): TreeResultType {
  const stack: Array<TreeNodeType> = []
  let result: TreeNodeType | undefined = undefined

  // console.log(api.prettifyJSON(input.tokenList))

  const state = { index: 0, stack }

  let i = 0
  while (i < input.normalizedTokenList.length) {
    const token = input.normalizedTokenList[i]
    if (!token) {
      continue
    }

    switch (token.like) {
      case Norm.OpenModule:
        api.parse_openModule({
          ...input,
          state,
          token,
        })
        break
      case Norm.CloseModule:
        api.parse_closeModule({
          ...input,
          state,
          token,
        })
        break
      case Norm.OpenTermPath:
        api.parse_openTermPath({
          ...input,
          state,
          token,
        })
        break
      case Norm.CloseTermPath:
        api.parse_closeTermPath({
          ...input,
          state,
          token,
        })
        break
      case Norm.OpenHandle:
        api.parse_openHandle({
          ...input,
          state,
          token,
        })
        break
      case Norm.CloseHandle:
        api.parse_closeHandle({
          ...input,
          state,
          token,
        })
        break
    }
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

export function parse_closeHandle(input: TreeInputType): void {
  input.state.stack.pop()
}

export function parse_closeModule(input: TreeInputType): void {
  input.state.stack.pop()
}

export function parse_closeTermPath(
  input: TreeInputType,
): void {
  input.state.stack.pop()
}

export function parse_openHandle(input: TreeInputType): void {
  const handle: TreeHandleType = {
    element: [],
    like: Tree.Handle,
  }

  const current =
    input.state.stack[input.state.stack.length - 1]
  const currentLike = current?.like

  switch (currentLike) {
    case Tree.Module: {
      api.attach_handle_module(input, handle)
    }
  }
}

export function parse_openModule(input: TreeInputType): void {
  // const current = stack[stack.length - 1]
  // const parent = stack[stack.length - 2]
  const container: TreeModuleType = {
    element: [],
    like: Tree.Module,
  }
  input.state.stack.push(container)
}

export function parse_openTermPath(input: TreeInputType): void {
  input.state.stack.pop()
}

function mergeTreePaths(
  a: TreePathType,
  b: TreePathType,
): TreePathType {
  const lastOfFirst = a.segment[a.segment.length - 1]
  if (!lastOfFirst) {
    return b
  }

  const firstOfLast = b.segment[0]
  if (!firstOfLast) {
    return b
  }

  const stringsAndStuff: Array<TreeNodeType> = []
  stringsAndStuff.push(
    ...lastOfFirst.segment,
    ...firstOfLast.segment,
  )

  const newTerm: TreeTermType = {
    // ...
  }

  const newChildren = [
    ...a.segment.slice(0, a.segment.length - 2),
  ]

  const newPath: TreePathType = {
    like: Tree.Path,
    segment: [...newChildren],
  }
}

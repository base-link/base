import chalk from 'chalk'

import {
  CursorRangeType,
  Emitter,
  EmitterNodeType,
  EmitterResultType,
  ErrorType,
  LEXER_TYPE,
  LexerSplitInputType,
  LexerTermFragmentTokenType,
  LexerTokenType,
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
  | TreeSignedIntegerType
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
  token: EmitterNodeType
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
  input: EmitterResultType,
): TreeResultType {
  const stack: Array<TreeNodeType> = []
  let result: TreeNodeType | undefined = undefined

  // console.log(api.prettifyJSON(input.tokenList))

  const state = { index: 0, stack }

  let start

  let i = 0
  while (i < input.directions.length) {
    const token = input.directions[i]
    if (!token) {
      continue
    }

    switch (token.like) {
      case Emitter.OpenModule:
        start = api.parse_openModule({
          ...input,
          state,
          token,
        })
        break
      case Emitter.CloseModule:
        api.parse_closeModule({
          ...input,
          state,
          token,
        })
        break
      case Emitter.TermFragment:
        api.parse_termFragment({
          ...input,
          state,
          token,
        })
        break
      case Emitter.OpenHandle:
        api.parse_openHandle({
          ...input,
          state,
          token,
        })
        break
      case Emitter.MoveInward:
        api.parse_moveInward({
          ...input,
          state,
          token,
        })
        break
      case Emitter.OpenPlugin:
        api.parse_openPlugin({
          ...input,
          state,
          token,
        })
        break
      case Emitter.ClosePlugin:
        api.parse_closePlugin({
          ...input,
          state,
          token,
        })
        break
      case Emitter.CloseHandle:
        api.parse_closeHandle({
          ...input,
          state,
          token,
        })
        break
    }

    i++
  }

  printParserAST(result ?? start)

  api.assertTreeType(result, Tree.Module)

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

export function parse_closeHandle(input: TreeInputType): void {
  // input.state.stack.pop()
}

export function parse_closeModule(input: TreeInputType): void {
  // input.state.stack.pop()
}

export function parse_closePlugin(input: TreeInputType): void {
  // input.state.stack.pop()
}

export function parse_moveInward(input: TreeInputType): void {
  console.log('m')
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
      break
    }
    case Tree.Path: {
      const current2 =
        input.state.stack[input.state.stack.length - 2]
      if (current2?.like === Tree.Handle) {
        current2.element.push(handle)
      }
      break
    }
    default:
      api.throwError({
        code: '0024',
        note: 'Not implemented yet.',
      })
  }

  input.state.stack.push(handle)
}

export function parse_openModule(input: TreeInputType) {
  // const current = stack[stack.length - 1]
  // const parent = stack[stack.length - 2]
  const container: TreeModuleType = {
    element: [],
    like: Tree.Module,
  }
  input.state.stack.push(container)
  return container
}

export function parse_openPlugin(input: TreeInputType): void {
  // input.state.stack.pop()
}

export function parse_termFragment(input: TreeInputType): void {
  const current =
    input.state.stack[input.state.stack.length - 1]
  if (current) {
    if (current.like !== Tree.Path) {
      const path: TreePathType = {
        like: Tree.Path,
        segment: [],
      }
      input.state.stack.push(path)

      switch (current.like) {
        case Tree.Module: {
          break
        }
        case Tree.Handle: {
          if (!current.hook) {
            current.hook = path
          } else {
            current.element.push(path)
          }
          break
        }
        default:
          console.log(current)
      }
      parse_termFragment(input)
      return
    }
  }

  api.assertTreeType(current, Tree.Path)

  let term: TreeTermType = {
    dive: false,
    guard: false,
    key: false,
    like: Tree.Term,
    segment: [],
  }

  if (input.token.like === Emitter.TermFragment) {
    term.segment.push({
      end: input.token.end,
      like: Tree.String,
      offset: input.token.offset,
      start: input.token.start,
      value: input.token.value,
    })
  }

  current.segment.push(term)

  // dive: false,
  // end: { character: 4, line: 0 },
  // guard: false,
  // key: false,
  // offset: { end: 25, start: 21 },
  // start: { character: 0, line: 0 },
  // value: 'bond',
  // id: 6,
  // like: 'emitter-term-fragment'

  // current.segment.push()
}

function printParserAST(base: TreeModuleType | unknown): void {
  const text: Array<string> = ['']

  if (!base) {
    text.push(`  undefined`)
  } else {
    printParserASTDetails(base).forEach(line => {
      text.push(`  ${line}`)
    })
  }

  text.push('')

  console.log(text.join('\n'))
}

function printParserASTDetails(
  node: TreeNodeType,
): Array<string> {
  const text: Array<string> = []

  const title = chalk.white(node.like)

  switch (node.like) {
    case Tree.Module: {
      text.push(`${title}`)
      node.element.forEach(el => {
        printParserASTDetails(el).forEach(line => {
          text.push(`  ${line}`)
        })
      })
      break
    }
    case Tree.String: {
      text.push(`${title} ${chalk.green(node.value)}`)
      break
    }
    case Tree.Handle: {
      text.push(`${title}`)
      if (node.hook) {
        text.push(chalk.gray(`  hook:`))
        printParserASTDetails(node.hook).forEach(line => {
          text.push(`    ${line}`)
        })
      } else {
        text.push(chalk.gray('  hook: undefined'))
      }
      if (node.element.length) {
        text.push(chalk.gray(`  element:`))
        node.element.forEach(el => {
          printParserASTDetails(el).forEach(line => {
            text.push(`    ${line}`)
          })
        })
      }
      break
    }
    case Tree.UnsignedInteger: {
      break
    }
    case Tree.Text: {
      break
    }
    case Tree.Plugin: {
      text.push(`${title} (size: ${node.size})`)
      if (node.element) {
        text.push(chalk.gray(`  element:`))
        printParserASTDetails(node.element).forEach(line => {
          text.push(`  ${line}`)
        })
      }
      break
    }
    case Tree.Index: {
      break
    }
    case Tree.Decimal: {
      break
    }
    case Tree.Hashtag: {
      break
    }
    case Tree.Term: {
      text.push(`${title}`)
      node.segment.forEach(seg => {
        printParserASTDetails(seg).forEach(line => {
          text.push(`  ${line}`)
        })
      })
      break
    }
    case Tree.Path: {
      text.push(`${title}`)
      node.segment.forEach(seg => {
        printParserASTDetails(seg).forEach(line => {
          text.push(`  ${line}`)
        })
      })
      break
    }
  }

  return text
}

import chalk from 'chalk'

import {
  CursorRangeType,
  Emitter,
  EmitterNodeType,
  EmitterRangeMetadatType,
  EmitterResultType,
  ErrorType,
  LEXER_TYPE,
  LexerSplitInputType,
  LexerTokenType,
  api,
} from '~'

import {
  Lexer,
  LexerTokenBaseType,
} from '../tokenizer/index.js'

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
    | TreeTextType
    | TreeHandleType
    | TreeUnsignedIntegerType
    | TreeSignedIntegerType
    | TreeHashtagType
    | TreeDecimalType
    | TreeStringType
    | TreeBooleanType
  >
  head?: TreeTermType
  like: Tree.Handle
  parent: TreeHandleType | TreeModuleType | TreePluginType
}

export type TreeHashtagType = LexerTokenBaseType & {
  code: string
  like: Tree.Hashtag
  system: string
}

export type TreeIndexType = {
  element: TreeHandleType
  like: Tree.Index
  parent: TreePathType
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
  'tree-text': TreeTextType
  'tree-unsigned-integer': TreeUnsignedIntegerType
}

export type TreeModuleType = {
  element: Array<TreeHandleType>
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
  parent: TreeHandleType
  segment: Array<TreeTermType | TreeIndexType>
}

export type TreePluginType = {
  element?: TreeHandleType
  like: Tree.Plugin
  parent: TreeTermType | TreeTextType
  size: number
}

export type TreeResultType = LexerSplitInputType & {
  parseTree: TreeModuleType
}

export type TreeSignedIntegerType = LexerTokenBaseType & {
  like: Tree.SignedInteger
  value: number
}

export type TreeStringType = {
  like: Tree.String
  range: EmitterRangeMetadatType
  value: string
}

export type TreeTermType = {
  dereference: boolean
  guard: boolean
  like: Tree.Term
  parent: TreePathType
  query: boolean
  segment: Array<TreeStringType | TreePluginType>
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
      case Emitter.OpenDepth:
        api.parse_openDepth({
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

  api.assertTreeType(start, Tree.Module)

  return {
    ...input,
    parseTree: start,
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
  input.state.stack.pop()
}

export function parse_closeModule(input: TreeInputType): void {
  input.state.stack.pop()
}

export function parse_closePlugin(input: TreeInputType): void {
  input.state.stack.pop()
}

export function parse_openDepth(input: TreeInputType): void {
  // console.log('m')
}

export function parse_openHandle(input: TreeInputType): void {
  const { stack } = input.state
  const current = stack[stack.length - 1]

  switch (current?.like) {
    case Tree.Module: {
      const handle: TreeHandleType = {
        element: [],
        like: Tree.Handle,
        parent: current,
      }
      current.element.push(handle)
      stack.push(handle)
      break
    }
    // case Tree.Path: {
    //   break
    // }
    case Tree.Plugin: {
      const handle: TreeHandleType = {
        element: [],
        like: Tree.Handle,
        parent: current,
      }
      current.element = handle
      stack.push(handle)
      break
    }
    case Tree.Term: {
      const parent = current.parent.parent
      const handle: TreeHandleType = {
        element: [],
        like: Tree.Handle,
        parent,
      }
      parent.element.push(handle)
      stack.push(handle)
      break
    }
    default:
      api.throwError({
        code: '0024',
        file: current.like,
        note: 'Not implemented yet.',
      })
  }
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
  const { stack } = input.state
  const current = stack[stack.length - 1]

  switch (current?.like) {
    case Tree.Term: {
      const plugin: TreePluginType = {
        like: Tree.Plugin,
        parent: current,
        size: input.token.text.length,
      }

      current.segment.push(plugin)

      stack.push(plugin)

      break
    }
    default:
      api.throwError({
        code: '0024',
        file: current.like,
        note: 'Not implemented yet.',
      })
  }
}

export function parse_termFragment(input: TreeInputType): void {
  const { stack } = input.state
  const current = stack[stack.length - 1]

  switch (current?.like) {
    case Tree.Path: {
      const oldTerm =
        current.segment[current.segment.length - 1]

      if (input.token.like === Emitter.TermFragment) {
        const newTerm: TreeTermType = {
          dereference: input.token.dereference,
          guard: input.token.guard,
          like: Tree.Term,
          parent: current,
          query: input.token.query,
          segment: [],
        }

        newTerm.segment.push({
          like: Tree.String,
          range: input.token.range,
          value: input.token.value,
        })

        // if (!input.token.start) {
        //   const termList: Array<TreeTermType> = mergeTerms(
        //     oldTerm,
        //     newTerm,
        //   )
        // }
      }
      break
    }
    case Tree.Handle: {
      if (input.token.like === Emitter.TermFragment) {
        const newPath: TreePathType = {
          like: Tree.Path,
          parent: current,
          segment: [],
        }

        const newTerm: TreeTermType = {
          dereference: input.token.dereference,
          guard: input.token.guard,
          like: Tree.Term,
          parent: newPath,
          query: input.token.query,
          segment: [],
        }

        newPath.segment.push(newTerm)

        newTerm.segment.push({
          like: Tree.String,
          range: input.token.range,
          value: input.token.value,
        })

        current.head = newPath

        stack.push(newPath)
        stack.push(newTerm)
      }
      break
    }
    case Tree.Term: {
      const parent = current.parent
      const oldTerm = current

      if (input.token.like === Emitter.TermFragment) {
        const newTerm: TreeTermType = {
          dereference: input.token.dereference,
          guard: input.token.guard,
          like: Tree.Term,
          parent,
          query: input.token.query,
          segment: [],
        }

        newTerm.segment.push({
          like: Tree.String,
          range: input.token.range,
          value: input.token.value,
        })

        // if (!input.token.start) {
        //   const termList: Array<TreeTermType> = mergeTerms(
        //     oldTerm,
        //     newTerm,
        //   )
        // }
        parent.segment.push(newTerm)
      }
      break
    }
    default:
      api.throwError({
        code: '0024',
        file: current.like,
        note: 'Not implemented yet.',
      })
  }
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
      text.push(`${title}`)
      text.push(chalk.gray(`  size: ${node.size}`))
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

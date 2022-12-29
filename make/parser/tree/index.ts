import chalk from 'chalk'

import type {
  CursorRangeType,
  ErrorType,
  FoldNodeType,
  FoldResultType,
  TextSplitInputType,
  TextTokenType,
  TreeHandleType,
  TreeModuleType,
  TreeNodeType,
  TreePathType,
  TreePluginType,
  TreeResultType,
  TreeTermType,
  TreeUnsignedIntegerType,
} from '~'
import { Fold, TEXT_TYPE, Tree, api } from '~'

import { Text } from '../text/index.js'

export * from './type.js'

export function assertTextGenericType(
  object: unknown,
): asserts object is TextTokenType<Text> {
  if (!api.isTextGenericType(object)) {
    api.throwError()
  }
}

export function assertTextType<T extends Text>(
  object: unknown,
  like: T,
): asserts object is TextTokenType<T> {
  if (!api.isTextType<T>(object, like)) {
    api.throwError()
  }
}

type TreeInputType = TextSplitInputType & {
  state: {
    index: number
    stack: Array<TreeNodeType>
  }
  token: FoldNodeType
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
  input: FoldResultType,
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
      case Fold.OpenModule:
        start = api.parse_openModule({
          ...input,
          state,
          token,
        })
        break
      case Fold.CloseModule:
        api.parse_closeModule({
          ...input,
          state,
          token,
        })
        break
      case Fold.TermFragment:
        api.parse_termFragment({
          ...input,
          state,
          token,
        })
        break
      case Fold.OpenHandle:
        api.parse_openHandle({
          ...input,
          state,
          token,
        })
        break
      case Fold.OpenDepth:
        api.parse_openDepth({
          ...input,
          state,
          token,
        })
        break
      case Fold.CloseDepth:
        api.parse_closeDepth({
          ...input,
          state,
          token,
        })
        break
      case Fold.OpenPlugin:
        api.parse_openPlugin({
          ...input,
          state,
          token,
        })
        break
      case Fold.ClosePlugin:
        api.parse_closePlugin({
          ...input,
          state,
          token,
        })
        break
      case Fold.OpenTermPath:
        api.parse_openTermPath({
          ...input,
          state,
          token,
        })
        break
      case Fold.CloseTermPath:
        api.parse_closeTermPath({
          ...input,
          state,
          token,
        })
        break
      case Fold.OpenTerm:
        api.parse_openTerm({
          ...input,
          state,
          token,
        })
        break
      case Fold.CloseTerm:
        api.parse_closeTerm({
          ...input,
          state,
          token,
        })
        break
      case Fold.CloseHandle:
        api.parse_closeHandle({
          ...input,
          state,
          token,
        })
        break
      case Fold.UnsignedInteger:
        api.parse_unsignedInteger({
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

export function isTextGenericType(
  object: unknown,
): object is TextTokenType<Text> {
  return (
    api.isRecord(object) &&
    'like' in object &&
    TEXT_TYPE.includes((object as TextTokenType<Text>).like)
  )
}

export function isTextType<T extends Text>(
  object: unknown,
  like: T,
): object is TextTokenType<T> {
  return (
    api.isRecord(object) &&
    'like' in object &&
    (object as TextTokenType<Text>).like === like
  )
}

export function parse_closeDepth(input: TreeInputType): void {
  // console.log('m')
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

export function parse_closeTerm(input: TreeInputType): void {
  input.state.stack.pop()
}

export function parse_closeTermPath(
  input: TreeInputType,
): void {
  input.state.stack.pop()
}

export function parse_openDepth(input: TreeInputType): void {
  const { stack } = input.state
  const current = stack[stack.length - 1]

  switch (current?.like) {
    case Tree.Handle: {
      console.log(current)
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
    case Tree.Handle: {
      const handle: TreeHandleType = {
        element: [],
        like: Tree.Handle,
        parent: current,
      }
      current.element.push(handle)
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

export function parse_openTerm(input: TreeInputType): void {
  const { stack } = input.state
  const current = stack[stack.length - 1]

  switch (current?.like) {
    case Tree.Path: {
      const term: TreeTermType = {
        dereference: false,
        guard: false,
        like: Tree.Term,
        parent: current,
        query: false,
        segment: [],
      }

      stack.push(term)

      current.segment.push(term)
    }
  }
}

export function parse_openTermPath(input: TreeInputType): void {
  const { stack } = input.state
  const current = stack[stack.length - 1]

  switch (current?.like) {
    case Tree.Handle: {
      const path: TreePathType = {
        like: Tree.Path,
        parent: current,
        segment: [],
      }

      stack.push(path)

      if (!current.head) {
        current.head = path
      } else {
        current.element.push(path)
      }

      break
    }
  }
}

export function parse_termFragment(input: TreeInputType): void {
  const { stack } = input.state
  const current = stack[stack.length - 1]

  switch (current?.like) {
    case Tree.Term: {
      const parent = current.parent
      const oldTerm = current

      if (input.token.like === Fold.TermFragment) {
        oldTerm.dereference = input.token.dereference
        oldTerm.guard = input.token.guard
        oldTerm.like = Tree.Term
        oldTerm.parent = parent
        oldTerm.query = input.token.query

        oldTerm.segment.push({
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
        // parent.segment.push(newTerm)
        // stack.push(newTerm)
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

export function parse_unsignedInteger(
  input: TreeInputType,
): void {
  const { stack } = input.state
  const current = stack[stack.length - 1]

  switch (current?.like) {
    case Tree.Handle: {
      if (input.token.like === Fold.UnsignedInteger) {
        const uint: TreeUnsignedIntegerType = {
          like: Tree.UnsignedInteger,
          value: input.token.value,
        }

        current.element.push(uint)
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
      if (node.head) {
        text.push(chalk.gray(`  head:`))
        printParserASTDetails(node.head).forEach(line => {
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
      text.push(`${title} ${node.value}`)
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
          text.push(`    ${line}`)
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

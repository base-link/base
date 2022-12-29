import chalk from 'chalk'

import type {
  CursorRangeType,
  FoldNodeType,
  FoldResultType,
  SiteErrorType,
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
import { Fold, TEXT_TYPE, Tree, code } from '~'

import { Text } from '../text/index.js'

export * from './type.js'

export function assertTextGenericType(
  object: unknown,
): asserts object is TextTokenType<Text> {
  if (!code.isTextGenericType(object)) {
    code.throwError()
  }
}

export function assertTextType<T extends Text>(
  object: unknown,
  like: T,
): asserts object is TextTokenType<T> {
  if (!code.isTextType<T>(object, like)) {
    code.throwError()
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
  code.assertTreeType(current, Tree.Module)

  current.element.push(handle)
}

export function buildParseTree(
  input: FoldResultType,
): TreeResultType {
  const stack: Array<TreeNodeType> = []
  let result: TreeNodeType | undefined = undefined

  // console.log(code.prettifyJSON(input.tokenList))

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
        start = code.parse_openModule({
          ...input,
          state,
          token,
        })
        break
      case Fold.CloseModule:
        code.parse_closeModule({
          ...input,
          state,
          token,
        })
        break
      case Fold.TermFragment:
        code.parse_termFragment({
          ...input,
          state,
          token,
        })
        break
      case Fold.OpenHandle:
        code.parse_openHandle({
          ...input,
          state,
          token,
        })
        break
      case Fold.OpenDepth:
        code.parse_openDepth({
          ...input,
          state,
          token,
        })
        break
      case Fold.CloseDepth:
        code.parse_closeDepth({
          ...input,
          state,
          token,
        })
        break
      case Fold.OpenPlugin:
        code.parse_openPlugin({
          ...input,
          state,
          token,
        })
        break
      case Fold.ClosePlugin:
        code.parse_closePlugin({
          ...input,
          state,
          token,
        })
        break
      case Fold.OpenTermPath:
        code.parse_openTermPath({
          ...input,
          state,
          token,
        })
        break
      case Fold.CloseTermPath:
        code.parse_closeTermPath({
          ...input,
          state,
          token,
        })
        break
      case Fold.OpenTerm:
        code.parse_openTerm({
          ...input,
          state,
          token,
        })
        break
      case Fold.CloseTerm:
        code.parse_closeTerm({
          ...input,
          state,
          token,
        })
        break
      case Fold.CloseHandle:
        code.parse_closeHandle({
          ...input,
          state,
          token,
        })
        break
      case Fold.UnsignedInteger:
        code.parse_unsignedInteger({
          ...input,
          state,
          token,
        })
        break
    }

    i++
  }

  printParserMesh(result ?? start)

  code.assertTreeType(start, Tree.Module)

  return {
    ...input,
    parseTree: start,
  }
}

export function generateUnhandledTreeResolver(
  input: TreeInputType & { scope?: string },
): SiteErrorType {
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

  const text = code.generateHighlightedError(
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
    code.isRecord(object) &&
    'like' in object &&
    TEXT_TYPE.includes((object as TextTokenType<Text>).like)
  )
}

export function isTextType<T extends Text>(
  object: unknown,
  like: T,
): object is TextTokenType<T> {
  return (
    code.isRecord(object) &&
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
      code.throwError({
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
      code.throwError({
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
      code.throwError({
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
      code.throwError({
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
      code.throwError({
        code: '0024',
        file: current.like,
        note: 'Not implemented yet.',
      })
  }
}

function printParserMesh(base: TreeModuleType | unknown): void {
  const text: Array<string> = ['']

  if (!base) {
    text.push(`  undefined`)
  } else {
    printParserMeshDetails(base).forEach(line => {
      text.push(`  ${line}`)
    })
  }

  text.push('')

  console.log(text.join('\n'))
}

function printParserMeshDetails(
  node: TreeNodeType,
): Array<string> {
  const text: Array<string> = []

  const title = chalk.white(node.like)

  switch (node.like) {
    case Tree.Module: {
      text.push(`${title}`)
      node.element.forEach(el => {
        printParserMeshDetails(el).forEach(line => {
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
        printParserMeshDetails(node.head).forEach(line => {
          text.push(`    ${line}`)
        })
      } else {
        text.push(chalk.gray('  hook: undefined'))
      }
      if (node.element.length) {
        text.push(chalk.gray(`  element:`))
        node.element.forEach(el => {
          printParserMeshDetails(el).forEach(line => {
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
        printParserMeshDetails(node.element).forEach(line => {
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
        printParserMeshDetails(seg).forEach(line => {
          text.push(`  ${line}`)
        })
      })
      break
    }
    case Tree.Path: {
      text.push(`${title}`)
      node.segment.forEach(seg => {
        printParserMeshDetails(seg).forEach(line => {
          text.push(`  ${line}`)
        })
      })
      break
    }
  }

  return text
}

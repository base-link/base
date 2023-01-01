import chalk from 'chalk'

import type {
  FoldResultType,
  LinkInputType,
  LinkNodeType,
  LinkPathType,
  LinkPluginType,
  LinkResultType,
  LinkStringType,
  LinkTermType,
  LinkTextType,
  LinkTreeType,
  LinkUnsignedIntegerType,
  TextTokenType,
} from '~'
import { Fold, Link, TEXT_TYPE, code } from '~'

import { generateLinkTextBuildingDirections } from './fold/index.js'
import { Text, tokenizeLinkText } from './text/index.js'
import type { TextInputType } from './text/index.js'

export * from './fold/index.js'
export * from './text/index.js'

export * from './type.js'

export enum LinkHint {
  Code = 'code',
  DynamicTerm = 'dynamic-term',
  DynamicText = 'dynamic-text',
  Empty = '',
  Mark = 'mark',
  StaticTerm = 'static-term',
  StaticText = 'static-text',
}

export function assertTextGenericType(
  object: unknown,
  name?: string,
): asserts object is TextTokenType<Text> {
  if (!code.isTextGenericType(object)) {
    code.throwError(
      code.generateIncorrectlyTypedVariable('text', name),
    )
  }
}

export function assertTextType<T extends Text>(
  object: unknown,
  like: T,
  name?: string,
): asserts object is TextTokenType<T> {
  if (!code.isTextType<T>(object, like)) {
    code.throwError(
      code.generateIncorrectlyTypedVariable(like, name),
    )
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

export function parseLinkTree(
  input: FoldResultType,
): LinkResultType {
  const stack: Array<LinkNodeType> = []
  let result: LinkNodeType | undefined = undefined

  // console.log(code.prettifyJSON(input.directions))

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
      case Fold.OpenText:
        code.parse_openText({
          ...input,
          state,
          token,
        })
        break
      case Fold.CloseText:
        code.parse_closeText({
          ...input,
          state,
          token,
        })
        break
      case Fold.String:
        code.parse_string({
          ...input,
          state,
          token,
        })
        break
      default:
        code.throwError(
          code.generatedNotImplementedYetError(token.like),
        )
    }

    i++
  }

  code.assertLinkType(start, Link.Tree)

  printParserMesh(start)

  return {
    ...input,
    link: start,
  }
}

export function parse_closeDepth(input: LinkInputType): void {
  // console.log('m')
}

export function parse_closeHandle(input: LinkInputType): void {
  input.state.stack.pop()
}

export function parse_closeModule(input: LinkInputType): void {
  input.state.stack.pop()
}

export function parse_closePlugin(input: LinkInputType): void {
  input.state.stack.pop()
}

export function parse_closeTerm(input: LinkInputType): void {
  input.state.stack.pop()
}

export function parse_closeTermPath(
  input: LinkInputType,
): void {
  input.state.stack.pop()
}

export function parse_closeText(input: LinkInputType): void {
  input.state.stack.pop()
}

export function parse_openDepth(input: LinkInputType): void {
  const { stack } = input.state
  const current = stack[stack.length - 1]

  switch (current?.like) {
    case Link.Tree: {
      // console.log(current)
      break
    }
    default:
      code.throwError(
        code.generatedNotImplementedYetError(current?.like),
      )
  }
}

export function parse_openHandle(input: LinkInputType): void {
  const { stack } = input.state
  const current = stack[stack.length - 1]

  switch (current?.like) {
    case Link.Plugin: {
      const tree: LinkTreeType = {
        like: Link.Tree,
        nest: [],
        parent: current,
      }
      current.element = tree
      stack.push(tree)
      break
    }
    case Link.Term: {
      const parent = current.parent.parent
      const tree: LinkTreeType = {
        like: Link.Tree,
        nest: [],
        parent,
      }
      parent.nest.push(tree)
      stack.push(tree)
      break
    }
    case Link.Tree: {
      const tree: LinkTreeType = {
        like: Link.Tree,
        nest: [],
        parent: current,
      }
      current.nest.push(tree)
      stack.push(tree)
      break
    }
    default:
      code.throwError(
        code.generatedNotImplementedYetError(current?.like),
      )
  }
}

export function parse_openModule(input: LinkInputType) {
  // const current = stack[stack.length - 1]
  // const parent = stack[stack.length - 2]
  const container: LinkTreeType = {
    like: Link.Tree,
    nest: [],
  }
  input.state.stack.push(container)
  return container
}

export function parse_openPlugin(input: LinkInputType): void {
  const { stack } = input.state
  const current = stack[stack.length - 1]

  switch (current?.like) {
    case Link.Term: {
      if (input.token.like === Fold.OpenPlugin) {
        const plugin: LinkPluginType = {
          like: Link.Plugin,
          parent: current,
          size: input.token.size,
        }

        current.segment.push(plugin)

        stack.push(plugin)
      }

      break
    }
    default:
      code.throwError(
        code.generatedNotImplementedYetError(current?.like),
      )
  }
}

export function parse_openTerm(input: LinkInputType): void {
  const { stack } = input.state
  const current = stack[stack.length - 1]

  switch (current?.like) {
    case Link.Path: {
      const term: LinkTermType = {
        dereference: false,
        guard: false,
        like: Link.Term,
        parent: current,
        query: false,
        segment: [],
      }

      stack.push(term)

      current.segment.push(term)
      break
    }
    default:
      code.throwError(
        code.generatedNotImplementedYetError(current?.like),
      )
  }
}

export function parse_openTermPath(input: LinkInputType): void {
  const { stack } = input.state
  const current = stack[stack.length - 1]

  switch (current?.like) {
    case Link.Tree: {
      const path: LinkPathType = {
        like: Link.Path,
        parent: current,
        segment: [],
      }

      stack.push(path)

      if (!current.head) {
        current.head = path
      } else {
        current.nest.push(path)
      }

      break
    }
    default:
      code.throwError(
        code.generatedNotImplementedYetError(current?.like),
      )
  }
}

export function parse_openText(input: LinkInputType): void {
  const { stack } = input.state
  const current = stack[stack.length - 1]

  switch (current?.like) {
    case Link.Tree: {
      const text: LinkTextType = {
        like: Link.Text,
        segment: [],
      }

      current.nest.push(text)
      stack.push(text)
      break
    }
    default:
      code.throwError(
        code.generatedNotImplementedYetError(current?.like),
      )
  }
}

export function parse_string(input: LinkInputType): void {
  const { stack } = input.state
  const current = stack[stack.length - 1]

  switch (current?.like) {
    case Link.Text: {
      if (input.token.like === Fold.String) {
        const string: LinkStringType = {
          like: Link.String,
          range: input.token.range,
          value: input.token.text,
        }

        current.segment.push(string)
      }
      break
    }
    case Link.Tree: {
      if (input.token.like === Fold.String) {
        const string: LinkStringType = {
          like: Link.String,
          range: input.token.range,
          value: input.token.text,
        }

        current.nest.push(string)
      }
      break
    }
    default:
      code.throwError(
        code.generatedNotImplementedYetError(current?.like),
      )
  }
}

export function parse_termFragment(input: LinkInputType): void {
  const { stack } = input.state
  const current = stack[stack.length - 1]

  switch (current?.like) {
    case Link.Term: {
      const parent = current.parent
      const oldTerm = current

      if (input.token.like === Fold.TermFragment) {
        oldTerm.dereference = input.token.dereference
        oldTerm.guard = input.token.guard
        oldTerm.like = Link.Term
        oldTerm.parent = parent
        oldTerm.query = input.token.query

        oldTerm.segment.push({
          like: Link.String,
          range: input.token.range,
          value: input.token.value,
        })

        // if (!input.token.start) {
        //   const termList: Array<LinkTermType> = mergeTerms(
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
      code.throwError(
        code.generatedNotImplementedYetError(current?.like),
      )
  }
}

function printParserMesh(base: LinkNodeType): void {
  const text: Array<string> = ['']

  printParserMeshDetails(base).forEach(line => {
    text.push(`  ${line}`)
  })

  text.push('')

  console.log(text.join('\n'))
}

function printParserMeshDetails(
  node: LinkNodeType,
): Array<string> {
  const text: Array<string> = []

  const title = chalk.white(node.like)

  switch (node.like) {
    case Link.String: {
      text.push(`${title} ${chalk.green(node.value)}`)
      break
    }
    case Link.Tree: {
      text.push(`${title}`)
      if (node.head) {
        text.push(chalk.gray(`  head:`))
        printParserMeshDetails(node.head).forEach(line => {
          text.push(`    ${line}`)
        })
      } else {
        text.push(chalk.gray('  hook: undefined'))
      }
      if (node.nest.length) {
        text.push(chalk.gray(`  nest:`))
        node.nest.forEach(el => {
          printParserMeshDetails(el).forEach(line => {
            text.push(`    ${line}`)
          })
        })
      }
      break
    }
    case Link.UnsignedInteger: {
      text.push(`${title} ${node.value}`)
      break
    }
    case Link.Text: {
      text.push(`${title}`)
      node.segment.forEach(seg => {
        printParserMeshDetails(seg).forEach(line => {
          text.push(`    ${line}`)
        })
      })
      break
    }
    case Link.Plugin: {
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
    case Link.Index: {
      break
    }
    case Link.Decimal: {
      text.push(`${title} ${node.value}`)
      break
    }
    case Link.Hashtag: {
      text.push(`${title} ${node.system}${node.code}`)
      break
    }
    case Link.Term: {
      text.push(`${title}`)
      node.segment.forEach(seg => {
        printParserMeshDetails(seg).forEach(line => {
          text.push(`  ${line}`)
        })
      })
      break
    }
    case Link.Path: {
      text.push(`${title}`)
      node.segment.forEach(seg => {
        printParserMeshDetails(seg).forEach(line => {
          text.push(`  ${line}`)
        })
      })
      break
    }
    default:
      code.throwError(
        code.generatedNotImplementedYetError(undefined),
      )
  }

  return text
}

export function parse_unsignedInteger(
  input: LinkInputType,
): void {
  const { stack } = input.state
  const current = stack[stack.length - 1]

  switch (current?.like) {
    case Link.Tree: {
      if (input.token.like === Fold.UnsignedInteger) {
        const uint: LinkUnsignedIntegerType = {
          like: Link.UnsignedInteger,
          value: input.token.value,
        }

        current.nest.push(uint)
      }
      break
    }
    default:
      code.throwError(
        code.generatedNotImplementedYetError(current?.like),
      )
  }
}

// eslint-disable-next-line sort-exports/sort-exports
export const LINK_HINT_TEXT: Record<LinkHint, string> = {
  [LinkHint.Code]: 'boolean',
  [LinkHint.DynamicTerm]: 'dynamic term',
  [LinkHint.DynamicText]: 'dynamic text',
  [LinkHint.Empty]: 'empty',
  [LinkHint.Mark]: 'unsigned integer',
  [LinkHint.StaticTerm]: 'static term',
  [LinkHint.StaticText]: 'static text',
}

export function parseLinkText(
  input: TextInputType,
): LinkResultType {
  return parseLinkTree(
    generateLinkTextBuildingDirections(tokenizeLinkText(input)),
  )
}

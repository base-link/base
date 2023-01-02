import chalk from 'chalk'

import type {
  FoldResultType,
  LinkDecimalType,
  LinkHashtagType,
  LinkIndexType,
  LinkInputStateType,
  LinkInputType,
  LinkNodeType,
  LinkPathType,
  LinkPluginType,
  LinkResultType,
  LinkSignedIntegerType,
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
  DynamicPath = 'dynamic-path',
  DynamicTerm = 'dynamic-term',
  DynamicText = 'dynamic-text',
  Empty = '',
  Mark = 'mark',
  StaticPath = 'static-path',
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
  const state: LinkInputStateType = {
    contexts: [],
    index: 0,
    tree: { like: Link.Tree, nest: [] },
  }

  const context: LinkInputStateType['contexts'][0] = {
    path: [],
    stack: [state.tree],
    tree: state.tree,
  }

  state.contexts.push(context)

  let i = 0
  while (i < input.directions.length) {
    const token = input.directions[i]
    if (!token) {
      continue
    }

    switch (token.like) {
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
      case Fold.OpenIndex:
        code.parse_openIndex({
          ...input,
          state,
          token,
        })
        break
      case Fold.CloseIndex:
        code.parse_closeIndex({
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
      case Fold.Decimal:
        code.parse_decimal({
          ...input,
          state,
          token,
        })
        break
      case Fold.SignedInteger:
        code.parse_signedInteger({
          ...input,
          state,
          token,
        })
        break
      case Fold.Hashtag:
        code.parse_hashtag({
          ...input,
          state,
          token,
        })
        break
      case Fold.OpenNest:
        code.parse_openNest({
          ...input,
          state,
          token,
        })
        break
      case Fold.CloseNest:
        code.parse_closeNest({
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

  code.assertLinkType(state.tree, Link.Tree)

  printParserMesh(state.tree)

  return {
    ...input,
    link: state.tree,
  }
}

export function parse_closeHandle(input: LinkInputType): void {
  const { contexts } = input.state
  const context = contexts[contexts.length - 1]
  const stack = context?.stack
  stack?.pop()
}

export function parse_closeIndex(input: LinkInputType): void {
  const { contexts } = input.state
  contexts.pop()
}

export function parse_closeNest(input: LinkInputType): void {
  const { contexts } = input.state
  const context = contexts[contexts.length - 1]
  const stack = context?.stack
  stack?.pop()
  context?.path.pop()
}

export function parse_closePlugin(input: LinkInputType): void {
  const { contexts } = input.state
  contexts.pop()
}

export function parse_closeTerm(input: LinkInputType): void {
  const { contexts } = input.state
  const context = contexts[contexts.length - 1]
  const stack = context?.stack
  stack?.pop()
}

export function parse_closeTermPath(
  input: LinkInputType,
): void {
  const { contexts } = input.state
  const context = contexts[contexts.length - 1]
  const stack = context?.stack
  stack?.pop()
}

export function parse_closeText(input: LinkInputType): void {
  const { contexts } = input.state
  const context = contexts[contexts.length - 1]
  const stack = context?.stack
  stack?.pop()
}

export function parse_decimal(input: LinkInputType): void {
  const { contexts } = input.state
  const context = contexts[contexts.length - 1]
  const stack = context?.stack ?? []
  const current = stack?.[stack.length - 1]

  switch (current?.like) {
    case Link.Tree: {
      if (input.token.like === Fold.Decimal) {
        const uint: LinkDecimalType = {
          like: Link.Decimal,
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

export function parse_hashtag(input: LinkInputType): void {
  const { contexts } = input.state
  const context = contexts[contexts.length - 1]
  const stack = context?.stack ?? []
  const current = stack?.[stack.length - 1]

  switch (current?.like) {
    case Link.Tree: {
      if (input.token.like === Fold.Hashtag) {
        const uint: LinkHashtagType = {
          code: input.token.code,
          like: Link.Hashtag,
          system: input.token.system,
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

export function parse_openHandle(input: LinkInputType): void {
  const { contexts } = input.state
  const context = contexts[contexts.length - 1]
  const stack = context?.stack ?? []
  const current = stack?.[stack.length - 1]

  switch (current?.like) {
    case Link.Plugin: {
      const tree: LinkTreeType = {
        like: Link.Tree,
        nest: [],
        parent: current,
      }
      current.nest.push(tree)
      stack?.push(tree)
      break
    }
    case Link.Index: {
      const tree: LinkTreeType = {
        like: Link.Tree,
        nest: [],
        parent: current,
      }
      current.nest.push(tree)
      stack?.push(tree)
      break
    }
    case Link.Tree: {
      const tree: LinkTreeType = {
        like: Link.Tree,
        nest: [],
        parent: current,
      }
      current.nest.push(tree)
      stack?.push(tree)
      break
    }
    default:
      code.throwError(
        code.generatedNotImplementedYetError(current?.like),
      )
  }
}

export function parse_openIndex(input: LinkInputType): void {
  const { contexts } = input.state
  const context = contexts[contexts.length - 1]
  const stack = context?.stack ?? []
  const current = stack?.[stack.length - 1]

  switch (current?.like) {
    case Link.Path: {
      const index: LinkIndexType = {
        like: Link.Index,
        nest: [],
        parent: current,
      }

      current.segment.push(index)
      stack?.push(index)

      const tree = index

      contexts.push({
        path: [],
        stack: [tree],
        tree,
      })
      break
    }
    default:
      code.throwError(
        code.generatedNotImplementedYetError(current?.like),
      )
  }
}

export function parse_openNest(input: LinkInputType): void {
  const context =
    input.state.contexts[input.state.contexts.length - 1]

  if (!context) {
    return
  }

  let tree:
    | LinkTreeType
    | LinkPluginType
    | LinkIndexType
    | undefined = context.tree
  for (const part of context.path) {
    if (tree && tree.like === Link.Tree) {
      const node: LinkNodeType | undefined = tree.nest[part]
      if (node) {
        if (node.like === Link.Tree) {
          tree = node
        } else {
          tree = undefined
        }
      } else {
        tree = undefined
        break
      }
    } else if (tree && tree.like === Link.Plugin) {
      const node: LinkNodeType | undefined = tree.nest[part]
      if (node) {
        if (node.like === Link.Tree) {
          tree = node
        } else {
          tree = undefined
        }
      } else {
        tree = undefined
        break
      }
    } else if (tree && tree.like === Link.Index) {
      const node: LinkNodeType | undefined = tree.nest[part]
      if (node) {
        if (node.like === Link.Tree) {
          tree = node
        } else {
          tree = undefined
        }
      } else {
        tree = undefined
        break
      }
    }
  }

  if (
    tree &&
    (tree.like === Link.Tree ||
      tree.like === Link.Plugin ||
      tree.like === Link.Index)
  ) {
    context.path.push(tree.nest.length - 1)
    const node = tree.nest[tree.nest.length - 1]
    if (node) {
      context.stack.push(node)
    } else {
      // throw new Error()
    }
  } else {
    // throw new Error()
  }
}

export function parse_openPlugin(input: LinkInputType): void {
  const { contexts } = input.state
  const context = contexts[contexts.length - 1]
  const stack = context?.stack ?? []
  const current = stack?.[stack.length - 1]

  switch (current?.like) {
    case Link.Term: {
      if (input.token.like === Fold.OpenPlugin) {
        const plugin: LinkPluginType = {
          like: Link.Plugin,
          nest: [],
          parent: current,
          size: input.token.size,
        }

        current.segment.push(plugin)

        const tree = plugin

        contexts.push({
          path: [],
          stack: [tree],
          tree,
        })

        // stack?.push(plugin)
      }

      break
    }
    case Link.Text: {
      if (input.token.like === Fold.OpenPlugin) {
        const plugin: LinkPluginType = {
          like: Link.Plugin,
          nest: [],
          parent: current,
          size: input.token.size,
        }

        current.segment.push(plugin)

        const tree = plugin

        contexts.push({
          path: [],
          stack: [tree],
          tree,
        })

        // stack?.push(plugin)
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
  const { contexts } = input.state
  const context = contexts[contexts.length - 1]
  const stack = context?.stack ?? []
  const current = stack?.[stack.length - 1]

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

      stack?.push(term)

      current.segment.push(term)
      break
    }
    case Link.Plugin: {
      const term: LinkTermType = {
        dereference: false,
        guard: false,
        like: Link.Term,
        parent: current,
        query: false,
        segment: [],
      }

      stack?.push(term)

      current.nest.push(term)
      break
    }
    case Link.Tree: {
      const term: LinkTermType = {
        dereference: false,
        guard: false,
        like: Link.Term,
        parent: current,
        query: false,
        segment: [],
      }

      stack?.push(term)

      if (current.head) {
        current.nest.push(term)
      } else {
        current.head = term
      }
      break
    }
    default:
      code.throwError(
        code.generatedNotImplementedYetError(current?.like),
      )
  }
}

export function parse_openTermPath(input: LinkInputType): void {
  const { contexts } = input.state
  const context = contexts[contexts.length - 1]
  const stack = context?.stack ?? []
  const current = stack?.[stack.length - 1]

  switch (current?.like) {
    case Link.Tree: {
      const path: LinkPathType = {
        like: Link.Path,
        parent: current,
        segment: [],
      }

      stack?.push(path)

      current.nest.push(path)

      break
    }
    case Link.Plugin: {
      const path: LinkPathType = {
        like: Link.Path,
        parent: current,
        segment: [],
      }

      stack?.push(path)

      current.nest.push(path)

      break
    }
    case Link.Index: {
      const path: LinkPathType = {
        like: Link.Path,
        parent: current,
        segment: [],
      }

      stack?.push(path)

      current.nest.push(path)

      break
    }
    default:
      code.throwError(
        code.generatedNotImplementedYetError(current?.like),
      )
  }
}

export function parse_openText(input: LinkInputType): void {
  const { contexts } = input.state
  const context = contexts[contexts.length - 1]
  const stack = context?.stack ?? []
  const current = stack?.[stack.length - 1]

  switch (current?.like) {
    case Link.Tree: {
      const text: LinkTextType = {
        like: Link.Text,
        segment: [],
      }

      current.nest.push(text)
      stack?.push(text)
      break
    }
    default:
      code.throwError(
        code.generatedNotImplementedYetError(current?.like),
      )
  }
}

function printMesh(base: LinkNodeType): void {
  const text: Array<string> = ['']

  printMeshDetails(base).forEach(line => {
    text.push(`${line}`)
  })

  text.push('')

  console.log(text.join('\n'))
}

function printMeshDetails(
  node: LinkNodeType,
  flat = false,
): Array<string> {
  const text: Array<string> = []

  switch (node.like) {
    case Link.String: {
      text.push(node.value)
      break
    }
    case Link.Tree: {
      const head: Array<string> = []
      if (node.head) {
        printMeshDetails(node.head, flat).forEach(line => {
          head.push(`${line}`)
        })
      }
      const nest: Array<string> = []
      node.nest.forEach(el => {
        printMeshDetails(el, flat).forEach(line => {
          nest.push(`${line}`)
        })
      })

      if (flat) {
        text.push(`${head.join('')}(${nest.join(', ')})`)
      } else {
        text.push(`${head.join('')}`)
        nest.forEach(line => {
          text.push(`  ${line}`)
        })
      }
      break
    }
    case Link.UnsignedInteger: {
      text.push(chalk.green(`${node.value}`))
      break
    }
    case Link.Text: {
      const string: Array<string> = []
      node.segment.forEach(seg => {
        printMeshDetails(seg, true).forEach(line => {
          string.push(`${line}`)
        })
      })
      text.push(`<${string.join('')}>`)
      break
    }
    case Link.Plugin: {
      if (node.nest.length) {
        const plugin: Array<string> = []
        node.nest.forEach(nest => {
          printMeshDetails(nest, true).forEach(line => {
            plugin.push(`${line}`)
          })
        })
        text.push(
          '{'.repeat(node.size) +
            plugin.join('') +
            '}'.repeat(node.size),
        )
      }
      break
    }
    case Link.Index: {
      const index: Array<string> = []
      node.nest.forEach(nest => {
        printMeshDetails(nest, true).forEach(line => {
          index.push(`${line}`)
        })
      })
      text.push('[' + index.join('') + ']')
      break
    }
    case Link.Decimal: {
      text.push(`${node.value}`)
      break
    }
    case Link.Hashtag: {
      text.push(`#${node.system}${node.code}`)
      break
    }
    case Link.Term: {
      const term: Array<string> = []
      node.segment.forEach(seg => {
        printMeshDetails(seg, true).forEach(line => {
          term.push(line)
        })
      })
      text.push(term.join(''))
      break
    }
    case Link.Path: {
      const path: Array<string> = []
      node.segment.forEach((seg, i) => {
        printMeshDetails(seg, true).forEach(line => {
          if (i > 0 && seg.like !== Link.Index) {
            path.push('/')
          }
          path.push(line)
        })
      })
      text.push(path.join(''))
      break
    }
    default:
      code.throwError(
        code.generatedNotImplementedYetError(undefined),
      )
  }

  return text
}

function printParserMesh(base: LinkNodeType): void {
  const text: Array<string> = ['']

  printParserMeshDetails(base).forEach(line => {
    text.push(`  ${line}`)
  })

  text.push('')

  console.log(text.join('\n'))

  printMesh(base)
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
          text.push(`  ${line}`)
        })
      })
      break
    }
    case Link.Plugin: {
      text.push(`${title}`)
      text.push(chalk.gray(`  size: ${node.size}`))
      if (node.nest.length) {
        text.push(chalk.gray(`  nest:`))
        node.nest.forEach(nest => {
          printParserMeshDetails(nest).forEach(line => {
            text.push(`    ${line}`)
          })
        })
      }
      break
    }
    case Link.Index: {
      text.push(`${title}`)
      text.push(chalk.gray(`  nest:`))
      node.nest.forEach(nest => {
        printParserMeshDetails(nest).forEach(line => {
          text.push(`    ${line}`)
        })
      })
      break
    }
    case Link.Decimal: {
      text.push(`${title} ${node.value}`)
      break
    }
    case Link.Hashtag: {
      text.push(`${title} #${node.system}${node.code}`)
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

export function parse_signedInteger(
  input: LinkInputType,
): void {
  const { contexts } = input.state
  const context = contexts[contexts.length - 1]
  const stack = context?.stack ?? []
  const current = stack?.[stack.length - 1]

  switch (current?.like) {
    case Link.Tree: {
      if (input.token.like === Fold.SignedInteger) {
        const uint: LinkSignedIntegerType = {
          like: Link.SignedInteger,
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

export function parse_string(input: LinkInputType): void {
  const { contexts } = input.state
  const context = contexts[contexts.length - 1]
  const stack = context?.stack ?? []
  const current = stack?.[stack.length - 1]

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
  const { contexts } = input.state
  const context = contexts[contexts.length - 1]
  const stack = context?.stack ?? []
  const current = stack?.[stack.length - 1]

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

export function parse_unsignedInteger(
  input: LinkInputType,
): void {
  const { contexts } = input.state
  const context = contexts[contexts.length - 1]
  const stack = context?.stack ?? []
  const current = stack?.[stack.length - 1]

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
  [LinkHint.DynamicPath]: 'dynamic path',
  [LinkHint.Empty]: 'empty',
  [LinkHint.Mark]: 'unsigned integer',
  [LinkHint.StaticTerm]: 'static term',
  [LinkHint.StaticText]: 'static text',
  [LinkHint.StaticPath]: 'static path',
}

export function parseLinkText(
  input: TextInputType,
): LinkResultType {
  return parseLinkTree(
    generateLinkTextBuildingDirections(tokenizeLinkText(input)),
  )
}

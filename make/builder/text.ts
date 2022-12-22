import parse, {
  ParserNestNodeType,
  ParserNodeType,
} from '~parser'

import { Scope, ScopeType } from '~tool'

export function parseTextIntoTree(
  text: string,
): ParserNodeType {
  return parse(text)
}

export function resolveText(
  scope: ScopeType<Scope.Nest>,
): string | undefined {
  const nest = scope.data.nest

  if (nest.line.length > 1) {
    return
  }

  let line = nest.line[0]
  if (!line) {
    return
  }

  if (line.like !== 'text') {
    return
  }

  const str: Array<string> = []

  line.link.forEach(link => {
    switch (link.like) {
      case 'cord':
        str.push(link.cord)
        break
      case 'slot':
        // TODO
        const text: string = 'readNest(link, seed)'
        str.push(text)
        break
      default:
        throw new Error('Oops')
    }
  })

  return str.join('')
}

export function resolveTextDependencyList(
  nest: ParserNestNodeType,
): Array<ParserNestNodeType> {
  if (nest.line.length > 1) {
    return []
  }

  let line = nest.line[0]
  if (!line) {
    return []
  }

  if (line.like !== 'text') {
    return []
  }

  const array: Array<ParserNestNodeType> = []

  line.link.forEach(link => {
    switch (link.like) {
      case 'cord':
        break
      case 'slot':
        array.push(link.nest)
        break
      default:
        throw new Error('Oops')
    }
  })

  return array
}

export function textIsInterpolated(
  scope: ScopeType<Scope.Nest>,
): boolean {}

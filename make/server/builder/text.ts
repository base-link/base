import parse, {
  ParserNestNodeType,
  ParserNodeType,
} from '~parse'

import {
  LexicalScope,
  LexicalScopeNestAddonType,
} from '~server'

export function parseTextIntoTree(
  text: string,
): ParserNodeType {
  return parse(text)
}

export function resolveText(
  nest: ParserNestNodeType,
  scope: LexicalScope,
): string | undefined {
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
  scope: LexicalScope<LexicalScopeNestAddonType>,
): boolean {}

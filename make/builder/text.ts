import {
  NestInputType,
  Tree,
  TreeNestType,
  TreeNodeType,
  api,
} from '~'

export function parseTextIntoTree(text: string): TreeNodeType {
  return api.parseLinkText(text)
}

export function resolveText(
  input: NestInputType,
): string | undefined {
  const nest = input.nest

  if (nest.line.length > 1) {
    return
  }

  let line = nest.line[0]
  if (!line) {
    return
  }

  if (line.like !== Tree.Text) {
    return
  }

  const str: Array<string> = []

  line.link.forEach(link => {
    switch (link.like) {
      case Tree.Cord:
        str.push(link.cord)
        break
      case Tree.Slot:
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
  nest: TreeNestType,
): Array<TreeNestType> {
  if (nest.line.length > 1) {
    return []
  }

  let line = nest.line[0]
  if (!line) {
    return []
  }

  if (line.like !== Tree.Text) {
    return []
  }

  const array: Array<TreeNestType> = []

  line.link.forEach(link => {
    switch (link.like) {
      case Tree.Cord:
        break
      case Tree.Slot:
        array.push(link.nest)
        break
      default:
        throw new Error('Oops')
    }
  })

  return array
}

export function textIsInterpolated(
  input: NestInputType,
): boolean {
  return false
}

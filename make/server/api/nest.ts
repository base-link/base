import type { ParserNestNodeType } from '~parse'
import { api, Base, CompilerNestForkType } from '~server'
import shared from '~shared'

export function mintNestTree(
  base: Base,
  nest: ParserNestNodeType,
  seed,
): void {
  if (api.isTextNest(nest)) {
    return api.getTextNest(nest, seed)
  } else if (shared.isMark(nest)) {
  } else if (shared.isSimpleTerm(nest)) {
  }
}

export function readNest(
  fork: CompilerNestForkType,
): string | undefined {
  let value = fork.fork

  fork.nest.line.forEach(line => {
    switch (line.like) {
      case 'term':
        if (line.link.length > 1) {
          throw new Error(seed.link)
        } else {
          const link = line.link[0]
          if (value && value.hasOwnProperty(link.cord)) {
            value = value[link.cord]
          } else {
            value = null
          }
        }
        break
      default:
        throw new Error(line.like + ' ' + seed.link)
    }
  })
  return value
}

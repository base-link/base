import { NestInputType, Tree } from '~'

export function resolveStaticTerm(
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

  if (line.like !== Tree.Term) {
    return
  }

  if (line.link.length !== 1) {
    return
  }

  let link = line.link[0]
  if (link && link.like === Tree.Cord) {
    return link.cord
  }
}

export function termIsInterpolated(
  input: NestInputType,
): boolean {
  return false
}

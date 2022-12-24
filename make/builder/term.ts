import { APIInputType, TermInputType, Tree, api } from '~'

export function resolveStaticTerm(
  input: TermInputType,
): string | undefined {
  const term = input.term

  if (term.link.length !== 1) {
    return
  }

  let link = term.link[0]
  if (link && link.like === Tree.Cord) {
    return link.cord
  }
}

export function resolveStaticTermFromNest(
  input: APIInputType,
): string | undefined {
  const nest = api.assumeNest(input)

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
  input: APIInputType,
): boolean {
  return false
}

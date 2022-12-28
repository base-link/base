import { Tree, api } from '~'
import type { APIInputType } from '~'

export function assumeStaticTermFromNest(
  input: APIInputType,
): string {
  const term = api.resolveStaticTermFromNest(input)
  api.assertString(term)
  return term
}

export function resolveStaticTerm(
  input: APIInputType,
): string | undefined {
  const term = api.assumeInputObjectAsTreeType(Tree.Term, input)

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
  rank = 0,
): string | undefined {
  const nest = api.assumeNest(input, rank)

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

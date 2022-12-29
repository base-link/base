import { Link, code } from '~'
import type { MeshInputType } from '~'

export function assumeStaticTermFromNest(
  input: MeshInputType,
): string {
  const term = code.resolveStaticTermFromNest(input)
  code.assertString(term)
  return term
}

export function resolveStaticTerm(
  input: MeshInputType,
): string | undefined {
  const term = code.assumeInputObjectAsTreeType(
    Tree.Term,
    input,
  )

  if (term.link.length !== 1) {
    return
  }

  let link = term.link[0]
  if (link && link.like === Tree.Cord) {
    return link.cord
  }
}

export function resolveStaticTermFromNest(
  input: MeshInputType,
  rank = 0,
): string | undefined {
  const nest = code.assumeNest(input, rank)

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
  input: MeshInputType,
): boolean {
  const nest = code.assumeNest(input)

  if (nest.line.length > 1) {
    return false
  }

  let line = nest.line[0]
  if (!line) {
    return false
  }

  if (line.like !== Tree.Term) {
    return false
  }

  for (const link of line.link) {
    if (link.like === Tree.Slot) {
      return true
    }
  }

  return false
}

export function termIsNested(input: MeshInputType): boolean {
  const nest = code.assumeNest(input)

  let line = nest.line[0]
  if (!line) {
    return false
  }

  if (line.like !== Tree.Term) {
    return false
  }

  if (nest.line.length > 1) {
    return true
  }

  return false
}

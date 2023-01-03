import { Link, LinkType, code } from '~'
import type { MeshInputType } from '~'

export function assertNestChildrenLength(
  input: MeshInputType,
  length: number,
): void {
  const nest = code.assumeLinkType(input, Link.Tree)
  if (nest.nest.length !== length) {
    code.throwError(
      code.generateInvalidNestChildrenLengthError(input, length),
    )
  }
}

export function assumeTerm(input: MeshInputType): string {
  const term = code.resolveTerm(input)
  code.assertString(term)
  return term
}

export function getTerm(
  input: MeshInputType,
): LinkType<Link.Term> | undefined {
  const nest = code.assumeNest(input)

  if (nest.like === Link.Term) {
    return nest
  }

  if (nest.like !== Link.Tree) {
    return
  }

  const child = nest.head
  if (!child) {
    return
  }

  if (child.like !== Link.Term) {
    return
  }

  return child
}

export function resolveTerm(input: MeshInputType): string | undefined {
  const term = code.getTerm(input)
  code.assertLinkType(term, Link.Term)
  const string: Array<string> = []

  term.segment.forEach(seg => {
    if (seg.like === Link.String) {
      string.push(seg.value)
    } else {
      string.push('RESOLVE FROM PLUGIN')
    }
  })

  return string.join('')
}

export function termIsInterpolated(input: MeshInputType): boolean {
  const nest = code.assumeNest(input)
  const term = code.getTerm(input)
  if (!term) {
    return false
  }
  return code.termIsInterpolatedImpl(term)
}

export function termIsInterpolatedImpl(
  term: LinkType<Link.Term>,
): boolean {
  for (const seg of term.segment) {
    if (seg.like === Link.Plugin) {
      return true
    }
  }

  return false
}

export function termIsNested(input: MeshInputType): boolean {
  const nest = code.assumeNest(input)

  return nest.like === Link.Path
}

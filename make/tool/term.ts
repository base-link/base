import { Link, code } from '~'
import type { LinkType, SiteProcessInputType } from '~'

export function assertNestChildrenLength(
  input: SiteProcessInputType,
  length: number,
): void {
  const nest = code.assumeLink(input, Link.Tree)
  if (nest.nest.length !== length) {
    code.throwError(
      code.generateInvalidNestChildrenLengthError(input, length),
    )
  }
}

export function assumeTerm(input: SiteProcessInputType): string {
  const term = code.resolveTerm(input)
  code.assertString(term)
  return term
}

export function getTerm(
  input: SiteProcessInputType,
): LinkType<Link.Term> | undefined {
  const nest = code.assumeLinkNest(input)

  if (nest.type === Link.Term) {
    return nest
  }

  if (nest.type !== Link.Tree) {
    return
  }

  const child = nest.head
  if (!child) {
    return
  }

  if (child.type !== Link.Term) {
    return
  }

  return child
}

export function resolveTerm(
  input: SiteProcessInputType,
): string | undefined {
  const term = code.getTerm(input)
  code.assertLink(term, Link.Term)
  const string: Array<string> = []

  term.segment.forEach(seg => {
    if (seg.type === Link.String) {
      string.push(seg.value)
    } else {
      string.push('RESOLVE FROM PLUGIN')
    }
  })

  return string.join('')
}

export function termIsInterpolated(
  input: SiteProcessInputType,
): boolean {
  const nest = code.assumeLinkNest(input)
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
    if (seg.type === Link.Plugin) {
      return true
    }
  }

  return false
}

export function termIsNested(input: SiteProcessInputType): boolean {
  const nest = code.assumeLinkNest(input)

  return nest.type === Link.Path
}

import { Link, LinkHint, LinkType, SiteEnvironmentType, code } from '~'
import type { SiteProcessInputType } from '~'

export function assumeNest(
  input: SiteProcessInputType,
): LinkType<Link> {
  const nest = code.getEnvironmentProperty(input.environment, 'nest')
  code.assertGenericLink(nest)
  return nest
}

export function assumeNestIndex(input: SiteProcessInputType): number {
  const index = code.getEnvironmentProperty(input.environment, 'index')
  code.assertNumber(index)
  return index
}

export function determineNestType(
  input: SiteProcessInputType,
): LinkHint {
  if (code.nestIsTerm(input)) {
    if (code.termIsInterpolated(input)) {
      return LinkHint.DynamicTerm
    } else {
      return LinkHint.StaticTerm
    }
  } else if (code.nestIsPath(input)) {
    if (code.pathIsInterpolated(input)) {
      return LinkHint.DynamicPath
    } else {
      return LinkHint.StaticPath
    }
  } else if (code.nestIsText(input)) {
    if (code.textIsInterpolated(input)) {
      return LinkHint.DynamicText
    } else {
      return LinkHint.StaticText
    }
  } else if (code.nestIsUnsignedInteger(input)) {
    return LinkHint.Mark
  } else if (code.nestIsHashtag(input)) {
    return LinkHint.Code
  } else {
    code.throwError(code.generateUnhandledNestCaseBaseError(input))
  }

  return LinkHint.Empty
}

export function nestIsHashtag(input: SiteProcessInputType): boolean {
  const nest = code.assumeNest(input)

  return nest.like === Link.Hashtag
}

export function nestIsPath(input: SiteProcessInputType): boolean {
  const nest = code.assumeNest(input)

  return nest.like === Link.Path
}

export function nestIsTerm(input: SiteProcessInputType): boolean {
  const nest = code.assumeNest(input)

  if (nest.like === Link.Term) {
    return true
  }

  if (nest.like !== Link.Tree) {
    return false
  }

  const child = nest.head
  if (!child) {
    return false
  }

  if (child.like !== Link.Term) {
    return false
  }

  return true
}

export function nestIsText(input: SiteProcessInputType): boolean {
  const nest = code.assumeNest(input)

  return nest.like === Link.Text
}

export function nestIsUnsignedInteger(
  input: SiteProcessInputType,
): boolean {
  const nest = code.assumeNest(input)

  return nest.like === Link.UnsignedInteger
}

export function pathIsInterpolated(
  input: SiteProcessInputType,
): boolean {
  const nest = code.assumeNest(input)

  if (nest.like !== Link.Path) {
    return false
  }

  for (const seg of nest.segment) {
    if (seg.like === Link.Index) {
      return true
    }
    if (code.termIsInterpolatedImpl(seg)) {
      return true
    }
  }

  return false
}

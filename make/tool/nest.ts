import { Link, LinkHint, code } from '~'
import type {
  LinkTermType,
  LinkType,
  SiteProcessInputType,
  SiteStepScopeType,
} from '~'

export function assumeLinkNest(
  input: SiteProcessInputType,
): LinkType<Link> {
  const nest = code.getEnvironmentProperty(input.environment, 'nest')
  code.assertGenericLink(nest)
  return nest
}

export function assumeLinkNestIndex(
  input: SiteProcessInputType,
): number {
  const index = code.getEnvironmentProperty(input.environment, 'index')
  code.assertNumber(index)
  return index
}

export function getLinkHint(input: SiteProcessInputType): LinkHint {
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
  const nest = code.assumeLinkNest(input)

  return nest.type === Link.Hashtag
}

export function nestIsPath(input: SiteProcessInputType): boolean {
  const nest = code.assumeLinkNest(input)

  return nest.type === Link.Path
}

export function nestIsTerm(input: SiteProcessInputType): boolean {
  const nest = code.assumeLinkNest(input)

  if (nest.type === Link.Term) {
    return true
  }

  if (nest.type !== Link.Tree) {
    return false
  }

  const child = nest.head
  if (!child) {
    return false
  }

  if (child.type !== Link.Term) {
    return false
  }

  return true
}

export function nestIsText(input: SiteProcessInputType): boolean {
  const nest = code.assumeLinkNest(input)

  return nest.type === Link.Text
}

export function nestIsUnsignedInteger(
  input: SiteProcessInputType,
): boolean {
  const nest = code.assumeLinkNest(input)

  return nest.type === Link.UnsignedInteger
}

export function pathIsInterpolated(
  input: SiteProcessInputType,
): boolean {
  const nest = code.assumeLinkNest(input)

  if (nest.type !== Link.Path) {
    return false
  }

  for (const seg of nest.segment) {
    if (seg.type === Link.Index) {
      return true
    }
    if (code.termIsInterpolatedImpl(seg)) {
      return true
    }
  }

  return false
}

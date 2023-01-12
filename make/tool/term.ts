import { Link, code } from '~'
import type { LinkType, SiteProcessInputType } from '~'

export function assumeTermString(input: SiteProcessInputType): string {
  const term = code.resolveTermString(input)
  code.assertString(term)
  return term
}

export function attachStaticTerm(
  input: SiteProcessInputType,
  property: string,
  value: string,
): void {
  const blueString = code.createBlueString(value)
  code.pushRed(input, code.createRedValue(input, property, blueString))
  code.attachBlue(input, property, blueString)
}

export function bindTerm(input: SiteProcessInputType): void {
  const dependencyTree = code.resolveTermDependencyTree(input)
  const leafDependencyList = code.getLeafDependencyList(dependencyTree)
  code.registerReferenceWatchers(leafDependencyList)
  code.tryToResolveReferences()
}

export function getTerm(
  input: SiteProcessInputType,
): LinkType<Link.Term> | undefined {
  const nest = input.link.element

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

export function process_dynamicTerm(input: SiteProcessInputType): void {
  const nest = input.link.element
  code.pushRed(input, code.createRedValue(input, undefined, nest))
}

export function process_first_dynamicTerm(
  input: SiteProcessInputType,
  property: string,
): void {
  const nest = input.link.element

  code.assertLink(nest, Link.Term)
  code.pushRed(input, code.createRedValue(input, property, nest))
  code.attachBlue(input, property, code.createBlueTerm(nest))
}

export function process_first_staticTerm(
  input: SiteProcessInputType,
  property: string,
): void {
  const name = code.assumeTermString(input)
  const string = code.createBlueString(name)

  code.pushRed(input, code.createRedValue(input, property, string))
  code.attachBlue(input, property, string)
}

export function resolveTermString(
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
  const nest = input.link.element
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
  const nest = input.link.element

  return nest.type === Link.Path
}

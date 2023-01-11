import { Link, code } from '~'
import type { LinkType, SiteProcessInputType } from '~'

export function assumeTermString(input: SiteProcessInputType): string {
  const term = code.resolveTermString(input)
  code.assertString(term)
  return term
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
  code.createRed(input, code.createRedGather(input, undefined, [nest]))
}

export function process_first_dynamicTerm(
  input: SiteProcessInputType,
  placeholder: string,
): void {
  const nest = input.link.element
  code.createRed(
    input,
    code.createRedGather(input, placeholder, [nest]),
  )
}

export function process_first_staticTerm(
  input: SiteProcessInputType,
  placeholder: string,
): void {
  const name = code.resolveTermString(input)
  code.assertString(name)
  code.createRed(
    input,
    code.createRedGather(input, placeholder, [
      code.createBlueString(name),
    ]),
  )
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

import { Link, LinkHint, LinkNodeType, LinkTreeType, code } from '~'
import type { SiteProcessInputType } from '~'

export function assumeNest(
  input: SiteProcessInputType,
): Array<LinkNodeType> {
  return code.assumeLink(input, Link.Tree).nest
}

export function process_codeCard_bind(
  input: SiteProcessInputType,
): void {
  const nest = code.assumeNest(input)
  nest.forEach((nest, index) => {
    process_codeCard_bind_nestedChildren(
      code.withEnvironment(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_bind_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticTerm:
      const term = code.resolveTermString(input)
      break
    default:
      code.throwError(code.generateUnhandledTermCaseError(input))
  }
}

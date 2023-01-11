import { Link, LinkHint, code } from '~'
import type { SiteProcessInputType } from '~'

export function process_codeCard_test(
  input: SiteProcessInputType,
): void {
  code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
    process_codeCard_test_nestedChildren(
      code.withLink(input, nest, index),
    )
  })
}

export function process_codeCard_test_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticTerm:
      const term = code.resolveTermString(input)
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

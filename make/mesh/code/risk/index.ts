import { Link, LinkHint, code } from '~'
import type { SiteProcessInputType } from '~'

export function process_codeCard_risk(
  input: SiteProcessInputType,
): void {
  code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
    process_codeCard_risk_nestedChildren(
      code.withLink(input, nest, index),
    )
  })
}

export function process_codeCard_risk_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticText:
      break
    default:
      code.throwError(code.generateUnhandledTermCaseError(input))
  }
}

import { Link, LinkHint, code } from '~'
import type { SiteProcessInputType } from '~'

export function load_codeCard_stem(input: SiteProcessInputType): void {
  code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
    load_codeCard_stem_nestedChildren(code.withLink(input, nest, index))
  })
}

export function load_codeCard_stem_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticTerm:
      break
    default:
      code.throwError(code.generateUnhandledTermCaseError(input))
  }
}

import { Link, code } from '~'
import type { SiteProcessInputType } from '~'

export function load_codeCard_load_find_bear(
  input: SiteProcessInputType,
): void {
  code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
    code.load_codeCard_load_find_bear_nestedChildren(
      code.withLink(input, nest, index),
    )
  })
}

export function load_codeCard_load_find_bear_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  if (type === 'static-term') {
  } else {
    code.throwError(code.generateUnhandledTermCaseError(input))
  }
}

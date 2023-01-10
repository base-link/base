import { code , Link, LinkHint } from '~'
import type { SiteProcessInputType } from '~'

export function process_codeCard_host(
  input: SiteProcessInputType,
): void {
  code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
    process_codeCard_host_nestedChildren(
      code.withEnvironment(input, {
        index,
        nest,
      })
    )
  })
}

export function process_codeCard_host_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticTerm:
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

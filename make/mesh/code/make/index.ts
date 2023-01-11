import { Link, LinkHint, code } from '~'
import type { SiteProcessInputType } from '~'

export function process_codeCard_make(
  input: SiteProcessInputType,
): void {
  code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
    process_codeCard_make_nestedChildren(
      code.withEnvironment(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_make_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticTerm:
      const term = code.resolveTermString(input)
      switch (term) {
        case 'bind':
          code.process_codeCard_bind(input)
          break
        default:
          code.throwError(code.generateUnhandledTermCaseError(input))
      }
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

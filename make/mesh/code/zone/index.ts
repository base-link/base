import { Link, code } from '~'
import type { SiteProcessInputType } from '~'

export * from './hook/index.js'

export function load_codeCard_zone(input: SiteProcessInputType): void {
  code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
    code.load_codeCard_zone_nestedChildren(
      code.withLink(input, nest, index),
    )
  })
}

export function load_codeCard_zone_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  if (type === 'static-term') {
    const term = code.resolveTermString(input)
    switch (term) {
      case 'take':
        code.load_codeCard_link(input)
        break
      case 'hook':
        code.load_codeCard_zoneHook(input)
        break
      case 'head':
        code.load_codeCard_head(input)
        break
      default:
        code.throwError(code.generateUnknownTermError(input))
    }
  } else {
    code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

import { Link, LinkHint, code } from '~'
import type { SiteProcessInputType } from '~'

export function load_codeCard_face(input: SiteProcessInputType): void {
  code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
    load_codeCard_face_nestedChildren(code.withLink(input, nest, index))
  })
}

export function load_codeCard_face_nestedChildren(
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

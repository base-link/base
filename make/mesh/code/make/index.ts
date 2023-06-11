import { Link, LinkHint, code } from '~'
import type { MeshLoad } from '~'

export function load_codeCard_make(load: MeshLoad): void {
  code.assumeLink(load, Link.Tree).nest.forEach((nest, index) => {
    load_codeCard_make_nestedChildren(code.withLink(load, nest, index))
  })
}

export function load_codeCard_make_nestedChildren(
  load: MeshLoad,
): void {
  const type = code.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticTerm:
      const term = code.resolveTermString(load)
      switch (term) {
        case 'bind':
          code.load_codeCard_bind(load)
          break
        default:
          code.throwError(code.generateUnhandledTermCaseError(load))
      }
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(load, type))
  }
}

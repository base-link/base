import { Link, LinkHint, code } from '~'
import type { MeshLoad } from '~'

export function load_codeCard_note(load: MeshLoad): void {
  code.assumeLink(load, Link.Tree).nest.forEach((nest, index) => {
    load_codeCard_note_nestedChildren(code.withLink(load, nest, index))
  })
}

export function load_codeCard_note_nestedChildren(
  load: MeshLoad,
): void {
  const type = code.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticText:
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(load, type))
  }
}

import { Link, LinkHint, code } from '~'
import type { SiteProcessInputType } from '~'

export function load_codeCard_load_find_save(
  input: SiteProcessInputType,
): void {
  const nest = code.assumeLink(input, Link.Tree)

  nest.nest.forEach((nest, index) => {
    code.addTask(input.base, () => {
      code.load_codeCard_load_find_save_nestedChildren(
        code.withLink(input, nest, index),
      )
    })
  })
}

export function load_codeCard_load_find_save_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  if (type === LinkHint.StaticTerm) {
    const term = code.assumeTermString(input)

    code.load_find_scope(input)
  } else {
    code.throwError(code.generateUnhandledTermCaseError(input))
  }
}

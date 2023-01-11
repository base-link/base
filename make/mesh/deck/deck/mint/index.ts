import { Link, LinkHint, Mesh, code } from '~'
import type { SiteProcessInputType } from '~'

export function process_deckCard_deck_mint(
  input: SiteProcessInputType,
): void {
  code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
    process_deckCard_deck_mint_nestedChildren(
      code.withLink(input, nest, index),
    )
  })
}

export function process_deckCard_deck_mint_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticText:
      const text = code.resolveText(input)
      code.assertString(text)
      code.gatherIntoMeshParent(
        input,
        code.createStringConstant('version', text),
      )
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

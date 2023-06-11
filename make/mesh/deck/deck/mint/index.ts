import { Link, LinkHint, Mesh, code } from '~'
import type { SiteProcessInputType } from '~'

export function load_deckCard_deck_mint(
  input: SiteProcessInputType,
): void {
  code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
    load_deckCard_deck_mint_nestedChildren(
      code.withLink(input, nest, index),
    )
  })
}

export function load_deckCard_deck_mint_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticText:
      const string = code.assumeText(input)
      const blueString = code.createBlueString(string)
      code.pushRed(
        input,
        code.createRedValue(input, 'version', blueString),
      )
      code.attachBlue(input, 'mark', blueString)
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

import { Link, LinkHint, Mesh, code } from '~'
import type { MeshLoad } from '~'

export function load_deckCard_deck_mint(load: MeshLoad): void {
  code.assumeLink(load, Link.Tree).nest.forEach((nest, index) => {
    load_deckCard_deck_mint_nestedChildren(
      code.withLink(load, nest, index),
    )
  })
}

export function load_deckCard_deck_mint_nestedChildren(
  load: MeshLoad,
): void {
  const type = code.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticText:
      const string = code.assumeText(load)
      const blueString = code.createBlueString(string)
      code.pushRed(
        load,
        code.createRedValue(load, 'version', blueString),
      )
      code.attachBlue(load, 'mark', blueString)
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(load, type))
  }
}

export function load_deckCard_deck_mint(load: code.MeshLoad): void {
  code.assumeLink(load, Link.Tree).nest.forEach((nest, index) => {
    load_deckCard_deck_mint_nestedChildren(
      code.withLink(load, nest, index),
    )
  })
}

export function load_deckCard_deck_mint_nestedChildren(
  load: code.MeshLoad,
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

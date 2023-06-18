export function load_deckCard_deck_test(load: MeshLoad): void {
  card.assumeNest(load).forEach((nest, index) => {
    tool.loadTask(load.base, () => {
      card.load_deckCard_deck_test_leadLink(
        card.withLink(load, nest, index),
      )
    })
  })
}

export function load_deckCard_deck_test_leadLink(load: MeshLoad): void {
  const index = card.loadLinkIndex(load)
  if (index === 0) {
    const type = card.getLinkHint(load)
    switch (type) {
      case LinkHint.Text:
      case LinkHint.NickText: {
        card.bindText(load, string => {
          const path = card.resolveModulePath(load, string)
          const blueString = card.createBlueString(path)

          card.pushRed(
            load,
            card.createRedValue(load, 'test', blueString),
          )
          card.attachBlue(load, 'test', blueString)

          tool.loadTask(load.base, () => {
            card.handle_codeCard(load.base, path)
          })
        })
        break
      }
      default:
        card.throwError(card.generateUnhandledNestCaseError(load, type))
    }
  } else {
    throw new Error('Too many loads.')
  }
}

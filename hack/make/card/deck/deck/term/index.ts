export function load_deckCard_deck_term(load: MeshLoad): void {
  card.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
    load_deckCard_deck_term_leadLink(card.withLink(load, nest, index))
  })
}

export function load_deckCard_deck_term_leadLink(load: MeshLoad): void {
  const type = card.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticText:
      break
    default:
      card.throwError(card.generateUnhandledNestCaseError(load, type))
  }
}

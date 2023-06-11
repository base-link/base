export function load_deckCard_deck_face(load: code.MeshLoad): void {
  code.assumeLink(load, Link.Tree).nest.forEach((nest, index) => {
    load_deckCard_deck_face_nestedChildren(
      code.withLink(load, nest, index),
    )
  })
}

export function load_deckCard_deck_face_nestedChildren(
  load: code.MeshLoad,
): void {
  const type = code.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticText:
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(load, type))
  }
}

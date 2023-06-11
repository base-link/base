import card from '~/make/card.js'
import { MeshLoad } from '~/make/form.js'

export function load_deckCard_deck_face(load: MeshLoad): void {
  card.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
    load_deckCard_deck_face_nestedChildren(
      card.withLink(load, nest, index),
    )
  })
}

export function load_deckCard_deck_face_nestedChildren(
  load: MeshLoad,
): void {
  const type = card.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticText:
      break
    default:
      card.throwError(card.generateUnhandledNestCaseError(load, type))
  }
}

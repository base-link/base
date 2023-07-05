import card from '../../../../card.js'
import { MeshLoad } from '../../../../form.js'

export function load_deckCard_deck_face(load: MeshLoad): void {
  card.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
    load_deckCard_deck_face_leadLink(card.withLink(load, nest, index))
  })
}

export function load_deckCard_deck_face_leadLink(load: MeshLoad): void {
  const type = card.getLinkHint(load)
  switch (type) {
    case LinkHint.NickText:
    case LinkHint.Text:
      card.bindText(load, text => {
        load.tree.saveList('face', card.makeText(text))
      })
      break
    default:
      card.throwError(card.generateUnhandledNestCaseError(load, type))
  }
}

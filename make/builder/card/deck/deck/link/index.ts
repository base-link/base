import { Mesh, NestInputType, api } from '~'

export function process_deckCard_deck_link(
  input: NestInputType,
) {
  const text = api.resolveText(input)
  if (text) {
    const [host, name] = text.slice(1).split('/')
    if (!host || !name) {
      api.throwError(api.generateInvalidDeckLink(input, text))
    }

    const card = api.getForkProperty(input.fork, 'card')
    api.assertMesh(card, Mesh.DeckCard)
    if (host && name) {
      card.deck.host = host
      card.deck.name = name
    }
  }
}

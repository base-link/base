import { Mesh, Nest, NestInputType, api } from '~'

export function finalize_deckCard_deck_bear(
  input: NestInputType,
): void {
  const text = api.resolveText(input)
  const card = api.getProperty(input, 'card')
  api.assertMesh(card, Mesh.DeckCard)
  api.assertString(text)
  const path = api.findPath(text, card.directory)
  if (!path) {
    api.throwError(api.generateUnresolvedPathError(input, text))
  }
  card.deck.bear = path
}

export function process_deckCard_deck_bear(
  input: NestInputType,
): void {
  api.assertNestChildrenLength(input, 1)

  const nest = input.nest.nest[0]
  api.assertNest(nest)

  api.processTextNest(
    {
      ...input,
      index: 0,
      nest,
    },
    api.finalize_deckCard_deck_bear,
  )
}

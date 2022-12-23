import { Mesh, NestInputType, api } from '~'

export function finalize_deckCard_deck_bear(
  input: NestInputType,
): void {
  api.assertNestChildrenLength(input, 1)

  const text = api.resolveText(input)
  const card = api.getForkProperty(input.fork, 'card')
  api.assertMesh(card, Mesh.DeckCard)
  card.deck.bear = text
}

export function process_deckCard_deck_bear(
  input: NestInputType,
): void {
  api.assertNestChildrenLength(input, 1)

  const nest = input.nest.nest[0]
  if (nest) {
    const dependencyList = api.resolveTextDependencyList(nest)
    api.processDependencyList(
      dependencyList,
      input,
      api.finalize_deckCard_deck_bear,
    )
  }
}

import { APIInputType, AST, api } from '~'

export function finalize_deckCard_deck_test(
  input: APIInputType,
): void {
  const text = api.resolveText(input)
  const card = api.getProperty(input, 'card')
  api.assertAST(card, AST.DeckCard)
  api.assertString(text)
  const path = api.findPath(text, card.directory)
  if (!path) {
    api.throwError(api.generateUnresolvedPathError(input, text))
  }
  card.deck.test = path
}

export function process_deckCard_deck_test(
  input: APIInputType,
): void {
  api.assertNestChildrenLength(input, 1)

  const nest = api.assumeNest(input).nest[0]

  api.processTextNest(
    {
      ...input,
      index: 0,
      nest,
    },
    api.finalize_deckCard_deck_test,
  )
}

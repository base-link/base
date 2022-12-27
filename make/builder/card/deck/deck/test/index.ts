import { APIInputType, AST, api } from '~'

export function finalize_deckCard_deck_test(
  input: APIInputType,
): void {
  const text = api.resolveText(input)
  api.assertString(text)

  const card = api.getProperty(input, 'card')
  api.assertAST(card, AST.PackageModule)

  const path = api.assumePath(input, text)
  card.deck.test = path
}

export function process_deckCard_deck_test(
  input: APIInputType,
): void {
  api.assertNestChildrenLength(input, 1)

  const nest = api.assumeNest(input).nest[0]

  api.processTextNest(
    api.extendWithNestScope(input, {
      index: 0,
      nest,
    }),
    api.finalize_deckCard_deck_test,
  )
}

import { APIInputType, AST, api } from '~'

export function finalize_deckCard_deck_bear(
  input: APIInputType,
): void {
  const text = api.resolveText(input)
  const { card } = input
  api.assertAST(card, AST.PackageModule)
  api.assertString(text)
  const path = api.findPath(text, card.directory)
  if (!path) {
    api.throwError(api.generateUnresolvedPathError(input, text))
  }
  card.deck.bear = path
}

export function process_deckCard_deck_bear(
  input: APIInputType,
): void {
  api.assertNestChildrenLength(input, 1)

  const nest = api.assumeNest(input).nest[0]

  api.processTextNest(
    api.extendWithNestScope(input, { index: 0, nest }),
    api.finalize_deckCard_deck_bear,
  )
}

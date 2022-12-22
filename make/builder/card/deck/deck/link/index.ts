import { AST, Scope, ScopeType, api } from '~tool'

export function process_deckCard_deck_link(
  scope: ScopeType<Scope.Nest>,
) {
  const text = api.resolveText(scope)
  if (text) {
    const [host, name] = text.slice(1).split('/')
    if (!host || !name) {
      api.throwError(api.generateInvalidDeckLink(scope, text))
    }

    const card = api.getPropertyValueFromScope(scope, 'card')
    api.assertAST(card, AST.DeckCard)
    if (host && name) {
      card.deck.host = host
      card.deck.name = name
    }
  }
}

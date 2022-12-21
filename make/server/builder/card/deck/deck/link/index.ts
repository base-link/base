import { ParserNestNodeType } from '~parse'

import { Scope, ScopeType, api } from '~server'

export function process_deckCard_deck_link(
  scope: ScopeType<Scope.Nest, ScopeType<Scope.DeckCard>>,
) {
  const nest = api.getPropertyValueFromScope(
    scope,
    'nest',
  ) as ParserNestNodeType

  if (nest && nest.like === 'nest') {
    const text = api.resolveText(scope)
    if (text) {
      const [host, name] = text.slice(1).split('/')
      if (scope.parent && host && name) {
        scope.parent.data.card.deck.host = host
        scope.parent.data.card.deck.name = name
      }
    }
  }
}

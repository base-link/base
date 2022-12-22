import { AST, Scope, ScopeType, api } from '~tool'

export function finalize_deckCard_deck_bear(
  scope: ScopeType<Scope.Nest>,
): void {
  api.assertNestChildrenLength(scope, 1)

  const text = api.resolveText(scope)
  const card = api.getPropertyValueFromScope(scope, 'card')
  api.assertAST(card, AST.DeckCard)
  card.deck.bear = text
}

export function process_deckCard_deck_bear(
  scope: ScopeType<Scope.Nest>,
): void {
  api.assertNestChildrenLength(scope, 1)

  const nest = scope.data.nest.nest[0]
  if (nest) {
    const dependencyList = api.resolveTextDependencyList(nest)
    api.processDependencyList(
      dependencyList,
      scope,
      api.finalize_deckCard_deck_bear,
    )
  }
}

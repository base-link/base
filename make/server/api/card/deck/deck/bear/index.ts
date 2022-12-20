import {
  ASTDeckCardType,
  LexicalScope,
  LexicalScopeNestAddonType,
  api,
} from '~server'

export function finalize_deckCard_deck_bearTerm(
  scope: LexicalScope<
    LexicalScopeNestAddonType,
    ASTDeckCardType
  >,
): void {
  const nest = scope.data.nest.nest[0]
  if (nest) {
    const text = api.getText(nest, scope)
    if (scope.parent) {
      scope.parent.data.deck.bear = text
    }
  }
}

export function process_deckCard_deck_bearTerm(
  scope: LexicalScope<
    LexicalScopeNestAddonType,
    ASTDeckCardType
  >,
): void {
  const nest = scope.data.nest.nest[0]
  if (nest) {
    const dependencyList = api.getTextDependencyList(nest)
    api.processDependencyList(
      dependencyList,
      scope,
      api.finalize_deckCard_deck_bearTerm,
    )
  }
}

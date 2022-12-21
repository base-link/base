import { api } from '~server'
import { Scope, ScopeType } from '~server/type'

export function process_deckCard_deck_test(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendNest(scope, nest, index)
    process_deckCard_deck_test_nestedChildren(nestedScope)
  })
}

export function process_deckCard_deck_test_nestedChildren(
  scope: ScopeType<Scope.Nest>,
): void {
  const type = api.determineNestType(scope)
  switch (type) {
    case 'text':
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(scope))
  }
}

import { api } from '~server'
import { Nest, Scope, ScopeType } from '~server/type'

export function process_deckCard_deck_face(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendNest(scope, nest, index)
    process_deckCard_deck_face_nestedChildren(nestedScope)
  })
}

export function process_deckCard_deck_face_nestedChildren(
  scope: ScopeType<Scope.Nest>,
): void {
  const type = api.determineNestType(scope)
  switch (type) {
    case Nest.StaticText:
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(scope))
  }
}

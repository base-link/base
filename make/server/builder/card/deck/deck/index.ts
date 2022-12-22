import { Nest, Scope, ScopeType, api } from '~server'

export * from './bear'
export * from './face'
export * from './link'
export * from './term'
export * from './test'

export function process_deckCard_deck(
  scope: ScopeType<Scope.Nest, ScopeType<Scope.DeckCard>>,
): void {
  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendNest(scope, nest, index)
    api.process_deckCard_deck_nestedChildren(nestedScope)
  })
}

export function process_deckCard_deck_nestedChildren(
  scope: ScopeType<Scope.Nest, ScopeType<Scope.DeckCard>>,
): void {
  const type = api.determineNestType(scope)
  switch (type) {
    case Nest.DynamicTerm:
    case Nest.DynamicText:
      api.throwError(
        api.generateUnhandledNestCaseError(scope, type),
      )
      break
    case Nest.StaticText:
      if (scope.data.index === 0) {
        api.process_deckCard_deck_link(scope)
      } else {
        throw new Error('Unhandled text.')
      }
      break
    case Nest.StaticTerm:
      if (scope.data.index > 0) {
        api.process_deckCard_deck_nestedTerm(scope)
      } else {
        throw new Error('Unhandled term.')
      }
      break
  }
}

export function process_deckCard_deck_nestedTerm(
  scope: ScopeType<Scope.Nest, ScopeType<Scope.DeckCard>>,
): void {
  const term = api.resolveStaticTerm(scope)
  switch (term) {
    case 'bear': {
      api.process_deckCard_deck_bear(scope)
      break
    }
    case 'test': {
      api.process_deckCard_deck_test(scope)
      break
    }
    default: {
      api.throwError(api.generateUnknownTermError(scope))
    }
  }
}

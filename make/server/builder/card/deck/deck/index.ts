import { Scope, ScopeType, api } from '~server'

export * from './bear'
export * from './link'
export * from './test'

export function process_deckCard_deck(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach((nest, i) => {
    const nestedScope = api.extendScope({ i, nest }, scope)
    api.process_deckCard_deck_nestedChildren(nestedScope)
  })
}

export function process_deckCard_deck_nestedChildren(
  scope: ScopeType<Scope.Nest>,
): void {
  const nest = scope.data.nest

  if (api.nestHasSlot(scope)) {
    api.generateUnhandledTermInterpolationError(
      api.extendScope({ nest }, scope),
    )
  } else if (api.nestIsText(scope) && i === 0) {
    api.process_deckCard_deck_link(
      api.extendScope({ nest }, scope),
    )
  } else if (i > 0 && api.nestIsStaticTerm(scope)) {
    api.process_deckCard_deck_nestedTerm(
      api.extendScope({ nest }, scope),
    )
  } else {
    api.throwError(
      api.generateUnhandledTermCaseError(
        api.extendScope({ nest }, scope),
      ),
    )
  }
}

export function process_deckCard_deck_nestedTerm(
  scope: ScopeType<Scope.Nest>,
): void {
  const term = api.resolveStaticTerm(scope)
  switch (term) {
    case 'bear': {
      api.process_deckCard_deck_bearTerm(scope)
      break
    }
    case 'test': {
      api.process_deckCard_deck_testTerm(scope)
      break
    }
    default: {
      api.throwError(api.generateUnknownTermError(scope))
    }
  }
}

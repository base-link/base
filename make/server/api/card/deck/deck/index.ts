import {
  LexicalScope,
  LexicalScopeNestAddonType,
  api,
} from '~server'
import shared from '~shared'

export * from './bear'
export * from './link'
export * from './test'

export function process_deckCard_deck(
  scope: LexicalScope<LexicalScopeNestAddonType>,
): void {
  scope.data.nest.nest.forEach((nest, i) => {
    if (api.nestHasSlot(nest)) {
      api.generateUnhandledTermInterpolationError(
        api.extendScope(scope, { nest }),
      )
    } else if (api.isText(nest) && i === 0) {
      api.process_deckCard_deck_link(
        api.extendScope(scope, { nest }),
      )
    } else if (i > 0 && shared.isSimpleTerm(nest)) {
      api.process_deckCard_deck_nestedTerm(
        api.extendScope(scope, { nest }),
      )
    } else {
      api.throwError(
        api.generateUnhandledTermCaseError(
          api.extendScope(scope, { nest }),
        ),
      )
    }
  })
}

export function process_deckCard_deck_nestedTerm(
  scope: LexicalScope<LexicalScopeNestAddonType>,
): void {
  const term = shared.getSimpleTerm(scope.data.nest)
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

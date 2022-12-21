import { Scope, ScopeType, api } from '~server'

export * from './bear'
export * from './take'

export function process_codeCard_load(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendNest(scope, nest, index)
    process_codeCard_load_nestedChildren(nestedScope)
  })
}

export function process_codeCard_load_nestedChildren(
  scope: ScopeType<Scope.Nest>,
) {
  const type = api.determineNestType(scope)
  if (type === 'static-term') {
    const term = api.resolveStaticTerm(scope)
    switch (term) {
      case 'take':
        api.process_codeCard_load_take(scope)
        break
      case 'load':
        api.process_codeCard_load(scope)
        break
      case 'bear':
        api.process_codeCard_load_bear(scope)
        break
      default:
        api.throwError(api.generateUnknownTermError(scope))
    }
  } else {
    api.throwError(
      api.generateUnhandledNestCaseError(scope, type),
    )
  }
}

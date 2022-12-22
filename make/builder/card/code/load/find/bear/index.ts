import { Scope, ScopeType, api } from '~tool'

export function process_codeCard_load_find_bear(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendNest(scope, nest, index)
    api.process_codeCard_load_find_bear_nestedChildren(
      nestedScope,
    )
  })
}

export function process_codeCard_load_find_bear_nestedChildren(
  scope: ScopeType<Scope.Nest>,
): void {
  const type = api.determineNestType(scope)
  if (type === 'static-term') {
  } else {
    api.throwError(api.generateUnhandledTermCaseError(scope))
  }
}

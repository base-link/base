import { Nest, Scope, ScopeType, api } from '~tool'

export function process_codeCard_formCase(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendNest(scope, nest, index)
    process_codeCard_formCase_nestedChildren(nestedScope)
  })
}

export function process_codeCard_formCase_nestedChildren(
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

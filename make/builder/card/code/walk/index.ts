import { api } from '~tool'
import { Nest, Scope, ScopeType } from '~type'

export function process_codeCard_walk(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendNest(scope, nest, index)
    process_codeCard_walk_nestedChildren(nestedScope)
  })
}

export function process_codeCard_walk_nestedChildren(
  scope: ScopeType<Scope.Nest>,
): void {
  const type = api.determineNestType(scope)
  switch (type) {
    case Nest.StaticTerm:
      const term = api.resolveStaticTerm(scope)
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(scope))
  }
}

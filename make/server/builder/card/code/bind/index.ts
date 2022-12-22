import { api } from '~server'
import { Nest, Scope, ScopeType } from '~server/type'

export function process_codeCard_bind(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendNest(scope, nest, index)
    process_codeCard_bind_nestedChildren(nestedScope)
  })
}

export function process_codeCard_bind_nestedChildren(
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

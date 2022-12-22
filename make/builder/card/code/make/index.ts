import { api } from '~tool'
import { Nest, Scope, ScopeType } from '~type'

export function process_codeCard_make(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendNest(scope, nest, index)
    process_codeCard_make_nestedChildren(nestedScope)
  })
}

export function process_codeCard_make_nestedChildren(
  scope: ScopeType<Scope.Nest>,
): void {
  const type = api.determineNestType(scope)
  switch (type) {
    case Nest.StaticTerm:
      const term = api.resolveStaticTerm(scope)
      switch (term) {
        case 'bind':
          api.process_codeCard_bind(scope)
          break
      }
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(scope))
  }
}

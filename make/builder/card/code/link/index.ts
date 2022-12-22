import { api } from '~tool'
import { Nest, Scope, ScopeType } from '~type'

export function process_codeCard_link(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendNest(scope, nest, index)
    process_codeCard_link_nestedChildren(nestedScope)
  })
}

export function process_codeCard_link_base(
  scope: ScopeType<Scope.Nest>,
): void {}

export function process_codeCard_link_nestedChildren(
  scope: ScopeType<Scope.Nest>,
): void {
  const type = api.determineNestType(scope)
  switch (type) {
    case Nest.StaticTerm:
      const term = api.resolveStaticTerm(scope)
      switch (term) {
        case 'like':
          api.process_codeCard_like(scope)
          break
        case 'list':
          api.process_codeCard_like_list(scope)
          break
        case 'mesh':
          api.process_codeCard_like_mesh(scope)
          break
        case 'time':
          api.process_codeCard_time(scope)
          break
        case 'base':
          api.process_codeCard_link_base(scope)
          break
      }
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(scope))
  }
}

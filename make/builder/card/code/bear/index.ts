import { api } from '~tool'
import { Nest, Scope, ScopeType } from '~type'

export function process_codeCard_bear(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendNest(scope, nest, index)
    api.process_codeCard_bear_nestedChildren(nestedScope)
  })
}

export function process_codeCard_bear_hide(
  scope: ScopeType<Scope.Nest>,
): void {}

export function process_codeCard_bear_nestedChildren(
  scope: ScopeType<Scope.Nest>,
): void {
  const type = api.determineNestType(scope)
  switch (type) {
    case Nest.StaticText:
      break
    case Nest.StaticTerm:
      const term = api.resolveStaticTerm(scope)
      switch (term) {
        case 'hide':
          api.process_codeCard_bear_hide(scope)
          break
      }
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(scope))
  }
}

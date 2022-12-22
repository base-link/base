import { api } from '~server'
import { Nest } from '~server/builder/nest'
import { Scope, ScopeType } from '~server/type'

export function process_codeCard_bear(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendNest(scope, nest, index)
    api.process_codeCard_bear_nestedChildren(nestedScope)
  })
}

export function process_codeCard_bear_nestedChildren(
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

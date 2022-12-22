import { api } from '~tool'
import { Scope, ScopeType } from '~type'

export function process_codeCard_formTask(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendNest(scope, nest, index)
    process_codeCard_formTask_nestedChildren(nestedScope)
  })
}

export function process_codeCard_formTask_nestedChildren(
  scope: ScopeType<Scope.Nest>,
): void {
  const type = api.determineNestType(scope)
  switch (type) {
    case 'text':
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(scope))
  }
}

import { api } from '~tool'
import { Scope, ScopeType } from '~type'

export function process_codeCard_suit(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendNest(scope, nest, index)
    api.process_codeCard_suit_nestedChildren(nestedScope)
  })
}

export function process_codeCard_suit_nestedChildren(
  scope: ScopeType<Scope.Nest>,
): void {
  const type = api.determineNestType(scope)
  if (type === 'static-term') {
    const term = api.resolveStaticTerm(scope)
    switch (term) {
      case 'link':
        api.process_codeCard_formLink(scope)
        break
      case 'task':
        api.process_codeCard_formTask(scope)
        break
      case 'head':
        api.process_codeCard_head(scope)
        break
      default:
        api.throwError(api.generateUnknownTermError(scope))
    }
  } else {
    api.throwError(api.generateUnhandledTermCaseError(scope))
  }
}

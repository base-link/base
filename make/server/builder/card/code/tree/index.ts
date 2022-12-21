import { api } from '~server'
import { Scope, ScopeType } from '~server/type'

export * from './hook'

export function process_codeCard_tree(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendNest(scope, nest, index)
    api.process_codeCard_tree_nestedChildren(nestedScope)
  })
}

export function process_codeCard_tree_nestedChildren(
  scope: ScopeType<Scope.Nest>,
): void {
  const type = api.determineNestType(scope)
  if (type === 'static-term') {
    const term = api.resolveStaticTerm(scope)
    switch (term) {
      case 'take':
        api.process_codeCard_formLink(scope)
        break
      case 'hook':
        api.process_codeCard_treeHook(scope)
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

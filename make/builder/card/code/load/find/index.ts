import { Scope, ScopeType, api } from '~tool'

export * from './bear'
export * from './save'

export function process_codeCard_load_find(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendNest(scope, nest, index)
    api.process_codeCard_load_find_nestedChildren(nestedScope)
  })
}

export function process_codeCard_load_find_nestedChildren(
  scope: ScopeType<Scope.Nest>,
): void {
  const type = api.determineNestType(scope)
  if (type === 'static-term') {
    const term = api.resolveStaticTerm(scope)
    switch (term) {
      case 'save':
        api.process_codeCard_load_find_save(scope)
        break
      case 'bear':
        api.process_codeCard_load_find_bear(scope)
        break
      default:
        api.throwError(api.generateUnknownTermError(scope))
    }
  } else {
    api.throwError(api.generateUnhandledTermCaseError(scope))
  }
}

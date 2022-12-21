import { Scope, ScopeType, api } from '~server'

export * from './bear'
export * from './save'

export function process_codeCard_load_take(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendNest(scope, nest, index)
    api.process_codeCard_load_take_nestedChildren(nestedScope)
  })
}

export function process_codeCard_load_take_nestedChildren(
  scope: ScopeType<Scope.Nest>,
): void {
  const type = api.determineNestType(scope)
  if (type === 'static-term') {
    const term = api.resolveStaticTerm(scope)
    switch (term) {
      case 'save':
        api.process_codeCard_load_take_save(scope)
        break
      case 'bear':
        api.process_codeCard_load_take_bear(scope)
        break
      default:
        api.throwError(api.generateUnknownTermError(scope))
    }
  } else {
    api.throwError(api.generateUnhandledTermCaseError(scope))
  }
}

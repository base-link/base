import { Scope, ScopeType, api } from '~server'

export function process_codeCard_load_take_save(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendNest(scope, nest, index)
    api.process_codeCard_load_take_save_nestedChildren(
      nestedScope,
    )
  })
}

export function process_codeCard_load_take_save_nestedChildren(
  scope: ScopeType<Scope.Nest>,
): void {
  const type = api.determineNestType(scope)
  if (type === 'static-term') {
  } else {
    api.throwError(api.generateUnhandledTermCaseError(scope))
  }
}

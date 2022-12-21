import { api } from '~server'
import { Scope, ScopeType } from '~server/type'

export function process_codeCard_seek(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendNest(scope, nest, index)
    if (api.nestIsText(nestedScope)) {
    } else {
      api.throwError(
        api.generateUnhandledTermCaseError(nestedScope),
      )
    }
  })
}

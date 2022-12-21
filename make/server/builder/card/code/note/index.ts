import { api } from '~server'
import { Scope, ScopeType } from '~server/type'

export function process_codeCard_note(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendScope(
      Scope.Nest,
      { index, nest },
      scope,
    )
    if (api.nestIsText(nestedScope)) {
    } else {
      api.throwError(
        api.generateUnhandledTermCaseError(nestedScope),
      )
    }
  })
}

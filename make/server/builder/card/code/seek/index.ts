import { api } from '~server'
import { Scope, ScopeType } from '~server/type'

export function process_codeCard_seek(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach(nest => {
    const nestedScope = api.extendScope({ nest }, scope)
    if (api.isText(nest)) {
    } else {
      api.throwError(
        api.generateUnhandledTermCaseError(nestedScope),
      )
    }
  })
}

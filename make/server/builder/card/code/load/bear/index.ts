import { Scope, ScopeType, api } from '~server'
import shared from '~shared'

export function process_codeCard_load_bear(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach(nest => {
    const nestedScope = api.extendScope({ nest }, scope)
    if (shared.isSimpleTerm(nest)) {
      const term = shared.getSimpleTerm(nest)
    } else {
      api.throwError(
        api.generateUnhandledTermCaseError(nestedScope),
      )
    }
  })
}

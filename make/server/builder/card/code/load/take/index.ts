import { Scope, ScopeType, api } from '~server'
import shared from '~shared'

export function process_codeCard_load_take(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach(nest => {
    const nestedScope = api.extendScope({ nest }, scope)
    if (shared.isSimpleTerm(nest)) {
      const term = shared.getSimpleTerm(nest)
      switch (term) {
        case 'save':
          api.process_codeCard_loadTakeSave(nestedScope)
          break
        case 'bear':
          api.process_codeCard_loadTakeBear(nestedScope)
          break
        default:
          api.throwError(
            api.generateUnknownTermError(nestedScope),
          )
      }
    } else {
      api.throwError(
        api.generateUnhandledTermCaseError(nestedScope),
      )
    }
  })
}

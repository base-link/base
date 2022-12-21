import { api } from '~server'
import { Scope, ScopeType } from '~server/type'
import shared from '~shared'

export * from './hook'

export function process_codeCard_zone(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach(nest => {
    const nestedScope = api.extendScope({ nest }, scope)
    if (shared.isSimpleTerm(nest)) {
      const term = shared.getSimpleTerm(nest)
      switch (term) {
        case 'take':
          api.process_codeCard_formLink(nestedScope)
          break
        case 'hook':
          api.process_codeCard_zoneHook(nestedScope)
          break
        case 'head':
          api.process_codeCard_formHead(nestedScope)
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

import { api } from '~server'
import { Scope, ScopeType } from '~server/type'

export function process_codeCard_suit(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendScope(
      Scope.Nest,
      { index, nest },
      scope,
    )
    if (shared.isSimpleTerm(nest)) {
      const term = shared.getSimpleTerm(nest)
      switch (term) {
        case 'link':
          api.process_codeCard_formLink(nestedScope)
          break
        case 'task':
          api.process_codeCard_formTask(nestedScope)
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

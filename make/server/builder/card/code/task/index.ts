import { api } from '~server'
import { Scope, ScopeType } from '~server/type'

export function process_codeCard_task(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendNest(scope, nest, index)
    if (shared.isSimpleTerm(nest)) {
      const term = shared.getSimpleTerm(nest)
      switch (term) {
        case 'take':
          api.process_codeCard_formLink(nestedScope)
          break
        case 'task':
          api.process_codeCard_task(nestedScope)
          break
        case 'head':
          api.process_codeCard_head(nestedScope)
          break
        case 'free':
          api.process_codeCard_taskFree(nestedScope)
          break
        case 'call':
          api.process_codeCard_taskCall(nestedScope)
          break
        case 'save':
          api.process_codeCard_taskSave(nestedScope)
          break
        case 'back':
          api.process_codeCard_taskBack(nestedScope)
          break
        case 'hide':
          api.process_codeCard_hide(nestedScope)
          break
        case 'wait':
          api.process_codeCard_wait(nestedScope)
          break
        case 'risk':
          api.process_codeCard_risk(nestedScope)
          break
        case 'base':
          api.process_codeCard_taskBase(nestedScope)
          break
        case 'fuse':
          api.process_codeCard_fuse(nestedScope)
          break
        case 'hold':
          api.process_codeCard_hold(nestedScope)
          break
        case 'stem':
          api.process_codeCard_stem(nestedScope)
          break
        case 'note':
          api.process_codeCard_note(nestedScope)
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

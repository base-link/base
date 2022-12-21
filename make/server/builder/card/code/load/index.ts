import { Scope, ScopeType, api } from '~server'
import shared from '~shared'

export * from './bear'
export * from './take'

export function process_codeCard_load(
  scope: ScopeType<Scope.Nest>,
): void {}

export function process_codeCard_load_nestedChildren(
  scope: ScopeType<Scope.Nest>,
) {
  if (shared.isSimpleTerm(scope.data.nest)) {
    const term = shared.getSimpleTerm(scope.data.nest)
    switch (term) {
      case 'take':
        api.process_codeCard_load_take(scope)
        break
      case 'load':
        api.process_codeCard_load(scope)
        break
      case 'bear':
        api.process_codeCard_load_bear(scope)
        break
      default:
        api.throwError(api.generateUnknownTermError(scope))
    }
  }
}

import { api } from '~server'
import {
  ASTCodeCardType,
  LexicalScope,
  LexicalScopeNestAddonType,
} from '~server/type'

export function process_codeCard_bear(
  scope: LexicalScope<
    LexicalScopeNestAddonType,
    ASTCodeCardType
  >,
): void {
  scope.data.nest.nest.forEach(nest => {
    const nestedScope = api.extendScope({ nest }, scope)
    if (api.nestIsText(nestedScope)) {
    } else {
      api.throwError(
        api.generateUnhandledTermCaseError(nestedScope),
      )
    }
  })
}

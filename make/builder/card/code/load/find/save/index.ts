import { api } from '~'
import type { APIInputType } from '~'

export function process_codeCard_load_find_save(
  input: APIInputType,
): void {
  api.assertNestChildrenLength(input, 1)

  const nest = api.assumeNest(input)

  nest.nest.forEach((nest, index) => {
    api.process_codeCard_load_find_save_nestedChildren(
      api.extendWithNestScope(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_load_find_save_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  if (type === 'static-term') {
    const term = api.resolveStaticTermFromNest(input)
    api.assertString(term)

    const find = api.assumeInputObjectAsASTPartialType(
      input,
      AST.ImportVariable,
    )

    find.rename = {
      like: AST.ImportVariableRename,
      name: term,
    }
  } else {
    api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

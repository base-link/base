import { APIInputType, AST, api } from '~'

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

    const find = api.assumeInputObjectAsAST(input, AST.LoadTake)

    find.save = {
      like: AST.LoadTakeSave,
      name: term,
    }
  } else {
    api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

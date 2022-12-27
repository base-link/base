import {
  APIInputType,
  AST,
  ASTImportType,
  ASTType,
  InitialASTImportType,
  InitialASTImportVariableType,
  api,
} from '~'

export * from './bear'
export * from './save'

export type LoadFindInputType = {
  find: InitialASTImportVariableType
}

export type LoadInputType = {
  load: ASTImportType | InitialASTImportType
}

export function assumeInputObjectAsAST<T extends AST>(
  input: APIInputType,
  type: T,
  rank = 0,
): ASTType<T> {
  let objectScope = input.objectScope
  while (rank > 0 && objectScope.parent) {
    objectScope = objectScope.parent
    rank--
  }
  api.assertAST(objectScope.data, type)
  return objectScope.data
}

export function extendWithObjectScope(
  input: APIInputType,
  data: Record<string, unknown>,
): APIInputType {
  return {
    ...input,
    objectScope: api.createScope(data, input.objectScope),
  }
}

export function process_codeCard_load_find(
  input: APIInputType,
): void {
  const find: InitialASTImportVariableType = {
    like: AST.LoadTake,
  }

  const load = api.assumeInputObjectAsAST(input, AST.Load)
  load.take.push(find)

  const childInput = api.extendWithObjectScope(input, find)

  const nest = api.assumeNest(input)
  nest.nest.forEach((nest, index) => {
    api.process_codeCard_load_find_nestedChildren(
      api.extendWithNestScope(childInput, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_load_find_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  if (type === 'static-term') {
    const term = api.resolveStaticTermFromNest(input)
    api.assertString(term)
    const index = api.assumeNestIndex(input)

    if (index > 0) {
      switch (term) {
        case 'save':
          api.process_codeCard_load_find_save(input)
          break
        case 'bear':
          api.process_codeCard_load_find_bear(input)
          break
        default:
          api.throwError(api.generateUnknownTermError(input))
      }
    } else {
      const find = api.assumeInputObjectAsAST(
        input,
        AST.LoadTake,
      )
      find.name = term
    }
  } else {
    api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

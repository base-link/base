import {
  APIInputType,
  AST,
  InitialASTImportType,
  LoadInputType,
  Nest,
  api,
} from '~'

export * from './bear'
export * from './find'

export function finalize_codeCard_load_textNest(
  input: APIInputType & LoadInputType,
): void {
  const text = api.resolveText(input)

  api.assertString(text)

  const card = api.getProperty(input, 'card')

  api.assertAST(card, AST.CodeCard)

  const path = api.resolveModulePath(input, text)

  input.load.link = path
}

export function process_codeCard_load(
  input: APIInputType,
): void {
  const load: InitialASTImportType = {
    like: AST.Load,
    take: [],
  }

  api.assertAST(input.card, AST.CodeCard)

  input.card.loadList.push(load)

  const childInput: APIInputType = {
    ...input,
    objectScope: api.createScope(load, input.objectScope),
  }

  api.assumeNest(input).nest.forEach((nest, index) => {
    process_codeCard_load_nestedChildren(
      api.extendWithNestScope(childInput, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_load_nestedChildren(
  input: APIInputType & LoadInputType,
) {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.StaticText: {
      const index = api.assumeNestIndex(input)
      if (index !== 0) {
        throw new Error('Oops')
      } else {
        api.finalize_codeCard_load_textNest(input)
      }
      break
    }

    case Nest.StaticTerm: {
      const term = api.resolveStaticTermFromNest(input)
      switch (term) {
        case 'find':
        case 'take':
          api.process_codeCard_load_find(input)
          break
        case 'load':
          api.process_codeCard_load(input)
          break
        case 'bear':
          api.process_codeCard_load_bear(input)
          break
        default:
          api.throwError(api.generateUnknownTermError(input))
      }
      break
    }

    default:
      api.throwError(
        api.generateUnhandledNestCaseError(input, type),
      )
  }
}

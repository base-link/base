import { Mesh, Nest, NestInputType, api } from '~'

export * from './bear'
export * from './find'

export function finalize_codeCard_load_textNest(
  input: NestInputType,
): void {
  const text = api.resolveText(input)

  api.assertString(text)

  const card = api.getProperty(input, 'card')

  api.assertMesh(card, Mesh.CodeCard)

  const path = api.resolveModulePath(input, text)

  card.loadList.push({
    like: Mesh.Load,
    link: path,
    take: [],
  })
}

export function process_codeCard_load(
  input: NestInputType,
): void {
  input.nest.nest.forEach((nest, index) => {
    process_codeCard_load_nestedChildren({
      ...input,
      index,
      nest,
    })
  })
}

export function process_codeCard_load_nestedChildren(
  input: NestInputType,
) {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.StaticText: {
      if (input.index !== 0) {
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

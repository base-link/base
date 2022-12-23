import { NestInputType, api } from '~'

export * from './bear'
export * from './find'

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
  if (type === 'static-term') {
    const term = api.resolveStaticTerm(input)
    switch (term) {
      case 'find':
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
  } else {
    api.throwError(
      api.generateUnhandledNestCaseError(input, type),
    )
  }
}

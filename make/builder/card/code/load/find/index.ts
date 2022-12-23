import { NestInputType, api } from '~'

export * from './bear'
export * from './save'

export function process_codeCard_load_find(
  input: NestInputType,
): void {
  input.nest.nest.forEach((nest, index) => {
    api.process_codeCard_load_find_nestedChildren({
      ...input,
      index,
      nest,
    })
  })
}

export function process_codeCard_load_find_nestedChildren(
  input: NestInputType,
): void {
  const type = api.determineNestType(input)
  if (type === 'static-term') {
    const term = api.resolveStaticTermFromNest(input)
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
    api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

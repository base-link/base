import { NestInputType, api } from '~'

export function process_codeCard_load_bear(
  input: NestInputType,
): void {
  input.nest.nest.forEach((nest, index) => {
    process_codeCard_load_bear_nestedChildren({
      ...input,
      index,
      nest,
    })
  })
}

export function process_codeCard_load_bear_nestedChildren(
  input: NestInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case 'text':
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

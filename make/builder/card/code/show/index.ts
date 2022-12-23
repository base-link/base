import { Nest, NestInputType, api } from '~'

export function process_codeCard_show(
  input: NestInputType,
): void {
  input.nest.nest.forEach((nest, index) => {
    process_codeCard_show_nestedChildren({
      ...input,
      index,
      nest,
    })
  })
}

export function process_codeCard_show_nestedChildren(
  input: NestInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.StaticText:
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

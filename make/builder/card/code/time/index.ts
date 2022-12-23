import { Nest, NestInputType, api } from '~'

export function process_codeCard_time(
  input: NestInputType,
): void {
  input.nest.nest.forEach((nest, index) => {
    process_codeCard_time_nestedChildren({
      ...input,
      index,
      nest,
    })
  })
}

export function process_codeCard_time_nestedChildren(
  input: NestInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.StaticTerm:
      const term = api.resolveStaticTerm(input)
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

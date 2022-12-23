import { Nest, NestInputType, api } from '~'

export function process_codeCard_bind(
  input: NestInputType,
): void {
  input.nest.nest.forEach((nest, index) => {
    process_codeCard_bind_nestedChildren({
      ...input,
      index,
      nest,
    })
  })
}

export function process_codeCard_bind_nestedChildren(
  input: NestInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.StaticTerm:
      const term = api.resolveStaticTermFromNest(input)
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

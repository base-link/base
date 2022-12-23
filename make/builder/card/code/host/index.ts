import { api , Nest, NestInputType } from '~'

export function process_codeCard_host(
  input: NestInputType,
): void {
  input.nest.nest.forEach((nest, index) => {
    process_codeCard_host_nestedChildren({
      ...input,
      index,
      nest,
    })
  })
}

export function process_codeCard_host_nestedChildren(
  input: NestInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.StaticTerm:
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

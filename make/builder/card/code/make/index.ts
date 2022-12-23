import { Nest, NestInputType, api } from '~'

export function process_codeCard_make(
  input: NestInputType,
): void {
  input.nest.nest.forEach((nest, index) => {
    process_codeCard_make_nestedChildren({
      ...input,
      index,
      nest,
    })
  })
}

export function process_codeCard_make_nestedChildren(
  input: NestInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.StaticTerm:
      const term = api.resolveStaticTermFromNest(input)
      switch (term) {
        case 'bind':
          api.process_codeCard_bind(input)
          break
      }
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

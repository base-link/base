import { Nest, NestInputType, api } from '~'

export function process_codeCard_bear(
  input: NestInputType,
): void {
  input.nest.nest.forEach((nest, index) => {
    api.process_codeCard_bear_nestedChildren({
      ...input,
      index,
      nest,
    })
  })
}

export function process_codeCard_bear_hide(
  input: NestInputType,
): void {}

export function process_codeCard_bear_nestedChildren(
  input: NestInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.StaticText:
      break
    case Nest.StaticTerm:
      const term = api.resolveStaticTerm(input)
      switch (term) {
        case 'hide':
          api.process_codeCard_bear_hide(input)
          break
      }
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

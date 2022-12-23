import { NestInputType, api } from '~'

export function process_codeCard_suit(
  input: NestInputType,
): void {
  input.nest.nest.forEach((nest, index) => {
    api.process_codeCard_suit_nestedChildren({
      ...input,
      index,
      nest,
    })
  })
}

export function process_codeCard_suit_nestedChildren(
  input: NestInputType,
): void {
  const type = api.determineNestType(input)
  if (type === 'static-term') {
    const term = api.resolveStaticTerm(input)
    switch (term) {
      case 'link':
        api.process_codeCard_formLink(input)
        break
      case 'task':
        api.process_codeCard_formTask(input)
        break
      case 'head':
        api.process_codeCard_head(input)
        break
      default:
        api.throwError(api.generateUnknownTermError(input))
    }
  } else {
    api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

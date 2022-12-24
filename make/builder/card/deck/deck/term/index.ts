import { APIInputType, Nest, api } from '~'

export function process_deckCard_deck_term(
  input: APIInputType,
): void {
  input.nest.nest.forEach((nest, index) => {
    process_deckCard_deck_term_nestedChildren({
      ...input,
      index,
      nest,
    })
  })
}

export function process_deckCard_deck_term_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.StaticText:
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

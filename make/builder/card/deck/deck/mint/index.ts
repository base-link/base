import { AST, Nest, api } from '~'
import type { APIInputType } from '~'

export function process_deckCard_deck_mint(
  input: APIInputType,
): void {
  api.assumeNest(input).nest.forEach((nest, index) => {
    process_deckCard_deck_mint_nestedChildren(
      api.extendWithNestScope(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_deckCard_deck_mint_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.StaticText:
      const text = api.resolveText(input)
      api.assertString(text)
      const deck = api.assumeInputObjectAsASTPartialType(
        input,
        AST.Package,
      )
      deck.children.push(
        api.createStringConstant('version', text),
      )
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

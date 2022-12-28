import { AST, api } from '~'
import type { APIInputType } from '~'

export function finalize_deckCard_deck_test(
  input: APIInputType,
): void {
  const text = api.resolveText(input)
  api.assertString(text)

  const card = api.getProperty(input, 'card')
  api.assertAST(card, AST.PackageModule)

  const path = api.findPath(text, card.directory)
  api.assertString(path, () => {
    return api.generateUnresolvedPathError(input, text)
  })

  const deck = api.assumeInputObjectAsASTPartialType(
    input,
    AST.Package,
  )

  deck.children.push(api.createStringConstant('test', path))
}

export function process_deckCard_deck_test(
  input: APIInputType,
): void {
  api.assertNestChildrenLength(input, 1)

  const nest = api.assumeNest(input).nest[0]

  api.processTextNest(
    api.extendWithNestScope(input, {
      index: 0,
      nest,
    }),
    api.finalize_deckCard_deck_test,
  )
}

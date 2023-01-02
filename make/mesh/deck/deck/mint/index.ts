import { Link, LinkHint, Mesh, code } from '~'
import type { MeshInputType } from '~'

export function process_deckCard_deck_mint(
  input: MeshInputType,
): void {
  code
    .assumeLinkType(input, Link.Tree)
    .nest.forEach((nest, index) => {
      process_deckCard_deck_mint_nestedChildren(
        code.extendWithNestScope(input, {
          index,
          nest,
        }),
      )
    })
}

export function process_deckCard_deck_mint_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case LinkHint.StaticText:
      const text = code.resolveText(input)
      code.assertString(text)
      const deck = code.assumeInputObjectAsMeshPartialType(
        input,
        Mesh.Package,
      )
      deck.children.push(
        code.createStringConstant('version', text),
      )
      break
    default:
      code.throwError(
        code.generateUnhandledNestCaseError(input, type),
      )
  }
}

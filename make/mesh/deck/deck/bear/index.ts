import { Link, Mesh, code } from '~'
import type { MeshInputType } from '~'

export function finalize_deckCard_deck_bear(
  input: MeshInputType,
): void {
  const text = code.resolveText(input)
  const { card } = input
  code.assertMeshType(card, Mesh.PackageModule)
  code.assertString(text)
  const path = code.findPath(text, card.directory)
  code.assertString(path, 'path')

  const deck = code.assumeInputObjectAsMeshPartialType(
    input,
    Mesh.Package,
  )

  deck.children.push(code.createStringConstant('export', path))
}

export function process_deckCard_deck_bear(
  input: MeshInputType,
): void {
  code.assertNestChildrenLength(input, 1)

  const nest = code.assumeLinkType(input, Link.Tree).nest[0]

  code.processTextNest(
    code.extendWithNestScope(input, { index: 0, nest }),
    code.finalize_deckCard_deck_bear,
  )
}

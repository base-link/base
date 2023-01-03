import { Link, Mesh, code } from '~'
import type { MeshInputType } from '~'

export function finalize_deckCard_deck_test(
  input: MeshInputType,
): void {
  const text = code.resolveText(input)
  code.assertString(text)

  const card = input.module
  code.assertMeshType(card, Mesh.PackageModule)

  const path = code.findPath(text, card.directory)
  code.assertString(path, 'path')

  const deck = code.assumeBranchAsMeshPartialType(
    input,
    Mesh.Package,
  )

  deck.children.push(code.createStringConstant('test', path))
}

export function process_deckCard_deck_test(
  input: MeshInputType,
): void {
  code.assertNestChildrenLength(input, 1)

  const nest = code.assumeLinkType(input, Link.Tree).nest[0]

  code.processTextNest(
    code.withEnvironment(input, {
      index: 0,
      nest,
    }),
    code.finalize_deckCard_deck_test,
  )
}

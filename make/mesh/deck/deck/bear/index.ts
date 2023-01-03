import { Link, Mesh, code } from '~'
import type { MeshInputType } from '~'

export function finalize_deckCard_deck_bear(
  input: MeshInputType,
): void {
  const text = code.resolveText(input)
  const { module } = input
  code.assertMeshType(module, Mesh.PackageModule)
  code.assertString(text)
  const path = code.findPath(text, module.directory)
  code.assertString(path, 'path')

  const deck = code.assumeBranchAsMeshPartialType(
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
    code.withEnvironment(input, { nest }),
    code.finalize_deckCard_deck_bear,
  )
}

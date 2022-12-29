import { Mesh, code } from '~'
import type { MeshInputType } from '~'

export function finalize_deckCard_deck_test(
  input: MeshInputType,
): void {
  const text = code.resolveText(input)
  code.assertString(text)

  const card = code.getProperty(input, 'card')
  code.assertMesh(card, Mesh.PackageModule)

  const path = code.findPath(text, card.directory)
  code.assertString(path, () => {
    return code.generateUnresolvedPathError(input, text)
  })

  const deck = code.assumeInputObjectAsMeshPartialType(
    input,
    Mesh.Package,
  )

  deck.children.push(code.createStringConstant('test', path))
}

export function process_deckCard_deck_test(
  input: MeshInputType,
): void {
  code.assertNestChildrenLength(input, 1)

  const nest = code.assumeNest(input).nest[0]

  code.processTextNest(
    code.extendWithNestScope(input, {
      index: 0,
      nest,
    }),
    code.finalize_deckCard_deck_test,
  )
}

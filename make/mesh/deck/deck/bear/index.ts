import { Link, Mesh, code } from '~'
import type { MeshInputType } from '~'

export function finalize_deckCard_deck_bear(
  input: MeshInputType,
): void {
  const text = code.resolveText(input)
  code.assertString(text)
  const path = code.resolveModulePath(input, text)
  code.assertString(path, 'path')
  code.pushIntoParentObject(
    input,
    code.createStringConstant('export', path),
  )
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

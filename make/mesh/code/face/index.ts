import { Link, LinkHint, code } from '~'
import type { MeshInputType } from '~'

export function process_codeCard_face(input: MeshInputType): void {
  code.assumeLinkType(input, Link.Tree).nest.forEach((nest, index) => {
    process_codeCard_face_nestedChildren(
      code.withEnvironment(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_face_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case LinkHint.StaticText:
      break
    default:
      code.throwError(code.generateUnhandledTermCaseError(input))
  }
}

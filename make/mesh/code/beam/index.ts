import { Link, LinkHint, code } from '~'
import type { MeshInputType } from '~'

export function process_codeCard_beam(
  input: MeshInputType,
): void {
  code
    .assumeLinkType(input, Link.Tree)
    .nest.forEach((nest, index) => {
      process_codeCard_beam_nestedChildren(
        code.withEnvironment(input, {
          index,
          nest,
        }),
      )
    })
}

export function process_codeCard_beam_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case LinkHint.StaticTerm:
      const term = code.resolveStaticTermFromNest(input)
      break
    default:
      code.throwError(
        code.generateUnhandledTermCaseError(input),
      )
  }
}

import { Link, LinkHint, code } from '~'
import type { MeshInputType } from '~'

export function process_codeCard_tree_hook(
  input: MeshInputType,
): void {
  code
    .assumeLinkType(input, Link.Tree)
    .nest.forEach((nest, index) => {
      process_codeCard_tree_hook_nestedChildren(
        code.withEnvironment(input, {
          index,
          nest,
        }),
      )
    })
}

export function process_codeCard_tree_hook_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case LinkHint.StaticTerm:
      const term = code.resolveStaticTermFromNest(input)
      break
    default:
      code.throwError(
        code.generateUnhandledNestCaseError(input, type),
      )
  }
}

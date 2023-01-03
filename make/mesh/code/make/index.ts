import { Link, LinkHint, code } from '~'
import type { MeshInputType } from '~'

export function process_codeCard_make(
  input: MeshInputType,
): void {
  code
    .assumeLinkType(input, Link.Tree)
    .nest.forEach((nest, index) => {
      process_codeCard_make_nestedChildren(
        code.withEnvironment(input, {
          index,
          nest,
        }),
      )
    })
}

export function process_codeCard_make_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case LinkHint.StaticTerm:
      const term = code.resolveStaticTermFromNest(input)
      switch (term) {
        case 'bind':
          code.process_codeCard_bind(input)
          break
        default:
          code.throwError(
            code.generateUnhandledTermCaseError(input),
          )
      }
      break
    default:
      code.throwError(
        code.generateUnhandledNestCaseError(input, type),
      )
  }
}

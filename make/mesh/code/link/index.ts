import { LinkHint, code } from '~'
import type { MeshInputType } from '~'

export function process_codeCard_link(
  input: MeshInputType,
): void {
  code.assumeNest(input).nest.forEach((nest, index) => {
    process_codeCard_link_nestedChildren(
      code.extendWithNestScope(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_link_base(
  input: MeshInputType,
): void {}

export function process_codeCard_link_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case LinkHint.StaticTerm:
      const term = code.resolveStaticTermFromNest(input)
      switch (term) {
        case 'like':
          code.process_codeCard_like(input)
          break
        case 'list':
          code.process_codeCard_like_list(input)
          break
        case 'mesh':
          code.process_codeCard_like_mesh(input)
          break
        case 'time':
          code.process_codeCard_time(input)
          break
        case 'base':
          code.process_codeCard_link_base(input)
          break
      }
      break
    default:
      code.throwError(
        code.generateUnhandledTermCaseError(input),
      )
  }
}

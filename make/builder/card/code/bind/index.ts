import { MeshHint, code } from '~'
import type { MeshInputType } from '~'

export function process_codeCard_bind(
  input: MeshInputType,
): void {
  code.assumeNest(input).nest.forEach((nest, index) => {
    process_codeCard_bind_nestedChildren(
      code.extendWithNestScope(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_bind_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case MeshHint.StaticTerm:
      const term = code.resolveStaticTermFromNest(input)
      break
    default:
      code.throwError(
        code.generateUnhandledTermCaseError(input),
      )
  }
}

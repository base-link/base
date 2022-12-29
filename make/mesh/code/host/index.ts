import { code , MeshHint } from '~'
import type { MeshInputType } from '~'

export function process_codeCard_host(
  input: MeshInputType,
): void {
  code.assumeNest(input).nest.forEach((nest, index) => {
    process_codeCard_host_nestedChildren(      code.extendWithNestScope(input, {
        index,
        nest,
      }),)
  })
}

export function process_codeCard_host_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case MeshHint.StaticTerm:
      break
    default:
      code.throwError(code.generateUnhandledTermCaseError(input))
  }
}

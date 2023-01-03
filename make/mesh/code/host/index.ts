import { code , Link, LinkHint } from '~'
import type { MeshInputType } from '~'

export function process_codeCard_host(
  input: MeshInputType,
): void {
  code.assumeLinkType(input, Link.Tree).nest.forEach((nest, index) => {
    process_codeCard_host_nestedChildren(
      code.withEnvironment(input, {
        index,
        nest,
      })
    )
  })
}

export function process_codeCard_host_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case LinkHint.StaticTerm:
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

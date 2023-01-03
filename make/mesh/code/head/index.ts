import { Link, LinkHint, Mesh, code } from '~'
import type { MeshInputType } from '~'

export function process_codeCard_head(input: MeshInputType): void {
  const head = code.createMeshPartial(Mesh.ClassInput, input.scope)

  code.assumeLinkType(input, Link.Tree).nest.forEach((nest, index) => {
    process_codeCard_head_nestedChildren(
      code.withEnvironment(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_head_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case LinkHint.StaticTerm:
      const term = code.assumeTerm(input)
      const index = code.assumeNestIndex(input)
      if (index === 0) {
        code.pushIntoParentObject(
          input,
          code.createStringConstant('name', term),
        )
        return
      }

      switch (term) {
        case 'like':
          code.process_codeCard_like(input)
          break
        case 'base':
          code.process_codeCard_like(input)
          break
        default:
          code.throwError(code.generateUnhandledTermCaseError(input))
      }
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

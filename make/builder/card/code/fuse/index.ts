import { Mesh, MeshHint, MeshPartialType, code } from '~'
import type { MeshInputType } from '~'

export function process_codeCard_fuse(
  input: MeshInputType,
): void {
  const fuse: MeshPartialType<Mesh.Inject> = {
    children: [],
    like: Mesh.Inject,
    partial: true,
  }

  const card = code.getProperty(input, 'card')
  code.assertMesh(card, Mesh.CodeModule)

  const fuseInput = code.extendWithObjectScope(input, fuse)

  code.assumeNest(input).nest.forEach((nest, index) => {
    process_codeCard_fuse_nestedChildren(
      code.extendWithNestScope(fuseInput, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_fuse_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case MeshHint.StaticTerm: {
      const term = code.assumeStaticTermFromNest(input)
      const index = code.assumeNestIndex(input)
      if (index === 0) {
        const fuse = code.assumeInputObjectAsMeshPartialType(
          input,
          Mesh.Inject,
        )
        fuse.name = term
      } else {
        switch (term) {
          case 'bind':
            code.process_codeCard_bind(input)
            break
          case 'mark':
            code.process_codeCard_bond_mark(input)
            break
          case 'loan':
            code.process_codeCard_bond_loan(input)
            break
          default:
            code.throwError(
              code.generateUnhandledTermCaseError(input),
            )
        }
      }
      break
    }
    default:
      code.throwError(
        code.generateUnhandledTermCaseError(input),
      )
  }
}

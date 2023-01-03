import { Link, LinkHint, Mesh, MeshPartialType, code } from '~'
import type { MeshInputType } from '~'

export function process_codeCard_task_free(
  input: MeshInputType,
): void {
  const output: MeshPartialType<Mesh.Output> = {
    children: [],
    like: Mesh.Output,
    partial: true,
  }

  const childInput = code.withBranch(input, output)

  code
    .assumeLinkType(input, Link.Tree)
    .nest.forEach((nest, index) => {
      process_codeCard_task_free_nestedChildren(
        code.withEnvironment(childInput, {
          index,
          nest,
        }),
      )
    })
}

export function process_codeCard_task_free_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case LinkHint.StaticTerm: {
      const term = code.assumeStaticTermFromNest(input)
      const index = code.assumeNestIndex(input)
      if (index === 0) {
        const task = code.assumeBranchAsMeshPartialType(
          input,
          Mesh.Output,
        )
        task.children.push(
          code.createStringConstant('name', term),
        )
        return
      }
      break
    }
    default:
      code.throwError(
        code.generateUnhandledTermCaseError(input),
      )
  }
}

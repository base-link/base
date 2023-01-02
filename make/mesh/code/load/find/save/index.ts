import { Link, Mesh, code } from '~'
import type { MeshInputType } from '~'

export function process_codeCard_load_find_save(
  input: MeshInputType,
): void {
  code.assertNestChildrenLength(input, 1)

  const nest = code.assumeLinkType(input, Link.Tree)

  nest.nest.forEach((nest, index) => {
    code.process_codeCard_load_find_save_nestedChildren(
      code.extendWithNestScope(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_load_find_save_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  if (type === 'static-term') {
    const term = code.resolveStaticTermFromNest(input)
    code.assertString(term)

    const find = code.assumeInputObjectAsMeshPartialType(
      input,
      Mesh.ImportVariable,
    )

    find.children.push({
      complete: true,
      like: Mesh.ImportVariableRename,
      name: term,
      partial: false,
    })
  } else {
    code.throwError(code.generateUnhandledTermCaseError(input))
  }
}

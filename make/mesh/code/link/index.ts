import { Link, LinkHint, Mesh, code } from '~'
import type { MeshInputType, MeshPartialType } from '~'

export function process_codeCard_link(
  input: MeshInputType,
): void {
  const link: MeshPartialType<Mesh.Input> = {
    children: [],
    like: Mesh.Input,
    partial: true,
  }

  const linkInput = code.extendWithObjectScope(input, link)

  code
    .assumeLinkType(linkInput, Link.Tree)
    .nest.forEach((nest, index) => {
      process_codeCard_link_nestedChildren(
        code.extendWithNestScope(linkInput, {
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
      const term = code.assumeStaticTermFromNest(input)
      const index = code.assumeNestIndex(input)
      if (index === 0) {
        const link = code.assumeInputObjectAsMeshPartialType(
          input,
          Mesh.Input,
        )

        link.children.push(
          code.createStringConstant('name', term),
        )
        return
      }

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

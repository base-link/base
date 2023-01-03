import {
  Link,
  LinkHint,
  Mesh,
  MeshFullType,
  Mesh_FullTypeMixin,
  Mesh_PartialTypeMixin,
  code,
} from '~'
import type { MeshInputType, MeshPartialType } from '~'

export * from './take/index.js'

export function attemptPartialRollup(
  input: MeshInputType,
  node: Mesh_PartialTypeMixin | Mesh_FullTypeMixin,
) {
  // if (code.childrenAreComplete(node)) {
  //   code.replaceMeshChild(
  //     childInput,
  //     Mesh.Import,
  //     find,
  //     code.generateFullImportVariable(find),
  //   )
  // }
}

export function generateFullInput(
  input: MeshInputType,
): MeshFullType<Mesh.Input> {
  const name = code.findFullStringConstantByName(input, 'name')
  code.assertString(name)
  const children = code.assumeChildren(input)
  const sourceLike = children.find(
    (node): node is MeshFullType<Mesh.ClassReference> =>
      code.isMeshFullType(node, Mesh.ClassReference),
  )

  return {
    complete: false,
    like: Mesh.Input,
    name,
    partial: false,
    sourceLike,
  }
}

export function process_codeCard_link(input: MeshInputType): void {
  const link = code.createMeshPartial(Mesh.Input, input.scope)
  code.pushIntoParentObject(input, link)

  const linkInput = code.withBranch(input, link)

  code
    .assumeLinkType(linkInput, Link.Tree)
    .nest.forEach((nest, index) => {
      process_codeCard_link_nestedChildren(
        code.withEnvironment(linkInput, {
          index,
          nest,
        }),
      )
    })

  code.replaceIfComplete(linkInput, link, () =>
    code.generateFullInput(linkInput),
  )
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
        case 'list':
          code.process_codeCard_like_list(input)
          break
        case 'mesh':
          code.process_codeCard_like_mesh(input)
          break
        case 'time':
          code.process_codeCard_time(input)
          break
        case 'hide':
          code.process_codeCard_hide(input)
          break
        case 'link':
          code.process_codeCard_link(input)
          break
        case 'void':
          code.process_codeCard_void(input)
          break
        case 'take':
          code.process_codeCard_link_take(input)
          break
        case 'base':
          code.process_codeCard_link_base(input)
          break
        case 'note':
          code.process_codeCard_note(input)
          break
        default:
          code.throwError(code.generateUnhandledTermCaseError(input))
      }
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

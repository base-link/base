import { Link, LinkHint, Mesh, MeshFullType, code } from '~'
import type { MeshInputType } from '~'

export function generateFullClassReference(
  input: MeshInputType,
): MeshFullType<Mesh.ClassReference> {
  const children = code.assumeChildren(input)
  const name = code.findFullStringConstantByName(input, 'name')

  code.assertString(name)

  const sourceLike = children.filter(
    (node): node is MeshFullType<Mesh.ClassReference> =>
      code.isMeshFullType(node, Mesh.ClassReference),
  )

  return {
    bind: sourceLike,
    complete: false,
    like: Mesh.ClassReference,
    name,
    partial: false,
  }
}

export function process_codeCard_like(input: MeshInputType): void {
  const like = code.createMeshPartial(Mesh.ClassReference, input.scope)
  code.pushIntoParentObject(input, like)

  const likeInput = code.withBranch(input, like)
  code.assumeLinkType(input, Link.Tree).nest.forEach((nest, index) => {
    process_codeCard_like_nestedChildren(
      code.withEnvironment(likeInput, {
        index,
        nest,
      }),
    )
  })

  code.replaceIfComplete(likeInput, like, () =>
    code.generateFullClassReference(likeInput),
  )
}

export function process_codeCard_like_free(
  input: MeshInputType,
): void {}

export function process_codeCard_like_head(
  input: MeshInputType,
): void {}

export function process_codeCard_like_list(
  input: MeshInputType,
): void {}

export function process_codeCard_like_mesh(
  input: MeshInputType,
): void {}

export function process_codeCard_like_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case LinkHint.DynamicTerm:
      break
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
        case 'head':
          code.process_codeCard_head(input)
          break
        case 'like':
          code.process_codeCard_like(input)
          break
        case 'list':
          code.process_codeCard_like_list(input)
          break
        case 'mesh':
          code.process_codeCard_like_mesh(input)
          break
        case 'take':
          code.process_codeCard_like_take(input)
          break
        case 'free':
          code.process_codeCard_like_free(input)
          break
        case 'term':
          code.process_codeCard_like_term(input)
          break
        case 'link':
          code.process_codeCard_link(input)
          break
        case 'task':
          code.process_codeCard_task(input)
          break
        case 'stem':
          code.process_codeCard_stem(input)
          break
        default:
          code.throwError(code.generateUnhandledTermCaseError(input))
      }
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

export function process_codeCard_like_take(
  input: MeshInputType,
): void {}

export function process_codeCard_like_term(
  input: MeshInputType,
): void {}

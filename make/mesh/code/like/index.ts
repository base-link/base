import { Link, LinkHint, Mesh, MeshPartialType, code } from '~'
import type { MeshInputType } from '~'

export function process_codeCard_like(
  input: MeshInputType,
): void {
  const like: MeshPartialType<Mesh.ClassReference> = {
    children: [],
    like: Mesh.ClassReference,
    partial: true,
  }

  const likeInput = code.extendWithObjectScope(input, like)

  code
    .assumeLinkType(input, Link.Tree)
    .nest.forEach((nest, index) => {
      process_codeCard_like_nestedChildren(
        code.extendWithNestScope(likeInput, {
          index,
          nest,
        }),
      )
    })
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
      const term = code.assumeStaticTermFromNest(input)
      const index = code.assumeNestIndex(input)
      if (index === 0) {
        const like = code.assumeInputObjectAsMeshPartialType(
          input,
          Mesh.ClassReference,
        )

        like.children.push(
          code.createStringConstant('class', term),
        )
        return
      }

      switch (term) {
        case 'head':
          code.process_codeCard_like_head(input)
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

export function process_codeCard_like_take(
  input: MeshInputType,
): void {}

export function process_codeCard_like_term(
  input: MeshInputType,
): void {}

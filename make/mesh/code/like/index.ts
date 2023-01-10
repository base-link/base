import { Link, LinkHint, Mesh, MeshHint, Site, code } from '~'
import type { MeshClassReferenceType, SiteProcessInputType } from '~'

export function createMeshClassReference(
  input: SiteProcessInputType,
): MeshClassReferenceType {
  const name = code.findPlaceholderByName(input, 'name')
  code.assertMeshTerm(name)

  const hint = code.getMeshHintFromChildren(input)

  return {
    bind: [],
    hint,
    name,
    scope: input.scope,
    type: Mesh.ClassReference,
  }
}

export function process_codeCard_like(
  input: SiteProcessInputType,
): void {
  const type = code.createMeshGather('like', input.scope)
  code.gatherIntoMeshParent(input, type)

  const childInput = code.withElement(input, type)
  code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
    process_codeCard_like_nestedChildren(
      code.withEnvironment(childInput, {
        index,
        nest,
      }),
    )
  })

  code.potentiallyReplaceWithSemiStaticMesh(childInput, () =>
    code.createMeshClassReference(childInput),
  )
}

export function process_codeCard_like_free(
  input: SiteProcessInputType,
): void {}

export function process_codeCard_like_head(
  input: SiteProcessInputType,
): void {}

export function process_codeCard_like_list(
  input: SiteProcessInputType,
): void {}

export function process_codeCard_like_mesh(
  input: SiteProcessInputType,
): void {}

export function process_codeCard_like_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.DynamicTerm: {
      const index = code.assumeLinkNestIndex(input)
      if (index === 0) {
        code.process_first_dynamicTerm(input, 'name')
      } else {
        code.process_dynamicTerm(input)
      }
      break
    }
    case LinkHint.StaticTerm: {
      const index = code.assumeLinkNestIndex(input)
      if (index === 0) {
        code.process_first_staticTerm(input, 'name')
        return
      }

      const term = code.assumeTerm(input)
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
    }
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

export function process_codeCard_like_take(
  input: SiteProcessInputType,
): void {}

export function process_codeCard_like_term(
  input: SiteProcessInputType,
): void {}

export function process_dynamicTerm(input: SiteProcessInputType): void {
  const nest = code.assumeLinkNest(input)
  code.assertLink(nest, Link.Term)
  code.gatherIntoMeshParent(
    input,
    code.createMeshPointer(
      code.createMeshTerm(nest, input.scope, MeshHint.Dynamic),
    ),
  )
}

export function process_first_dynamicTerm(
  input: SiteProcessInputType,
  placeholder: string,
): void {
  const nest = code.assumeLinkNest(input)
  code.assertMesh(nest, Mesh.Term)
  code.gatherIntoMeshParent(
    input,
    code.createMeshPlaceholder(
      placeholder,
      code.createMeshTerm(nest, input.scope, MeshHint.Dynamic),
    ),
  )
}

export function process_first_staticTerm(
  input: SiteProcessInputType,
  placeholder: string,
): void {
  const nest = code.assumeLinkNest(input)
  code.assertMesh(nest, Mesh.Term)
  const name = code.resolveTerm(nest)
  code.assertString(name)
  code.gatherIntoMeshParent(
    input,
    code.createMeshPlaceholder(
      placeholder,
      code.createMeshString(name),
    ),
  )
}

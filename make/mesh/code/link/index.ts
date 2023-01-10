import { Link, LinkHint, Mesh, Nest, code } from '~'
import type {
  MeshClassReferenceType,
  MeshInputType,
  SiteProcessInputType,
} from '~'

export * from './take/index.js'

export function createMeshInput(
  input: SiteProcessInputType,
): MeshInputType {
  const name = code.findPlaceholderByName(input, 'name')
  code.assertMeshTerm(name)

  const definedType = code.findPlaceholderByName(input, 'defined-type')
  code.assertMeshOrUndefined(definedType, Mesh.ClassReference)

  const mesh: MeshInputType = {
    definedType,
    name,
    type: Mesh.Input,
  }

  if (definedType) {
    const id = code.generateObservableId()
    code.bindReference({
      ...input,
      focus: definedType,
      handle: () =>
        code.checkFocusForInputCompletion({
          ...input,
          focus: definedType,
          id,
          moduleId: input.module.id,
        }),
      id,
      moduleId: input.module.id,
    })
  }

  return mesh
}

export function pingParentOfCompletion(
  input: SiteProcessInputType,
): void {
  const parent = code.assumeElementAsGenericNest(input)
}

export function process_codeCard_link(
  input: SiteProcessInputType,
): void {
  const link = code.createMeshPointer(
    code.createMeshGather('input', input.scope),
  )
  code.gatherIntoMeshParent(input, link)

  const childInput = code.withElement(input, link)

  code.assumeLink(childInput, Link.Tree).nest.forEach((nest, index) => {
    process_codeCard_link_nestedChildren(
      code.withEnvironment(childInput, {
        index,
        nest,
      }),
    )
  })

  code.potentiallyReplaceWithSemiStaticMesh(childInput, () =>
    code.createMeshInput(childInput),
  )
}

export function process_codeCard_link_base(
  input: SiteProcessInputType,
): void {}

export function process_codeCard_link_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticTerm: {
      const index = code.assumeLinkNestIndex(input)
      if (index === 0) {
        const name = code.assumeLinkNest(input)
        code.gatherIntoMeshParent(
          input,
          code.createMeshPlaceholder('name', code.createMeshTerm(name)),
        )
        return
      }

      const term = code.assumeTerm(input)
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
    }
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

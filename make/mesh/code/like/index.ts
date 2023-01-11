import { Link, LinkHint, Mesh, RedGatherType, code } from '~'
import type { MeshClassReferenceType, SiteProcessInputType } from '~'

export function attachRedGather(
  input: SiteProcessInputType,
  property: string,
): RedGatherType {
  const value = code.createRedGather(input, property)
  code.insertIntoRed(input, value)
  return value
}

export function attachYellowValue(
  input: SiteProcessInputType,
  property: string,
): void {}

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
  const red = code.createRed(
    input,
    code.createRedGather(input, 'definedType'),
  )
  const yellow = code.createYellow(input, {
    bind: [],
    type: Mesh.ClassReference,
  })
  const blue = code.createBlue(input, {
    bind: [],
    type: Mesh.ClassReference,
  })

  const childInput = code.withColors(input, {
    blue,
    red,
    yellow,
  })

  code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
    code.addTask(input.base, () => {
      process_codeCard_like_nestedChildren(
        code.withEnvironment(childInput, {
          index,
          nest,
        }),
      )
    })
  })

  code.addTask(input.base, () => {
    code.potentiallyReplaceWithSemiStaticMesh(childInput, () =>
      code.createMeshClassReference(childInput),
    )
  })
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

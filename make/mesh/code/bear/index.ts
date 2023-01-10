import { Link, LinkHint, Mesh, code } from '~'
import type { MeshExportType, SiteProcessInputType } from '~'

export * from './hide/index.js'

export function create_codeCard_bearMesh(
  input: SiteProcessInputType,
): MeshExportType {
  const absolutePath = code.findPlaceholderByName(
    input,
    'absolute-path',
  )
  code.assertMeshText(absolutePath)

  const hides = code.filterPlaceholdersByName(input, 'hide')
  code.assertMeshArray(hides, Mesh.HideExportVariable)

  const hint = code.getMeshHintFromChildren(input)

  return {
    absolutePath,
    hides,
    hint,
    type: Mesh.Export,
  }
}

export function process_codeCard_bear(
  input: SiteProcessInputType,
): void {
  const bear = code.createMeshGather('bear', input.scope)
  code.gatherIntoMeshParent(input, bear)

  const childInput = code.withElement(input, bear)
  const nest = code.assumeLink(childInput, Link.Tree)
  nest.nest.forEach((nest, index) => {
    code.process_codeCard_bear_nestedChildren(
      code.withEnvironment(childInput, {
        index,
        nest,
      }),
    )
  })

  code.potentiallyReplaceWithSemiStaticMesh(childInput, () =>
    code.create_codeCard_bearMesh(childInput),
  )
}

export function process_codeCard_bear_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticText: {
      code.process_codeCard_bear_nestedChildren_text(input)
      break
    }
    case LinkHint.DynamicText: {
      code.process_codeCard_bear_nestedChildren_dynamicText(input)
      break
    }
    case LinkHint.StaticTerm: {
      const term = code.resolveTerm(input)
      switch (term) {
        case 'hide':
          code.process_codeCard_bear_hide(input)
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

export function process_codeCard_bear_nestedChildren_dynamicText(
  input: SiteProcessInputType,
): void {
  const nest = code.assumeLinkNest(input)
  code.assertLink(nest, Link.Text)
  code.gatherIntoMeshParent(
    input,
    code.createMeshPlaceholder(
      'absolute-path',
      code.createMeshText(nest, input.scope),
    ),
  )

  code.bindText()
}

export function process_codeCard_bear_nestedChildren_text(
  input: SiteProcessInputType,
): void {
  const text = code.resolveText(input)
  code.assertString(text)

  const path = code.resolveModulePath(input, text)

  code.gatherIntoMeshParent(
    input,
    code.createMeshPlaceholder(
      'absolute-path',
      code.createMeshString(path),
    ),
  )
}

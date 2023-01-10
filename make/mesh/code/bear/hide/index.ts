import { Mesh, code } from '~'
import type {
  MeshHideExportVariableType,
  SiteProcessInputType,
} from '~'

export function create_codeCard_find(
  input: SiteProcessInputType,
): MeshHideExportVariableType {
  const scopeName = code.findPlaceholderByName(input, 'scope')
  code.assertMeshTerm(scopeName)
  const name = code.findPlaceholderByName(input, 'name')
  code.assertMeshTerm(name)

  // if (scopeName.type === Mesh.Term) {

  // }

  return {
    name,
    scopeName,
    type: Mesh.HideExportVariable,
  }
}

export function process_codeCard_bear_hide(
  input: SiteProcessInputType,
): void {
  const hide = code.createMeshGather('hide', input.scope)
  code.gatherIntoMeshParent(input, hide)
  const childInput = code.withElement(input, hide)
  code.process_find_scope(input)

  code.potentiallyReplaceWithSemiStaticMesh(childInput, () =>
    code.create_codeCard_find(childInput),
  )
}

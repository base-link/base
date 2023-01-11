import { Mesh, code } from '~'
import type {
  BlueHideExportVariableType,
  SiteProcessInputType,
} from '~'

export function create_codeCard_find(
  input: SiteProcessInputType,
): BlueHideExportVariableType {
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
  const red = code.createRed(input, code.createRedGather(input, 'hide'))
  const blue = code.pushBlue(input, 'hides', {
    type: Mesh.HideExportVariable,
  })
  const colorInput = code.withColors(input, { blue, red })
  code.process_find_scope(colorInput)

  code.potentiallyReplaceWithSemiStaticMesh(colorInput, () =>
    code.create_codeCard_find(colorInput),
  )
}

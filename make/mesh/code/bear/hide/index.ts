import { Mesh, code } from '~'
import type { SiteProcessInputType } from '~'

export function process_codeCard_bear_hide(
  input: SiteProcessInputType,
): void {
  const red = code.pushRed(input, code.createRedGather(input, 'hide'))
  const blue = code.pushBlue(input, 'hides', {
    type: Mesh.HideExportVariable,
  })
  const colorInput = code.withColors(input, { blue, red })
  code.process_find_scope(colorInput)
}

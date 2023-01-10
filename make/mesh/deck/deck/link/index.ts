import { Mesh, code } from '~'
import type { SiteProcessInputType } from '~'

export function process_deckCard_deck_link(
  input: SiteProcessInputType,
) {
  const text = code.resolveText(input)
  code.assertString(text)

  code.assertStringPattern(input, text, /^@[a-z0-9]+\/[a-z0-9]+$/)

  code.gatherIntoMeshParent(
    input,
    code.createConstant('link', {
      bound: true,
      string: text,
      type: Mesh.String,
    }),
  )
}

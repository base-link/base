import card from '~/make/card.js'
import tool from '~/make/tool.js'
import { MeshLoad } from '~/make/form.js'

export function load_codeCard_beam(load: MeshLoad): void {
  tool.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
    load_codeCard_beam_leadLink(card.withLink(load, nest, index))
  })
}

export function load_codeCard_beam_leadLink(load: MeshLoad): void {
  const type = tool.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticTerm:
      const term = tool.resolveTermString(load)
      break
    default:
      tool.throwError(tool.generateUnhandledTermCaseError(load))
  }
}

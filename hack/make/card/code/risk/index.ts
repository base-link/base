import card from '~/make/card.js'
import tool from '~/make/tool.js'
import { MeshLoad } from '~/make/form.js'

export function load_codeCard_risk(load: MeshLoad): void {
  card.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
    load_codeCard_risk_nestedChildren(card.withLink(load, nest, index))
  })
}

export function load_codeCard_risk_nestedChildren(
  load: MeshLoad,
): void {
  const type = card.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticText:
      break
    default:
      card.throwError(card.generateUnhandledTermCaseError(load))
  }
}

import card from '~/make/card.js'
import tool from '~/make/tool.js'
import { MeshLoad } from '~/make/form.js'

export function load_codeCard_zone(load: MeshLoad): void {
  card.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
    card.load_codeCard_zone_leadLink(card.withLink(load, nest, index))
  })
}

export function load_codeCard_zone_leadLink(load: MeshLoad): void {
  const type = card.getLinkHint(load)
  if (type === 'static-term') {
    const term = card.resolveTermString(load)
    switch (term) {
      case 'take':
        card.load_codeCard_link(load)
        break
      case 'hook':
        card.load_codeCard_zoneHook(load)
        break
      case 'head':
        card.load_codeCard_head(load)
        break
      default:
        card.throwError(card.generateUnknownTermError(load))
    }
  } else {
    card.throwError(card.generateUnhandledNestCaseError(load, type))
  }
}

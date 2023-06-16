import card from '~/make/card.js'
import tool from '~/make/tool.js'
import { MeshLoad } from '~/make/form.js'

export function assumeNest(load: MeshLoad): Array<LinkNodeType> {
  return card.loadLink(load, Link.Tree).nest
}

export function load_codeCard_bind(load: MeshLoad): void {
  const nest = card.assumeNest(load)
  nest.forEach((nest, index) => {
    load_codeCard_bind_leadLink(card.withLink(load, nest, index))
  })
}

export function load_codeCard_bind_leadLink(load: MeshLoad): void {
  const type = card.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticTerm:
      const term = card.resolveTermString(load)
      break
    default:
      card.throwError(card.generateUnhandledTermCaseError(load))
  }
}

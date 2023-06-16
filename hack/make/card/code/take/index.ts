import card from '~/make/card.js'
import tool from '~/make/tool.js'
import { MeshLoad } from '~/make/form.js'

// the code url handlers go here

export function load_codeCard_take(load: MeshLoad): void {
  card.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
    load_codeCard_take_leadLink(card.withLink(load, nest, index))
  })
}

export function load_codeCard_take_leadLink(load: MeshLoad): void {
  const type = card.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticTerm:
      const term = card.resolveTermString(load)
      break
    default:
      card.throwError(card.generateUnhandledTermCaseError(load))
  }
}

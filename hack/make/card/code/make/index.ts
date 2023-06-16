import card from '~/make/card.js'
import tool from '~/make/tool.js'
import { MeshLoad } from '~/make/form.js'

export function load_codeCard_make(load: MeshLoad): void {
  card.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
    load_codeCard_make_leadLink(card.withLink(load, nest, index))
  })
}

export function load_codeCard_make_leadLink(load: MeshLoad): void {
  const type = card.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticTerm:
      const term = card.resolveTermString(load)
      switch (term) {
        case 'bind':
          card.load_codeCard_bind(load)
          break
        default:
          card.throwError(card.generateUnhandledTermCaseError(load))
      }
      break
    default:
      card.throwError(card.generateUnhandledNestCaseError(load, type))
  }
}

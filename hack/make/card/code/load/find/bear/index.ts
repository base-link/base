import card from '~/make/card.js'
import tool from '~/make/tool.js'
import { MeshLoad } from '~/make/form.js'

export function load_codeCard_load_find_bear(load: MeshLoad): void {
  card.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
    card.load_codeCard_load_find_bear_nestedChildren(
      card.withLink(load, nest, index),
    )
  })
}

export function load_codeCard_load_find_bear_nestedChildren(
  load: MeshLoad,
): void {
  const type = card.getLinkHint(load)
  if (type === 'static-term') {
  } else {
    card.throwError(card.generateUnhandledTermCaseError(load))
  }
}

import card from '~/make/card.js'
import tool from '~/make/tool.js'
import { MeshLoad } from '~/make/form.js'

export function load_codeCard_load_find_save(load: MeshLoad): void {
  const nest = card.loadLink(load, Link.Tree)

  nest.nest.forEach((nest, index) => {
    card.addTask(load.base, () => {
      card.load_codeCard_load_find_save_nestedChildren(
        card.withLink(load, nest, index),
      )
    })
  })
}

export function load_codeCard_load_find_save_nestedChildren(
  load: MeshLoad,
): void {
  const type = card.getLinkHint(load)
  if (type === LinkHint.StaticTerm) {
    const term = card.assumeTermString(load)

    card.load_find_scope(load)
  } else {
    card.throwError(card.generateUnhandledTermCaseError(load))
  }
}

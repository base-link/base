import card from '~/make/card.js'
import { MeshLoad } from '~/make/form.js'
import tool from '~/make/tool.js'

export function load_deckCard_deck_bear(load: MeshLoad): void {
  card.loadLink(load).forEach((nest, index) => {
    card.load_deckCard_deck_bear_leadLink({ ...load, nest })
  })
}

export function load_deckCard_deck_bear_leadLink(load: MeshLoad): void {
  const index = card.loadLinkSlot(load)
  if (index === 0) {
    card.bindText(load, text => {
      const path = card.resolveModulePath(load, text)

      tool.loadTask(load.base, () => {
        card.handle_codeCard(load.base, path)
      })
    })
  } else {
    throw new Error('Too many loads.')
  }
}

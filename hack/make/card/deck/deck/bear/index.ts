import card from '~/make/card.js'
import { MeshLoad } from '~/make/form.js'

export function load_deckCard_deck_bear(load: MeshLoad): void {
  card.loadLink(load).forEach((nest, index) => {
    card.addTask(load.base, () => {
      card.load_deckCard_deck_bear_nestedChildren(
        card.withLink(load, nest, index),
      )
    })
  })
}

export function load_deckCard_deck_bear_nestedChildren(
  load: MeshLoad,
): void {
  const index = card.loadLinkIndex(load)
  if (index === 0) {
    const type = card.getLinkHint(load)
    switch (type) {
      case LinkHint.StaticText: {
        const string = card.assumeText(load)
        const path = card.resolveModulePath(load, string)
        const blueString = card.createBlueString(path)

        card.pushRed(
          load,
          card.createRedValue(load, 'bear', blueString),
        )
        card.attachBlue(load, 'bear', blueString)

        card.addTask(load.base, () => {
          card.handle_codeCard(load.base, path)
        })
        break
      }
      case LinkHint.DynamicText: {
        const textNode = card.loadLink(load, Link.Text)

        card.pushRed(load, card.createRedValue(load, 'bear', textNode))

        card.attachBlue(
          load,
          'bear',
          card.createBlueText(load, textNode),
        )

        card.bindText(load, () => {
          const string = card.assumeText(load)
          const path = card.resolveModulePath(load, string)
          card.attachBlue(load, 'bear', card.createBlueString(path))
        })
      }
      default:
        card.throwError(card.generateUnhandledNestCaseError(load, type))
    }
  } else {
    throw new Error('Too many loads.')
  }
}

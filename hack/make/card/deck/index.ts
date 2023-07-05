import { Base, TreeFork, TreeSite, formBase } from '../../form.js'
import tool from '../../tool.js'

export * from './deck/index.js'

export function load_deckCard(base: Base, link: string): void {
  const { tree: linkTree, text: linkText } = tool.readLinkText(
    base,
    link,
  )
  if (!linkText.trim()) {
    return
  }

  const cardTree = new TreeSite({
    fork: new TreeFork(),
    form: formBase.deckCard,
  })

  cardTree.fork.save('card', cardTree)
  cardTree.fork.save('base', base)

  linkTree.nest.forEach(nest => {
    card.load_deckCard_leadLink({ base, nest, tree: cardTree })
  })
}

export function load_deckCard_leadLink(load: MeshLoad): void {
  const type = card.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticTerm: {
      const term = card.resolveTermString(load)
      switch (term) {
        case 'deck':
          card.load_deckCard_deck(load)
          break
        default:
          card.throwError(card.generateUnhandledTermCaseError(load))
      }
      break
    }
    default:
      if (!card.saveNick(load)) {
        card.waitNick(load, () => load_deckCard_leadLink(load))
      }
  }
}

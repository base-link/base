import { minimatch } from 'minimatch'
import { Base } from '../form.js'
import tool from '../tool.js'

export * from './deck/index.js'
export * from './mint/index.js'

export function loadCard(base: Base, link: string): void {
  if (tool.testHaveCard(base, link)) {
    return
  }

  const deck = card.loadDeckFile(link)
  const mint = card.loadMintFile(deck)

  walk: for (const have of mint.mint) {
    if (minimatch(link, have.link)) {
      switch (have.name) {
        case 'deck':
          return card.load_deckCard(base, link)
        case 'code':
          return card.load_codeCard(base, link)
        case 'mint':
          return card.load_mintCard(base, link)
        case 'call': // api urls
          return card.load_callCard(base, link)
        case 'line': // cli hooks
          return card.load_lineCard(base, link)
        case 'note': // a note type is a scratch type which isn't validated
          return card.load_noteCard(base, link)
        case 'book':
          return card.load_bookCard(base, link)
        default:
          throw card.haltMissMintName()
      }
    }
  }

  throw card.haltCardMiss()
}

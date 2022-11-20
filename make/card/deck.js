
const fs = require('fs')
const pathResolve = require('path')
const parse = require('../parse')
const shared = require('../shared')
const parseCodeCard = require('./code')

parseCodeCard.parseDeckCard = parseDeckCard

module.exports = parseDeckCard

function parseDeckCard(link, linkTree, base) {
  const card = base.card(link)
  card.bind({
    text: base.system[link],
    link, // file path
    like: 'deck-card',
    base, // global environment, has `home` env vars.
    deck: {},
  })

  const dir = pathResolve.dirname(link)

  linkTree.nest.forEach(nest => {
    if (shared.doesHaveFind(nest)) {
      throw new Error('Oops ' + link)
    } else if (shared.isSimpleTerm(nest)) {
      const term = shared.getSimpleTerm(nest)
      switch (term) {
        case 'deck':
          mergeDeck(link, card.seed.deck, nest)
          break
        default:
          throw new Error(link)
      }
    }
  })

  if (card.seed.deck.bear) {
    let bearLink = shared.findPath(card.seed.deck.bear, dir)
    const bearText = fs.readFileSync(bearLink, 'utf-8')
    const bearLinkTree = parse(bearText)
    parseCodeCard(bearLink, bearText, bearLinkTree, base)
  }

  if (card.seed.deck.test) {
    let testLink = shared.findPath(card.seed.deck.test, dir)
    const testText = fs.readFileSync(testLink, 'utf-8')
    const testLinkTree = parse(testText)
    parseCodeCard(testLink, testText, testLinkTree, base)
  }
}

function mergeDeck(link, deck, nest) {
  nest.nest.forEach(nest => {
    if (shared.doesHaveFind(nest)) {
      throw new Error('Oops ' + link)
    } else if (shared.isText(nest)) {
      const [host, name] = shared.getText(nest).substr(1).split('/')
      deck.host = host
      deck.name = name
    } else if (shared.isSimpleTerm(nest)) {
      const term = shared.getSimpleTerm(nest)
      switch (term) {
        case 'bear':
          deck.bear = parseText(nest)
          break
        case 'test':
          deck.test = parseText(nest)
          break
        default:
          throw new Error(`${term}: ${link}`)
      }
    }
  })

  return deck
}

function parseText(nest) {
  return shared.getText(nest.nest[0])
}

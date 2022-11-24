
const pathResolve = require('path')
const shared = require('../../../shared')

module.exports = {
  doesHaveFind(nest) {
    for (let i = 0, n = nest.line.length; i < n; i++) {
      let line = nest.line[i]
      if (line.like !== 'term') {
        continue
      }

      for (let j = 0, m = line.link.length; j < m; j++) {
        let link = line.link[j]
        if (link.like === 'nest' && link.size === 1) {
          return true
        }
      }
    }

    return false
  },

  mintDeckCard(link) {
    const text = this.readTextFile(link)
    const tree = this.parseTextIntoTree(text)
    const card = this.card(link)
    const linkHost = this.getLinkHost(link)
    const knit = this.makeKnit({
      like: 'deck-card',
      base: this,
      link: this.makeCord(link),
      'link-host': this.makeCord(linkHost),
      deck: this.makeKnit({
        like: 'deck',
        mark: null,
        bear: null,
        read: null,
        code: [],
        term: [],
        face: [],
      }),
    })

    card.bind(knit)

    const fork = {
      knit,
      card: knit
    }

    tree.nest.forEach(nest => {
      const nestFork = this.extendObject(fork, { nest })
      if (this.doesHaveFind(nest)) {
        throw new Error('Oops ' + link)
      } else if (shared.isSimpleTerm(nest)) {
        const term = shared.getSimpleTerm(nest)
        switch (term) {
          case 'deck':
            this.mintDeck(nestFork)
            break
          default:
            throw new Error(link)
        }
      }
    })

    if (knit.size) {
      throw new Error('Difficulty')
    }

    card.bind(knit.mesh)

    if (knit.mesh.deck.bear) {
      const bearLink = knit.mesh.deck.bear.cord
      this.mintCodeCard(bearLink)
    }

    if (knit.mesh.deck.test) {
      const testLink = knit.mesh.deck.test.cord
      this.mintCodeCard(testLink)
    }
  },

  mintDeck(fork) {
    fork.nest.nest.forEach(nest => {
      if (shared.doesHaveFind(nest)) {
        throw new Error('Oops ' + fork.knit.mesh.link)
      } else if (shared.isText(nest)) {
        const text = shared.getText(nest)
        const [host, name] = text.substr(1).split('/')
        const textHost = this.makeCord(host)
        const textName = this.makeCord(name)
        fork.knit.tree.push(text)
        fork.knit.mesh.deck.host = textHost
        fork.knit.mesh.deck.name = textName
      } else if (shared.isSimpleTerm(nest)) {
        const term = shared.getSimpleTerm(nest)
        switch (term) {
          case 'bear': {
            const textLink = shared.findPath(shared.getText(nest.nest[0]), fork.knit.mesh['link-host'].cord)
            const text = this.makeCord(textLink)
            fork.knit.mesh.deck.bear = text
            fork.knit.tree.push(text)
            break
          }
          case 'test': {
            const textLink = shared.findPath(shared.getText(nest.nest[0]), fork.knit.mesh['link-host'].cord)
            const text = this.makeCord(textLink)
            fork.knit.mesh.deck.test = text
            fork.knit.tree.push(text)
            break
          }
          default:
            throw new Error(`${term}: ${fork.knit.mesh.link}`)
        }
      }
    })
  },
}

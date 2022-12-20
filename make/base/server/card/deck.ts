import { ParserNestNodeType } from '../../../parse'
import shared from '../../../shared'
import {
  ASTCardDeckType,
  BaseCardDeckMixinType,
  BaseType,
  ASTDeckType,
  ASTKnitType,
} from '../type'

export default <BaseCardDeckMixinType>{
  doesHaveFind(nest: ParserNestNodeType): boolean {
    for (let i = 0, n = nest.line.length; i < n; i++) {
      let line = nest.line[i]
      if (line) {
        if (line.like !== 'term') {
          continue
        }

        for (let j = 0, m = line.link.length; j < m; j++) {
          let link = line.link[j]
          if (link && link.like === 'slot' && link.size === 1) {
            return true
          }
        }
      }
    }

    return false
  },

  mintDeckCard(this: BaseType, link: string): void {
    const text = this.readTextFile(link)
    const tree = this.parseTextIntoTree(text)
    const linkHost = this.getLinkHost(link)
    const card = this.card(link)
    const knit: ASTKnitType<ASTCardDeckType> =
      this.makeKnit<ASTCardDeckType>({
        like: 'deck-card',
        base: this,
        'link-text-line': text.split(/\n/),
        'link-text-tree': tree,
        link: this.makeCord(link),
        'link-host': this.makeCord(linkHost),
        deck: this.makeKnit<ASTDeckType>({
          like: 'deck',
          mark: undefined, // version
          bear: undefined, // entrypoint to library, tells us what to copy over.
          site: undefined, // entrypoint to app.
          test: undefined, // entrypoint to tests.
          read: undefined,
          term: this.makeList(), // licenses
          face: this.makeList(), // people
        }),
      })

    card.bind(knit)

    const fork = {
      knit: knit.mesh.deck,
      card: knit,
    }

    if (tree.like === 'nest') {
      tree.nest.forEach(nest => {
        const nestFork = this.extendObject(fork, { nest })
        if (this.doesHaveFind(nest)) {
          // TODO: throw a more helpful error with pointing to code.
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
    }

    if (knit.size) {
      throw new Error('Difficulty')
    }

    if (knit.mesh.deck.mesh.bear) {
      const bearLink: string = knit.mesh.deck.mesh.bear.cord
      this.mintCodeCard(bearLink)
    }

    if (knit.mesh.deck.mesh.test) {
      const testLink: string = knit.mesh.deck.mesh.test.cord
      this.mintCodeCard(testLink)
    }

    // console.log(knit)
  },

  mintDeck(fork): void {
    fork.nest.nest.forEach((nest, i) => {
      if (shared.doesHaveFind(nest)) {
        throw new Error('Oops ' + fork.card.mesh.link)
      } else if (shared.isText(nest) && i === 0) {
        const text = shared.getText(nest)
        const [host, name] = text.slice(1).split('/')
        const textHost = this.makeCord(host)
        const textName = this.makeCord(name)
        this.addToTreeLink(fork.knit, this.makeCord(text))
        fork.knit.mesh.host = textHost
        fork.knit.mesh.name = textName
      } else if (i > 0 && shared.isSimpleTerm(nest)) {
        const term = shared.getSimpleTerm(nest)
        switch (term) {
          case 'bear': {
            const textLink = shared.findPath(
              shared.getText(nest.nest[0]),
              fork.card.mesh['link-host'].cord,
            )
            const text = this.makeCord(textLink)
            fork.knit.mesh.bear = text
            this.addToTreeLink(fork.knit, {
              like: 'term',
              term: 'bear',
              bond: text,
            })
            break
          }
          case 'test': {
            const textLink = shared.findPath(
              shared.getText(nest.nest[0]),
              fork.card.mesh['link-host'].cord,
            )
            const text = this.makeCord(textLink)
            fork.knit.mesh.test = text
            this.addToTreeLink(fork.knit, {
              like: 'term',
              term: 'test',
              bond: text,
            })
            break
          }
          default:
            throw new Error(
              `${term}: ${fork.card.mesh.link.cord}`,
            )
        }
      } else {
        throw new Error(`${fork.card.mesh.link.cord}`)
      }
    })
  },
}

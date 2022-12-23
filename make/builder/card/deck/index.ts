import {
  Base,
  InitialMeshDeckCardType,
  Mesh,
  MeshDeckCardInputType,
  NestInputType,
  Tree,
  api,
} from '~'

export * from './deck'

/**
 * Entrypoint function.
 */
export function process_deckCard(
  base: Base,
  link: string,
): void {
  const text = api.readTextFile(base, link)
  const tree = api.parseTextIntoTree(text)
  const linkHost = api.getLinkHost(link)
  const card = base.card(link)
  const seed: InitialMeshDeckCardType = {
    base,
    deck: {
      face: [],
      host: undefined,
      like: Mesh.Deck,
      name: undefined,
      term: [],
    },
    dependencyList: [],
    directory: linkHost,
    like: Mesh.DeckCard,
    parseTree: tree,
    path: link,
    textByLine: text.split(/\n/),
  }
  const input: MeshDeckCardInputType = {
    card: seed,
    fork: {
      data: seed,
      like: Mesh.Fork,
    },
  }

  card.bind(seed)

  if (tree.like === Tree.Nest) {
    tree.nest.forEach((nest, index) => {
      api.process_deckCard_nestedChildren({
        ...input,
        index,
        nest,
      })
    })
  }
}

export function process_deckCard_nestedChildren(
  input: NestInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case 'static-term': {
      const term = api.resolveStaticTermFromNest(input)
      switch (term) {
        case 'deck':
          api.process_deckCard_deck(input)
          break
        default:
          api.throwError(api.generateUnknownTermError(input))
      }
      break
    }
    default:
      api.throwError(
        api.generateUnhandledNestCaseError(input, type),
      )
  }
}

export function resolve_deckCard(
  base: Base,
  link: string,
): void {
  const card = base.card(link)
  api.assertMesh(card.seed, Mesh.DeckCard)

  const { deck } = card.seed

  // TODO: deck.hint tells us the parser to use on the code.

  if (deck.bear) {
    api.process_codeCard(base, deck.bear)
    api.resolve_codeCard(base, deck.bear)
  }
}

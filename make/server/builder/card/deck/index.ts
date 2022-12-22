import { Base, Scope, ScopeType, api } from '~server'

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
  const scope: ScopeType<Scope.DeckCard> = api.extendScope(
    Scope.DeckCard,
    {
      card: {
        base,
        deck: {
          face: [],
          host: undefined,
          like: 'deck',
          name: undefined,
          term: [],
        },
        dependencyWatcherMap: new Map(),
        directory: linkHost,
        like: Scope.DeckCard,
        parseTree: tree,
        path: link,
        textByLine: text.split(/\n/),
      },
    },
  )

  card.bind(scope.data.card)

  if (tree.like === 'nest') {
    tree.nest.forEach((nest, index) => {
      const nestedScope = api.extendNest(scope, nest, index)
      api.process_deckCard_nestedChildren(nestedScope)
    })
  }
}

export function process_deckCard_nestedChildren(
  scope: ScopeType<Scope.Nest, ScopeType<Scope.DeckCard>>,
): void {
  const type = api.determineNestType(scope)
  switch (type) {
    case 'static-term': {
      const term = api.resolveStaticTerm(scope)
      switch (term) {
        case 'deck':
          api.process_deckCard_deck(scope)
          break
        default:
          api.throwError(api.generateUnknownTermError(scope))
      }
      break
    }
    default:
      api.throwError(
        api.generateUnhandledNestCaseError(scope, type),
      )
  }
}

import { Base, Scope, ScopeType, api } from '~server'
import type { ASTDeckCardType, NestedPartial } from '~server'

export * from './deck'

export function check_deckCard_scope(
  scope: NestedPartial<ASTDeckCardType>,
): boolean {
  if (scope) {
    return true
  }

  return false
}

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
  const partialScope: ScopeType<Scope.DeckCard> =
    api.extendScope(Scope.DeckCard, {
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
    })

  card.bind(partialScope)

  if (tree.like === 'nest') {
    tree.nest.forEach((nest, index) => {
      const nestedPartialScope = api.extendScope(
        Scope.Nest,
        { index, nest },
        partialScope,
      )
      api.process_deckCard_nestedChildren(nestedPartialScope)
    })
  }
}

export function process_deckCard_nestedChildren(
  scope: ScopeType<Scope.Nest>,
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

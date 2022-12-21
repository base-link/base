import { ASTDeckType, Base, api } from '~server'
import type {
  ASTDeckCardType,
  LexicalScope,
  LexicalScopeNestAddonType,
  NestedPartial,
} from '~server'

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
  const partialScope: LexicalScope<
    NestedPartial<ASTDeckCardType>
  > = api.extendScope({
    base,
    deck: {
      face: [],
      host: undefined,
      like: 'deck',
      name: undefined,
      term: [],
    } as NestedPartial<ASTDeckType>,
    dependencyWatcherMap: new Map(),
    directory: linkHost,
    like: 'deck-card',
    parseTree: tree,
    path: link,
    textByLine: text.split(/\n/),
  })
  card.bind(partialScope)

  if (tree.like === 'nest') {
    tree.nest.forEach(nest => {
      const nestedPartialScope = api.extendScope(
        { like: 'nest-fork', nest },
        partialScope,
      )
      api.process_deckCard_nestedChildren(nestedPartialScope)
    })
  }
}

export function process_deckCard_nestedChildren(
  scope: LexicalScope<
    LexicalScopeNestAddonType,
    NestedPartial<ASTDeckCardType>
  >,
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

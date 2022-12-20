import { ASTDeckType, Base, api } from '~server'
import type {
  ASTDeckCardType,
  ASTDeckFaceType,
  ASTDeckTermType,
  LexicalScope,
  LexicalScopeNestAddonType,
  NestedPartial,
} from '~server'
import shared from '~shared'

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
      api.process_deckCard_nestedTerm(nestedPartialScope)
    })
  }

  // if (partialScope.dependencyWatcherMap?.size) {
  //   throw new Error('Difficulty')
  // }

  // if (knit.deck.bear) {
  //   const bearLink: string = knit.deck.bear.cord
  //   api.mintCodeCard(base, bearLink)
  // }

  // if (knit.deck.test) {
  //   const testLink: string = knit.deck.test.cord
  //   api.mintCodeCard(base, testLink)
  // }

  // console.log(knit)
}

export function process_deckCard_nestedTerm(
  scope: LexicalScope<
    LexicalScopeNestAddonType,
    NestedPartial<ASTDeckCardType>
  >,
): void {
  const term = shared.getSimpleTerm(scope.data.nest)
  switch (term) {
    case 'deck':
      api.process_deckCard_deck(scope)
      break
    default:
      throw new Error(link)
  }
}

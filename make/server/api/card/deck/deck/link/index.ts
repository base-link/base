import { ParserNestNodeType } from '~parse'

import {
  ASTDeckCardType,
  LexicalScope,
  LexicalScopeNestAddonType,
  api,
} from '~server'

export function process_deckCard_deck_link(
  scope: LexicalScope<
    LexicalScopeNestAddonType,
    ASTDeckCardType
  >,
) {
  const nest = api.getPropertyValueFromScope(
    scope,
    'nest',
  ) as ParserNestNodeType

  if (nest && nest.like === 'nest') {
    const text = api.getText(nest, scope)
    if (text) {
      const [host, name] = text.slice(1).split('/')
      if (scope.parent && host && name) {
        scope.parent.data.deck.host = host
        scope.parent.data.deck.name = name
      }
    }
  }
}

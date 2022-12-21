import { api } from '~server'
import {
  ASTCodeCardType,
  LexicalScope,
  LexicalScopeNestAddonType,
} from '~server/type'
import shared from '~shared'

export function process_codeCard_zoneHook(
  scope: LexicalScope<
    LexicalScopeNestAddonType,
    ASTCodeCardType
  >,
): void {}

import { ParserNestNodeType } from '~parse'

import {
  ASTDeckCardType,
  ASTDeckType,
  NestedPartial,
} from '~server'

import './base'

export type CompilerCardForkType = {
  like: 'card-fork'
  mesh: ASTDeckType
}

export type CompilerNestForkType = Omit<
  NestedPartial<ASTDeckCardType>,
  'like'
> & {
  like: 'nest-fork'
  nest: ParserNestNodeType
}

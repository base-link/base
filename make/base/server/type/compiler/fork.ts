import { ParserNestNodeType } from '~parse'
import {
  ASTDeckType,
  ASTMeshType,
  ASTDeckCardType,
} from '../ast'
import { CompilerKnitType } from '../compiler/base'

export type CompilerCardForkType = {
  like: 'card-fork'
  knit: CompilerKnitType<ASTDeckType>
  card: CompilerKnitType<ASTDeckCardType>
}

export type CompilerNestForkType = {
  like: 'nest-fork'
  knit: CompilerKnitType<ASTMeshType>
  card: CompilerKnitType<ASTDeckCardType>
  nest: ParserNestNodeType
}

import type { ParserNestNodeType, ParserNodeType } from '~parse'

import type {
  ASTDeckCardType,
  ASTMeshType,
  NestedPartial,
} from '~server'

export type CompilerCordType = {
  cord: string
  like: 'compiler-cord'
}

export type CompilerDependencyWatcherType = {
  like: 'compiler-dependency-watcher'
}

export type CompilerKnitType<
  P = ASTMeshType,
  Q = ASTMeshType,
> = {
  base?: CompilerKnitType<Q>
  like: 'compiler-knit'
  mesh: P
  size: number
  slot: number
  tree: Array<unknown>
}

export type CompilerTreeType = {
  base?: CompilerTreeType
  like: 'compiler-tree'
  link: Array<ParserNodeType | CompilerTreeType>
  name: string
  size: number
  slot?: number
}

export enum Scope {
  DeckCard = 'partial-deck-card',
  Nest = 'nest',
}

export type ScopeChainType = {
  data: Object
  parent?: ScopeChainType
}

export type ScopeDeckCardDataType =
  NestedPartial<ASTDeckCardType>

export type ScopeNestDataType = {
  index: number
  nest: ParserNestNodeType
}

export type ScopeTableType = {
  nest: ScopeNestDataType
  'partial-deck-card': ScopeDeckCardDataType
}

export type ScopeType<
  A extends Scope,
  B extends ScopeType<Scope> | unknown = unknown,
> = {
  data: ScopeTableType[A]
  like: A
  parent?: B
}

import type { ParserNestNodeType, ParserNodeType } from '~parse'

import type {
  ASTCodeCardType,
  ASTDeckCardType,
  ASTFormType,
  ASTMeshType,
  PickPartial,
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
  CodeCard = 'code-card',
  DeckCard = 'deck-card',
  Form = 'form',
  Nest = 'nest',
}

export type ScopeChainType = {
  data: Object
  parent?: ScopeChainType
}

export type ScopeCodeCardDataType = ASTCodeCardType

export type ScopeDeckCardDataType = PickPartial<
  ASTDeckCardType,
  {
    base: 1
    deck: {
      face: 1
      like: 1
      term: 1
    }
    dependencyWatcherMap: 1
    directory: 1
    like: 1
    parseTree: 1
    path: 1
    textByLine: 1
  }
>

export type ScopeFormDataType = PickPartial<
  ASTFormType,
  {
    base: 1
    hook: 1
    like: 1
    link: 1
    task: 1
    wear: 1
  }
>

export type ScopeNestDataType = {
  index: number
  nest: ParserNestNodeType
}

export type ScopeTableType = {
  'code-card': ScopeCodeCardDataType
  'deck-card': ScopeDeckCardDataType
  form: ScopeFormDataType
  nest: ScopeNestDataType
}

export type ScopeType<
  A extends Scope,
  B extends ScopeType<Scope> | unknown = unknown,
> = {
  data: ScopeTableType[A]
  like: A
  parent?: B
}

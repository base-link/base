import type { ParserNestNodeType, ParserNodeType } from '~parse'

import type { ASTMeshType } from '~server'

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

export type LexicalScope<
  P extends LexicalScopeDefaultType = LexicalScopeDefaultType,
  Q extends LexicalScopeDefaultType = LexicalScopeDefaultType,
> = {
  data: P
  parent?: LexicalScope<Q>
}

export type LexicalScopeDefaultType = Record<string, unknown>

export type LexicalScopeNestAddonType = {
  nest: ParserNestNodeType
}

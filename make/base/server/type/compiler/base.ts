import { ParserNodeType } from '~parse'
import { ASTMeshType } from '../ast'

export type CompilerTreeType = {
  like: 'compiler-tree'
  name: string
  link: Array<ParserNodeType | CompilerTreeType>
  size: number
  base?: CompilerTreeType
  slot?: number
}

export type CompilerCordType = {
  like: 'compiler-cord'
  cord: string
}

export type CompilerKnitType<
  P = ASTMeshType,
  Q = ASTMeshType,
> = {
  like: 'compiler-knit'
  slot: number
  size: number
  tree: Array<unknown>
  mesh: P
  base?: CompilerKnitType<Q>
}

export type CompilerMeshType<T> = {
  like: 'compiler-mesh'
  mesh: T
}

export type CompilerListType<T> = {
  like: 'compiler-list'
  list: Array<T>
}

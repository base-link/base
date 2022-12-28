import type { ASTModuleBaseType, InternalScopeType } from '~'

export * from './mesh/index.js'

export type APIInputType = {
  card: ASTModuleBaseType
  lexicalScope: InternalScopeType
  nestScope?: InternalScopeType
  objectScope: InternalScopeType
}

// expands object types one level deep
export type Expand<T> = T extends infer O
  ? { [K in keyof O]: O[K] }
  : never

// expands object types recursively
export type ExpandRecursively<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T

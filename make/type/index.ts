import { ASTModuleBaseType, ASTScopeType } from '~'

export * from './mesh'

export type APIInputType = {
  card: ASTModuleBaseType
  lexicalScope: ASTScopeType
  nestScope?: ASTScopeType
  objectScope: ASTScopeType
}

export type NestedPartial<T> = T extends
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
  | symbol
  | Date
  ? T | undefined
  : T extends Array<infer ArrayType>
  ? Array<NestedPartial<ArrayType>>
  : T extends ReadonlyArray<infer ArrayType>
  ? ReadonlyArray<ArrayType>
  : T extends Set<infer SetType>
  ? Set<NestedPartial<SetType>>
  : T extends ReadonlySet<infer SetType>
  ? ReadonlySet<SetType>
  : T extends Map<infer KeyType, infer ValueType>
  ? Map<NestedPartial<KeyType>, NestedPartial<ValueType>>
  : T extends ReadonlyMap<infer KeyType, infer ValueType>
  ? ReadonlyMap<
      NestedPartial<KeyType>,
      NestedPartial<ValueType>
    >
  : {
      [K in keyof T]?: NestedPartial<T[K]>
    }

export type PartialOptionalObject<T, M> = Partial<
  Omit<T, keyof M>
>

export type PartialState<T, M, B> = PartialTree<T, M, B>

export type PartialTree<T, M, B> = PartialOptionalObject<T, M> &
  RequiredObject<T, M, B>

export type RecursiveRequired<T, M, B> = {
  [K in keyof T & keyof M]: M[K] extends object
    ? PartialTree<T[K], M[K], B>
    : T[K]
} & (B extends true ? { partial: true } : {})

export type RequiredKeyList<O> = {
  [K in keyof O]: O[K]
}

export type RequiredObject<T, M, B> = RecursiveRequired<
  T,
  M,
  B
> extends infer O
  ? RequiredKeyList<O>
  : never

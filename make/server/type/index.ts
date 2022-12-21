export * from './ast'
export * from './compiler'

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

export type PickPartial<T, M> = Partial<Omit<T, keyof M>> & {
  [K in keyof T & keyof M]: M[K] extends object
    ? PickPartial<T[K], M[K]>
    : T[K]
}

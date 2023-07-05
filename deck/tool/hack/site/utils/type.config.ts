export type NestedObjectType = {
  [key: string]: NestedObjectValueType
}

export type NestedObjectValueType =
  | NestedObjectType
  | string
  | boolean
  | number
  | null
  | undefined
  | Array<
      NestedObjectType | string | boolean | number | null | undefined
    >

export type PreferenceResolverFunctionType =
  | ((val: NestedObjectValueType) => void)
  | ((val: NestedObjectValueType) => Promise<void>)

export type PreferenceResolverType = {
  [key: string]: PreferenceResolverType | PreferenceResolverFunctionType
}

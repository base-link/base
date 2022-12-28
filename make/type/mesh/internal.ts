import type { APIInputType } from '~'

export enum Internal {
  Dependency = 'internal-dependency',
  DependencyPart = 'internal-dependency-part',
  Scope = 'internal-scope',
}

export type InternalDependencyPartCallbackType = (
  value: unknown,
) => void

export type InternalDependencyPartType = {
  callbackList: Array<InternalDependencyPartCallbackType>
  last?: InternalDependencyPartType
  like: Internal.DependencyPart
  name: string
  next?: InternalDependencyPartType
  parent: InternalDependencyType
}

export type InternalDependencyType = {
  callbackList: Array<InternalInputCallbackType<APIInputType>>
  context: APIInputType
  like: Internal.Dependency
  path: Array<InternalDependencyPartType>
}

export type InternalInputCallbackType<T> = (value: T) => void

export type InternalMappingType = {
  'internal-dependency': InternalDependencyType
  'internal-dependency-part': InternalDependencyPartType
  'internal-scope': InternalScopeType
}

export type InternalScopeType = {
  data: Record<string, unknown>
  like: Internal.Scope
  parent?: InternalScopeType
}

export type InternalType<T extends Internal> =
  InternalMappingType[T]

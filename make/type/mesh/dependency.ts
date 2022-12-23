import { Mesh } from './list'

export type MeshBindableCallbackType<T> = (value: T) => void

export type MeshBindableObjectType = {
  // callbacks to the dependency handler
  // then the dependency handler calls back to
  // the original source compiler handler
  callbackList: Array<
    MeshBindableCallbackType<Record<string, unknown>>
  >
  data: Record<string, unknown>
  like: Mesh.BindableObject
  parent?: MeshBindableObjectType
}

export type MeshBindableStringType = {
  callbackList: Array<MeshBindableCallbackType<string>>
  data: string
  like: Mesh.BindableString
  parent?: MeshBindableObjectType
}

export type MeshDependencyPartCallbackType = (
  value: unknown,
) => void

export type MeshDependencyPartType = {
  callbackList: Array<MeshDependencyPartCallbackType>
  last?: MeshDependencyPartType
  like: Mesh.DependencyPart
  met: boolean
  name: string
  next?: MeshDependencyPartType
  parent: MeshDependencyType
}

export type MeshDependencyType = {
  like: Mesh.Dependency
  met: boolean
  path: Array<MeshDependencyPartType>
}

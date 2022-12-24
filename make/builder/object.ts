import { Mesh, MeshBindableObjectType, MeshScopeType } from '~'

export function createBindableObject(
  data: Record<string, unknown>,
  parent?: MeshBindableObjectType,
): MeshBindableObjectType {
  return {
    callbackList: [],
    data,
    like: Mesh.BindableObject,
    parent,
  }
}

export function createScope(
  data: Record<string, unknown>,
  parent?: MeshScopeType,
): MeshScopeType {
  return {
    data,
    like: Mesh.Scope,
    parent,
  }
}

import { Mesh, MeshType, api } from '~'

export function assertMesh<T extends Mesh>(
  object: unknown,
  like: T,
): asserts object is MeshType<T> {
  if (!api.isMesh(object, like)) {
    api.throwError(api.generateObjectNotMeshNodeError(like))
  }
}

export function isMesh<T extends Mesh>(
  object: unknown,
  like: T,
): object is MeshType<T> {
  return (
    api.isObject(object) &&
    'like' in object &&
    (object as MeshType<T>).like === like
  )
}

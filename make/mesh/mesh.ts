import {
  Mesh,
  MeshFullType,
  MeshPartialType,
  MeshType,
  Tree,
  TreeType,
  code,
} from '~'

export function assertMesh<T extends Mesh>(
  object: unknown,
  like: T,
): asserts object is MeshType<T> {
  if (!code.isMesh(object, like)) {
    code.throwError(
      code.generateObjectNotTypeError(object, [like]),
    )
  }
}

export function assertMeshFull<T extends Mesh>(
  object: unknown,
  like: T | Array<T>,
): asserts object is MeshFullType<T> {
  like = code.isArray(like) ? like : [like]

  for (const l of like) {
    if (code.isMeshFull(object, l)) {
      return
    }
  }

  code.throwError(code.generateObjectNotTypeError(object, like))
}

export function assertMeshPartial<T extends Mesh>(
  object: unknown,
  like: T | Array<T>,
): asserts object is MeshPartialType<T> {
  like = code.isArray(like) ? like : [like]

  for (const l of like) {
    if (code.isMeshPartial(object, l)) {
      return
    }
  }

  code.throwError(code.generateObjectNotTypeError(object, like))
}

export function assertTreeType<T extends Tree>(
  object: unknown,
  like: T,
): asserts object is TreeType<T> {
  if (!code.isTreeType(object, like)) {
    code.throwError({
      note: 'Not of type',
    })
    // code.throwError(code.generateObjectNotTypeError(like))
  }
}

export function isMesh<T extends Mesh>(
  object: unknown,
  like: T,
): object is MeshType<T> {
  return (
    code.isRecord(object) &&
    'like' in object &&
    (object as MeshType<T>).like === like
  )
}

export function isMeshFull<T extends Mesh>(
  object: unknown,
  like: T,
): object is MeshType<T> {
  return (
    code.isRecord(object) &&
    'like' in object &&
    (object as MeshFullType<T>).like === like &&
    (object as MeshFullType<T>).partial === false
  )
}

export function isMeshPartial<T extends Mesh>(
  object: unknown,
  like: T,
): object is MeshPartialType<T> {
  return (
    code.isRecord(object) &&
    'like' in object &&
    (object as MeshType<T>).like === like &&
    (object as MeshPartialType<T>).partial === true
  )
}

export function isTreeType<T extends Tree>(
  object: unknown,
  like: T,
): object is TreeType<T> {
  return (
    code.isRecord(object) &&
    'like' in object &&
    (object as TreeType<T>).like === like
  )
}

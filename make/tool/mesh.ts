import {
  Link,
  LinkType,
  Mesh,
  MeshFullType,
  MeshPartialType,
  MeshType,
  code,
} from '~'

export function assertLinkType<T extends Link>(
  object: unknown,
  like: T,
  name?: string,
): asserts object is LinkType<T> {
  if (!code.isLinkType(object, like)) {
    code.throwError(
      code.generateIncorrectlyTypedVariable(like, name),
    )
    // code.throwError(code.generateObjectNotTypeError(like))
  }
}

export function assertMeshFullType<T extends Mesh>(
  object: unknown,
  like: T | Array<T>,
  name?: string,
): asserts object is MeshFullType<T> {
  like = code.isArray(like) ? like : [like]

  for (const l of like) {
    if (code.isMeshFullType(object, l)) {
      return
    }
  }

  code.throwError(
    code.generateIncorrectlyTypedVariable(like, name),
  )
}

export function assertMeshPartialType<T extends Mesh>(
  object: unknown,
  like: T | Array<T>,
  name?: string,
): asserts object is MeshPartialType<T> {
  like = code.isArray(like) ? like : [like]

  for (const l of like) {
    if (code.isMeshPartialType(object, l)) {
      return
    }
  }

  code.throwError(
    code.generateIncorrectlyTypedVariable(like, name),
  )
}

export function assertMeshType<T extends Mesh>(
  object: unknown,
  like: T,
  name?: string,
): asserts object is MeshType<T> {
  if (!code.isMeshType(object, like)) {
    code.throwError(
      code.generateIncorrectlyTypedVariable(like, name),
    )
  }
}

export function isLinkType<T extends Link>(
  object: unknown,
  like: T,
): object is LinkType<T> {
  return (
    code.isRecord(object) &&
    'like' in object &&
    (object as LinkType<T>).like === like
  )
}

export function isMeshFullType<T extends Mesh>(
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

export function isMeshPartialType<T extends Mesh>(
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

export function isMeshType<T extends Mesh>(
  object: unknown,
  like: T,
): object is MeshType<T> {
  return (
    code.isRecord(object) &&
    'like' in object &&
    (object as MeshType<T>).like === like
  )
}

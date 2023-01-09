import {
  LINK_TYPE,
  Link,
  LinkType,
  MESH_TYPE,
  Mesh,
  MeshType,
  NEST_TYPE,
  Nest,
  NestType,
  SiteProcessInputType,
  code,
} from '~'

export function assertGenericLink(
  object: unknown,
  name?: string,
): asserts object is LinkType<Link> {
  if (!code.isGenericLink(object)) {
    code.throwError(code.generateIncorrectlyTypedVariable('link', name))
    // code.throwError(code.generateObjectNotTypeError(like))
  }
}

export function assertGenericMesh(
  object: unknown,
  name?: string,
): asserts object is MeshType<Mesh> {
  if (!code.isGenericLink(object)) {
    code.throwError(code.generateIncorrectlyTypedVariable('mesh', name))
    // code.throwError(code.generateObjectNotTypeError(like))
  }
}

export function assertGenericNest(
  object: unknown,
  name?: string,
): asserts object is NestType<Nest> {
  if (!code.isGenericNest(object)) {
    code.throwError(code.generateIncorrectlyTypedVariable('nest', name))
    // code.throwError(code.generateObjectNotTypeError(like))
  }
}

export function assertLink<T extends Link>(
  object: unknown,
  like: T,
  name?: string,
): asserts object is LinkType<T> {
  if (!code.isLink(object, like)) {
    code.throwError(code.generateIncorrectlyTypedVariable('link', name))
    // code.throwError(code.generateObjectNotTypeError(like))
  }
}

export function assertMesh<T extends Mesh>(
  object: unknown,
  like: T,
  name?: string,
): asserts object is MeshType<T> {
  if (!code.isMesh(object, like)) {
    code.throwError(code.generateIncorrectlyTypedVariable('mesh', name))
    // code.throwError(code.generateObjectNotTypeError(like))
  }
}

export function assertNest<T extends Nest>(
  object: unknown,
  like: T,
  name?: string,
): asserts object is NestType<T> {
  if (!code.isNest(object, like)) {
    code.throwError(code.generateIncorrectlyTypedVariable('nest', name))
    // code.throwError(code.generateObjectNotTypeError(like))
  }
}

export function assumeLink<T extends Link>(
  input: SiteProcessInputType,
  like: T,
  name?: string,
): LinkType<T> {
  const nest = code.assumeNest(input)
  code.assertLink(nest, like, name)
  return nest
}

export function assumeMesh<T extends Mesh>(
  input: SiteProcessInputType,
  like: T,
  name?: string,
): MeshType<T> {
  const nest = code.assumeNest(input)
  code.assertMesh(nest, like, name)
  return nest
}

export function isGenericLink(
  object: unknown,
): object is LinkType<Link> {
  return (
    code.isObjectWithLike(object) &&
    LINK_TYPE.includes((object as LinkType<Link>).like)
  )
}

export function isGenericMesh(
  object: unknown,
): object is MeshType<Mesh> {
  return (
    code.isObjectWithLike(object) &&
    MESH_TYPE.includes((object as MeshType<Mesh>).like)
  )
}

export function isGenericNest(
  object: unknown,
): object is NestType<Nest> {
  return (
    code.isObjectWithLike(object) &&
    NEST_TYPE.includes((object as NestType<Nest>).like)
  )
}

export function isLink<T extends Link>(
  object: unknown,
  like: T,
): object is LinkType<T> {
  return (
    code.isObjectWithLike(object) &&
    (object as LinkType<T>).like === like
  )
}

export function isMesh<T extends Mesh>(
  object: unknown,
  like: T,
): object is MeshType<T> {
  return (
    code.isObjectWithLike(object) &&
    (object as MeshType<T>).like === like
  )
}

export function isNest<T extends Nest>(
  object: unknown,
  like: T,
): object is NestType<T> {
  return (
    code.isObjectWithLike(object) &&
    (object as NestType<T>).like === like
  )
}

export function isObjectWithLike(object: unknown): boolean {
  return code.isRecord(object) && 'like' in object
}

import { Mesh, MeshForkType, api } from '~'

export function getForkProperty(
  fork: MeshForkType,
  path: string | number | symbol,
): unknown {
  let source: MeshForkType | undefined = fork

  while (source) {
    if (path in source.data) {
      break
    } else {
      source = source.parent
    }
  }

  if (!source) {
    return
  }

  return (
    source.data as Record<string | symbol | number, unknown>
  )[path]
}

export function getProperty(
  object: Record<string, unknown>,
  path: string,
): unknown {
  if (api.isObject(object) && path in object) {
    return object[path]
  }
}

export function isFork(
  object: unknown,
): object is MeshForkType {
  return (
    api.isObject(object) &&
    'like' in object &&
    (object as MeshForkType).like === Mesh.Fork
  )
}

export function makeFork(
  parent: MeshForkType,
  data: Record<string, unknown>,
): MeshForkType {
  return {
    data,
    like: Mesh.Fork,
    parent,
  }
}

export function setForkProperty(
  fork: MeshForkType,
  property: string,
  value: unknown,
): void {
  if (property in fork) {
    fork.data[property] = value
  } else if (fork.parent) {
    api.setForkProperty(fork.parent, property, value)
  } else {
    api.throwError(
      api.generateForkMissingPropertyError(property),
    )
  }
}

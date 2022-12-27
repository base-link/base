import { AST, ASTForkType, api } from '~'

export function getForkProperty(
  fork: ASTForkType,
  path: string | number | symbol,
): unknown {
  let source: ASTForkType | undefined = fork

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

export function isFork(object: unknown): object is ASTForkType {
  return (
    api.isObject(object) &&
    'like' in object &&
    (object as ASTForkType).like === AST.Fork
  )
}

export function makeFork(
  parent: ASTForkType,
  data: Record<string, unknown>,
): ASTForkType {
  return {
    data,
    like: AST.Fork,
    parent,
  }
}

export function setForkProperty(
  fork: ASTForkType,
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

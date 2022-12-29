import {
  AST,
  ASTFullType,
  ASTPartialType,
  ASTType,
  Tree,
  TreeType,
  api,
} from '~'

export function assertAST<T extends AST>(
  object: unknown,
  like: T,
): asserts object is ASTType<T> {
  if (!api.isAST(object, like)) {
    api.throwError(
      api.generateObjectNotTypeError(object, [like]),
    )
  }
}

export function assertASTFull<T extends AST>(
  object: unknown,
  like: T | Array<T>,
): asserts object is ASTFullType<T> {
  like = api.isArray(like) ? like : [like]

  for (const l of like) {
    if (api.isASTFull(object, l)) {
      return
    }
  }

  api.throwError(api.generateObjectNotTypeError(object, like))
}

export function assertASTPartial<T extends AST>(
  object: unknown,
  like: T | Array<T>,
): asserts object is ASTPartialType<T> {
  like = api.isArray(like) ? like : [like]

  for (const l of like) {
    if (api.isASTPartial(object, l)) {
      return
    }
  }

  api.throwError(api.generateObjectNotTypeError(object, like))
}

export function assertTreeType<T extends Tree>(
  object: unknown,
  like: T,
): asserts object is TreeType<T> {
  if (!api.isTreeType(object, like)) {
    api.throwError({
      note: 'Not of type',
    })
    // api.throwError(api.generateObjectNotTypeError(like))
  }
}

export function isAST<T extends AST>(
  object: unknown,
  like: T,
): object is ASTType<T> {
  return (
    api.isRecord(object) &&
    'like' in object &&
    (object as ASTType<T>).like === like
  )
}

export function isASTFull<T extends AST>(
  object: unknown,
  like: T,
): object is ASTType<T> {
  return (
    api.isRecord(object) &&
    'like' in object &&
    (object as ASTFullType<T>).like === like &&
    (object as ASTFullType<T>).partial === false
  )
}

export function isASTPartial<T extends AST>(
  object: unknown,
  like: T,
): object is ASTPartialType<T> {
  return (
    api.isRecord(object) &&
    'like' in object &&
    (object as ASTType<T>).like === like &&
    (object as ASTPartialType<T>).partial === true
  )
}

export function isTreeType<T extends Tree>(
  object: unknown,
  like: T,
): object is TreeType<T> {
  return (
    api.isRecord(object) &&
    'like' in object &&
    (object as TreeType<T>).like === like
  )
}

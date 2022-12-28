import {
  AST,
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
    api.throwError(api.generateObjectNotASTNodeError(like))
  }
}

export function assertASTPartial<T extends AST>(
  object: unknown,
  like: T,
): asserts object is ASTPartialType<T> {
  if (!api.isASTPartial(object, like)) {
    api.throwError(api.generateObjectNotASTNodeError(like))
  }
}

export function assertTreeType<T extends Tree>(
  object: unknown,
  like: T,
): asserts object is TreeType<T> {
  if (!api.isTreeType(object, like)) {
    throw new Error('oops')
    // api.throwError(api.generateObjectNotASTNodeError(like))
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

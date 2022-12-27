import { AST, ASTType, api } from '~'

export function assertAST<T extends AST>(
  object: unknown,
  like: T,
): asserts object is ASTType<T> {
  if (!api.isAST(object, like)) {
    api.throwError(api.generateObjectNotASTNodeError(like))
  }
}

export function isAST<T extends AST>(
  object: unknown,
  like: T,
): object is ASTType<T> {
  return (
    api.isObject(object) &&
    'like' in object &&
    (object as ASTType<T>).like === like
  )
}

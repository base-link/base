import { api } from '~tool'
import { AST, ASTNodeType } from '~type'

export function assertAST<T extends AST>(
  object: unknown,
  like: T,
): asserts object is ASTNodeType<T> {
  if (!api.isAST(object, like)) {
    api.throwError(api.generateObjectNotASTNodeError(like))
  }
}

export function isAST<T extends AST>(
  object: unknown,
  like: T,
): object is ASTNodeType<T> {
  return (
    api.isObject(object) &&
    'like' in object &&
    (object as ASTNodeType<T>).like === like
  )
}

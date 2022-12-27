import { AST, ASTBindableObjectType, ASTScopeType } from '~'

export function createBindableObject(
  data: Record<string, unknown>,
  parent?: ASTBindableObjectType,
): ASTBindableObjectType {
  return {
    callbackList: [],
    data,
    like: AST.BindableObject,
    parent,
  }
}

export function createScope(
  data: Record<string, unknown>,
  parent?: ASTScopeType,
): ASTScopeType {
  return {
    data,
    like: AST.Scope,
    parent,
  }
}

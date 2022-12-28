import { AST, ASTScopeType, api } from '~'

export function createScope(
  data: Record<string, unknown>,
  parent?: ASTScopeType,
): ASTScopeType {
  return {
    data,
    like: AST.Scope,
    parent,
    partial: false,
  }
}

export function getScopeProperty(
  scope: ASTScopeType,
  path: string | number | symbol,
): unknown {
  let source: ASTScopeType = scope

  while (source) {
    if (path in source.data) {
      break
    } else if (source.parent) {
      source = source.parent
    } else {
      return
    }
  }

  return (
    source.data as Record<string | symbol | number, unknown>
  )[path]
}

export function isScope(
  object: unknown,
): object is ASTScopeType {
  return (
    api.isObject(object) &&
    'like' in object &&
    (object as ASTScopeType).like === AST.Scope
  )
}

export function setScopeProperty(
  scope: ASTScopeType,
  property: string,
  value: unknown,
): void {
  if (property in scope) {
    scope.data[property] = value
  } else if (scope.parent) {
    api.setScopeProperty(scope.parent, property, value)
  } else {
    api.throwError(
      api.generateScopeMissingPropertyError(property),
    )
  }
}

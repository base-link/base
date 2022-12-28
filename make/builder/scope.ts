import { AST, Internal, api } from '~'
import type { InternalScopeType } from '~'

export function createScope(
  data: Record<string, unknown>,
  parent?: InternalScopeType,
): InternalScopeType {
  return {
    data,
    like: Internal.Scope,
    parent,
  }
}

export function getScopeProperty(
  scope: InternalScopeType,
  path: string | number | symbol,
): unknown {
  let source: InternalScopeType = scope

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
): object is InternalScopeType {
  return (
    api.isRecord(object) &&
    'like' in object &&
    (object as InternalScopeType).like === Internal.Scope
  )
}

export function setScopeProperty(
  scope: InternalScopeType,
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

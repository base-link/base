import {
  ASTMeshType,
  NestedPartial,
  Scope,
  ScopeKeyListType,
  ScopeTableType,
  ScopeType,
  ScopeValueType,
} from '~server/type'

export function extendScope<
  S extends Scope | unknown = unknown,
  P extends unknown | undefined = unknown,
>(
  like: S,
  data: S extends Scope
    ? ScopeTableType[S]
    : Record<string, unknown>,
  parent?: P extends ScopeType<infer T, infer Q>
    ? ScopeType<T, Q>
    : never,
): ScopeType<S, P> {
  return { data, like, parent }
}

export function getPropertyValueFromScope<S extends ScopeType>(
  scope: S,
  path: ScopeKeyListType<S>,
): unknown {
  let source: S | undefined = scope

  while (source) {
    if (source.data.hasOwnProperty(path)) {
      break
    } else {
      source = source.parent
    }
  }

  if (!source) {
    return
  }

  return source.data[path]
}

export function resolveScope<S extends ASTMeshType>(
  scope: NestedPartial<S>,
  check: (scope: NestedPartial<S>) => boolean,
  finalize: (scope: NestedPartial<S>) => void,
): void {
  if (check(scope)) {
    finalize(scope)
  }
}

export function setPropertyValueOnScope<
  S extends ScopeType,
  K extends ScopeKeyListType<S>,
>(scope: S, property: K, value: ScopeValueType<S, K>): void {
  if (property in scope.data) {
    scope.data[property] = value
  } else if (scope.parent) {
    setPropertyValueOnScope(scope.parent, property, value)
  } else {
    throw new Error(`Property not defined on scope`)
  }
}

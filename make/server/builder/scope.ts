import {
  ASTMeshType,
  NestedPartial,
  Scope,
  ScopeKeyListType,
  ScopeSetType,
  ScopeTableType,
  ScopeType,
  ScopeValueType,
} from '~server/type'

export function extendScope<
  S extends Scope,
  P extends unknown | undefined = unknown,
>(
  like: S,
  data: S extends Scope ? ScopeTableType[S] : unknown,
  parent?: P extends ScopeType<infer T extends Scope, infer Q>
    ? ScopeType<T, Q>
    : never,
): ScopeType<S, P> {
  return { data, like, parent }
}

export function getPropertyValueFromScope<
  L extends Scope,
  S extends ScopeType<L>,
  K extends ScopeKeyListType<L, S>,
>(scope: S, path: K): ScopeValueType<L, S, K> | undefined {
  let source: ScopeSetType<S> | undefined = scope

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
  L extends Scope,
  S extends ScopeType<L>,
  K extends ScopeKeyListType<L, S>,
>(scope: S, property: K, value: ScopeValueType<L, S, K>): void {
  if (property in scope.data) {
    scope.data[property] = value
  } else if (scope.parent) {
    setPropertyValueOnScope(scope.parent, property, value)
  } else {
    throw new Error(`Property not defined on scope`)
  }
}

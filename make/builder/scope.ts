import { api } from '~tool'
import {
  ParentScopeType,
  Scope,
  ScopeKeyListType,
  ScopeTableType,
  ScopeType,
  ScopeValueType,
} from '~type'

export function extendScope<
  S extends Scope,
  P extends unknown = unknown,
>(
  like: S,
  data: ScopeTableType[S],
  parent?: P extends ScopeType<infer T extends Scope, infer Q>
    ? P
    : never,
): ScopeType<S, P> {
  return { data, like, parent }
}

export function getPropertyValueFromScope(
  scope: ScopeType<Scope>,
  path: string | number | symbol,
): unknown | undefined {
  let source: ScopeType<Scope> | undefined = scope

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

export function isScope<T extends Scope>(
  object: unknown,
  like: T,
): object is ScopeType<T> {
  return (
    api.isObject(object) &&
    'like' in object &&
    (object as ScopeType<T>).like === like
  )
}

// export function setPropertyValueOnScope<
//   L extends Scope,
//   S extends ScopeType<L>,
//   K extends ScopeKeyListType<L, S>,
// >(scope: S, property: K, value: ScopeValueType<L, S, K>): void {
//   if (property in scope.data) {
//     scope.data[property] = value
//   } else if (scope.parent) {
//     setPropertyValueOnScope(scope.parent, property, value)
//   } else {
//     throw new Error(`Property not defined on scope`)
//   }
// }

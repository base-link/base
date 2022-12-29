import { Site, code } from '~'
import type { SiteScopeType } from '~'

export function createScope(
  data: Record<string, unknown>,
  parent?: SiteScopeType,
): SiteScopeType {
  return {
    data,
    like: Site.Scope,
    parent,
  }
}

export function getScopeProperty(
  scope: SiteScopeType,
  path: string | number | symbol,
): unknown {
  let source: SiteScopeType = scope

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
): object is SiteScopeType {
  return (
    code.isRecord(object) &&
    'like' in object &&
    (object as SiteScopeType).like === Site.Scope
  )
}

export function setScopeProperty(
  scope: SiteScopeType,
  property: string,
  value: unknown,
): void {
  if (property in scope) {
    scope.data[property] = value
  } else if (scope.parent) {
    code.setScopeProperty(scope.parent, property, value)
  } else {
    code.throwError(
      code.generateScopeMissingPropertyError(property),
    )
  }
}

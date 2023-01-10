import { code } from '~'
import type { SiteEnvironmentType } from '~'

export function createEnvironment(
  bindings: Record<string, unknown>,
  parent?: SiteEnvironmentType,
): SiteEnvironmentType {
  return {
    bindings,
    parent,
  }
}

export function environmentHasProperty(
  environment: SiteEnvironmentType,
  name: string | number | symbol,
): boolean {
  let source: SiteEnvironmentType = environment

  while (source) {
    if (name in source.bindings) {
      return true
    } else if (source.parent) {
      source = source.parent
    } else {
      return false
    }
  }

  return false
}

export function getEnvironmentProperty(
  environment: SiteEnvironmentType,
  name: string | number | symbol,
): unknown {
  let source: SiteEnvironmentType = environment

  while (source) {
    if (name in source.bindings) {
      return (
        source.bindings as Record<string | symbol | number, unknown>
      )[name]
    } else if (source.parent) {
      source = source.parent
    } else {
      return
    }
  }
}

export function setEnvironmentProperty(
  scope: SiteEnvironmentType,
  property: string,
  value: unknown,
): void {
  if (property in scope.bindings) {
    scope.bindings[property] = value
  } else if (scope.parent) {
    code.setEnvironmentProperty(scope.parent, property, value)
  } else {
    code.throwError(
      code.generateEnvironmentMissingPropertyError(property),
    )
  }
}

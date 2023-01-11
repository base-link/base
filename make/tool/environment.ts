import { SiteProcessInputType, code } from '~'
import type { SiteEnvironmentType } from '~'

export function assertEnvironment(
  object: unknown,
): asserts object is SiteEnvironmentType {
  if (!code.isEnvironment(object)) {
    code.throwError(
      code.generateObjectNotTypeError(object, ['environment']),
    )
  }
}

export function createEnvironment(
  bindings: Record<string, unknown>,
  parent?: SiteEnvironmentType,
): SiteEnvironmentType {
  return {
    bindings,
    isEnv: true,
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

export function isEnvironment(
  object: unknown,
): object is SiteEnvironmentType {
  return (object as SiteEnvironmentType).isEnv === true
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

export function withEnvironment(
  input: SiteProcessInputType,
  bindings: Record<string, unknown>,
): SiteProcessInputType {
  return {
    ...input,
    environment: code.createEnvironment(bindings, input.environment),
  }
}

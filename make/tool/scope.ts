import {
  Site,
  SiteContainerScopeType,
  SiteEnvironmentType,
  SiteStepScopeType,
  SiteVariableDeclarationType,
  code,
} from '~'

export const DEFAULT_CONTAINER_SCOPE = {
  base: { like: 'base' },
  path: { like: 'string' },
  text: { like: 'string' },
}

export function createContainerScope(
  declarations: Record<string, SiteVariableDeclarationType>,
  parent?: SiteContainerScopeType,
): SiteContainerScopeType {
  return {
    declarations,
    like: Site.ContainerScope,
    parent,
    steps: [],
  }
}

export function createEnvironment(
  bindings: Record<string, unknown>,
  parent?: SiteEnvironmentType,
): SiteEnvironmentType {
  return {
    bindings,
    parent,
  }
}

export function createStepScope(
  container: SiteContainerScopeType,
  declarations: Record<string, SiteVariableDeclarationType> = {},
): SiteStepScopeType {
  const previous = container.steps[container.steps.length - 1]
  const step: SiteStepScopeType = {
    container,
    declarations,
    like: Site.StepScope,
    previous,
  }
  container.steps.push(step)
  return step
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

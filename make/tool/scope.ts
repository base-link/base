import {
  Site,
  SiteContainerScopeType,
  SiteEnvironmentType,
  SiteStepScopeType,
  SiteVariableDeclarationType,
  code,
} from '~'

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
  declarations: Record<
    string,
    SiteVariableDeclarationType
  > = {},
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

export function getEnvironmentProperty(
  scope: SiteEnvironmentType,
  path: string | number | symbol,
): unknown {
  let source: SiteEnvironmentType = scope

  while (source) {
    if (path in source.bindings) {
      break
    } else if (source.parent) {
      source = source.parent
    } else {
      return
    }
  }

  return (
    source.bindings as Record<string | symbol | number, unknown>
  )[path]
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

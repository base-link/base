import {
  MeshInputType,
  SiteDependencyType,
  SiteEnvironmentType,
  SiteScopeType,
  code,
} from '~'

export function checkDependency(
  input: MeshInputType,
  dependency: SiteDependencyType,
): boolean {
  const environment = code.findInitialEnvironment(
    input,
    dependency,
  )

  if (!environment) {
    return false
  }

  let value: Record<string, unknown> = environment.bindings

  let i = 0
  while (i < dependency.path.length) {
    const part = dependency.path[i]

    if (part && code.isRecord(value) && part.name in value) {
      const childValue = value[part.name]

      if (i === dependency.path.length - 1) {
        return true
      } else if (code.isRecord(childValue)) {
        value = childValue
      } else {
        return false
      }
    } else {
      return false
    }

    i++
  }

  return false
}

export function findInitialEnvironment(
  input: MeshInputType,
  dependency: SiteDependencyType,
): SiteEnvironmentType | undefined {
  let environment: SiteEnvironmentType = input.environment

  const part = dependency.path[0]
  if (!part) {
    return
  }

  while (environment) {
    if (part.name in environment.bindings) {
      return environment
    } else if (environment.parent) {
      environment = environment.parent
    } else {
      return
    }
  }
}

import {
  MeshInputType,
  SiteDependencyType,
  SiteScopeType,
  code,
} from '~'

export function checkDependency(
  input: MeshInputType,
  dependency: SiteDependencyType,
): boolean {
  const scope = code.findInitialScope(input, dependency)

  if (!scope) {
    return false
  }

  let value: Record<string, unknown> = scope.data

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

export function findInitialScope(
  input: MeshInputType,
  dependency: SiteDependencyType,
): SiteScopeType | undefined {
  let scope: SiteScopeType = input.lexicalScope

  const part = dependency.path[0]
  if (!part) {
    return
  }

  while (scope) {
    if (part.name in scope.data) {
      return scope
    } else if (scope.parent) {
      scope = scope.parent
    } else {
      return
    }
  }
}

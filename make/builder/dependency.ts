import {
  APIInputType,
  InternalDependencyType,
  InternalScopeType,
  api,
} from '~'

export function checkDependency(
  input: APIInputType,
  dependency: InternalDependencyType,
): boolean {
  const scope = api.findInitialScope(input, dependency)

  if (!scope) {
    return false
  }

  let value: Record<string, unknown> = scope.data

  let i = 0
  while (i < dependency.path.length) {
    const part = dependency.path[i]

    if (part && api.isRecord(value) && part.name in value) {
      const childValue = value[part.name]

      if (i === dependency.path.length - 1) {
        return true
      } else if (api.isRecord(childValue)) {
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
  input: APIInputType,
  dependency: InternalDependencyType,
): InternalScopeType | undefined {
  let scope: InternalScopeType = input.lexicalScope

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

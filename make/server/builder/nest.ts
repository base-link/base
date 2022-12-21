import { Scope, ScopeType, api } from '~server'

export function determineNestType(
  scope: ScopeType<Scope.Nest>,
): string {
  if (api.nestIsTerm(scope)) {
    if (api.termIsInterpolated(scope)) {
      return `dynamic-term`
    } else {
      return `static-term`
    }
  } else if (api.nestIsText(scope)) {
    if (api.textIsInterpolated(scope)) {
      return `dynamic-text`
    } else {
      return `static-text`
    }
  } else if (api.nestIsMark(scope)) {
    return `mark`
  } else if (api.nestIsCode(scope)) {
    return `code`
  } else {
    api.throwError(
      api.generateUnhandledNestCaseBaseError(scope),
    )
  }

  return ''
}

export function nestIsCode(
  scope: ScopeType<Scope.Nest>,
): boolean {
  const nest = scope.data.nest

  if (nest.line.length > 1) {
    return false
  }

  if (nest.line.length === 0) {
    return false
  }

  let line = nest.line[0]
  if (line && line.like === 'code') {
    return true
  }

  return false
}

export function nestIsMark(
  scope: ScopeType<Scope.Nest>,
): boolean {
  const nest = scope.data.nest

  if (nest.line.length > 1) {
    return false
  }

  if (nest.line.length === 0) {
    return false
  }

  let line = nest.line[0]
  if (line && line.like === 'mark') {
    return true
  }

  return false
}

export function nestIsTerm(
  scope: ScopeType<Scope.Nest>,
): boolean {
  const nest = scope.data.nest

  if (nest.line.length > 1) {
    return false
  }

  if (nest.line.length === 0) {
    return false
  }

  let line = nest.line[0]
  if (!line) {
    return false
  }

  if (line.like !== 'term') {
    return false
  }

  if (line.link.length !== 1) {
    return false
  }

  let link = line.link[0]
  if (link && link.like === 'cord') {
    return true
  }

  return false
}

export function nestIsText(
  scope: ScopeType<Scope.Nest>,
): boolean {
  const nest = scope.data.nest

  if (nest.line.length > 1) {
    return false
  }

  if (nest.line.length === 0) {
    return false
  }

  let line = nest.line[0]
  if (line && line.like === 'text') {
    return true
  }

  return false
}

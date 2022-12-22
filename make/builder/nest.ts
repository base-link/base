import { ParserNestNodeType } from '~parser'

import { Nest, Scope, ScopeType, api } from '~tool'

export function assertNestChildrenLength(
  scope: ScopeType<Scope.Nest>,
  length: number,
): void {
  if (scope.data.nest.nest.length !== length) {
    api.throwError(
      api.generateInvalidNestChildrenLengthError(scope, length),
    )
  }
}

export function determineNestType(
  scope: ScopeType<Scope.Nest>,
): Nest {
  if (api.nestIsTerm(scope)) {
    if (api.termIsInterpolated(scope)) {
      return Nest.DynamicTerm
    } else {
      return Nest.StaticTerm
    }
  } else if (api.nestIsText(scope)) {
    if (api.textIsInterpolated(scope)) {
      return Nest.DynamicText
    } else {
      return Nest.StaticText
    }
  } else if (api.nestIsMark(scope)) {
    return Nest.Mark
  } else if (api.nestIsCode(scope)) {
    return Nest.Code
  } else {
    api.throwError(
      api.generateUnhandledNestCaseBaseError(scope),
    )
  }

  return Nest.Empty
}

export function extendNest(
  scope: ScopeType<Scope>,
  nest: ParserNestNodeType,
  index: number,
): ScopeType<Scope.Nest> {
  return api.extendScope<Scope.Nest, typeof scope>(
    Scope.Nest,
    { index, nest },
    scope,
  )
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

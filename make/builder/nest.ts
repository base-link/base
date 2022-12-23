import {
  Nest,
  NestInputType,
  Scope,
  ScopeType,
  Tree,
  TreeNestType,
  api,
} from '~'

export function assertNest(
  object: unknown,
): asserts object is TreeNestType {
  if (!api.isNest(object)) {
    api.throwError(undefined)
  }
}

export function assertNestChildrenLength(
  input: NestInputType,
  length: number,
): void {
  if (input.nest.nest.length !== length) {
    api.throwError(
      api.generateInvalidNestChildrenLengthError(input, length),
    )
  }
}

export function determineNestType(input: NestInputType): Nest {
  if (api.nestIsTerm(input)) {
    if (api.termIsInterpolated(input)) {
      return Nest.DynamicTerm
    } else {
      return Nest.StaticTerm
    }
  } else if (api.nestIsText(input)) {
    if (api.textIsInterpolated(input)) {
      return Nest.DynamicText
    } else {
      return Nest.StaticText
    }
  } else if (api.nestIsMark(input)) {
    return Nest.Mark
  } else if (api.nestIsCode(input)) {
    return Nest.Code
  } else {
    api.throwError(
      api.generateUnhandledNestCaseBaseError(input),
    )
  }

  return Nest.Empty
}

export function isNest(
  object: unknown,
): object is TreeNestType {
  return (
    api.isObject(object) &&
    'like' in object &&
    (object as TreeNestType).like === Tree.Nest
  )
}

export function nestIsCode(input: NestInputType): boolean {
  const nest = input.nest

  if (nest.line.length > 1) {
    return false
  }

  if (nest.line.length === 0) {
    return false
  }

  let line = nest.line[0]
  if (line && line.like === Tree.Code) {
    return true
  }

  return false
}

export function nestIsMark(input: NestInputType): boolean {
  const nest = input.nest

  if (nest.line.length > 1) {
    return false
  }

  if (nest.line.length === 0) {
    return false
  }

  let line = nest.line[0]
  if (line && line.like === Tree.Mark) {
    return true
  }

  return false
}

export function nestIsTerm(input: NestInputType): boolean {
  const nest = input.nest

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

  if (line.like !== Tree.Term) {
    return false
  }

  if (line.link.length !== 1) {
    return false
  }

  let link = line.link[0]
  if (link && link.like === Tree.Cord) {
    return true
  }

  return false
}

export function nestIsText(input: NestInputType): boolean {
  const nest = input.nest

  if (nest.line.length > 1) {
    return false
  }

  if (nest.line.length === 0) {
    return false
  }

  let line = nest.line[0]
  if (line && line.like === Tree.Text) {
    return true
  }

  return false
}

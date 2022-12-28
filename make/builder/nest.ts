import { Nest, Tree, api } from '~'
import type {
  APIInputType,
  InternalScopeType,
  TreeNestType,
} from '~'

export function assertNest(
  object: unknown,
): asserts object is TreeNestType {
  if (!api.isNest(object)) {
    throw new Error('Nest error')
  }
}

export function assertNestChildrenLength(
  input: APIInputType,
  length: number,
): void {
  const nest = api.assumeNest(input)
  if (nest.nest.length !== length) {
    api.throwError(
      api.generateInvalidNestChildrenLengthError(input, length),
    )
  }
}

export function assertScope(
  object: unknown,
): asserts object is InternalScopeType {
  if (!api.isScope(object)) {
    api.throwError({
      code: `0015`,
      note: `Object is not type`,
    })
  }
}

export function assumeNest(
  input: APIInputType,
  rank = 0,
): TreeNestType {
  const nest = api.getNestScopeProperty(input, 'nest', rank)
  api.assertNest(nest)
  return nest
}

export function assumeNestIndex(input: APIInputType): number {
  const index = api.getNestScopeProperty(input, 'index')
  api.assertNumber(index)
  return index
}

export function determineNestType(input: APIInputType): Nest {
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

export function getNestScopeProperty(
  input: APIInputType,
  property: string,
  rank = 0,
): unknown {
  let scope = input.nestScope
  while (rank > 0 && scope) {
    scope = scope.parent
  }
  api.assertScope(scope)
  return api.getProperty(scope.data, property)
}

export function isNest(
  object: unknown,
): object is TreeNestType {
  return (
    api.isRecord(object) &&
    'like' in object &&
    (object as TreeNestType).like === Tree.Nest
  )
}

export function nestIsCode(input: APIInputType): boolean {
  const nest = api.assumeNest(input)

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

export function nestIsMark(input: APIInputType): boolean {
  const nest = api.assumeNest(input)

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

export function nestIsTerm(input: APIInputType): boolean {
  const nest = api.assumeNest(input)

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

export function nestIsText(input: APIInputType): boolean {
  const nest = api.assumeNest(input)

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

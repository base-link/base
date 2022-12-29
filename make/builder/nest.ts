import { MeshHint, Site, Tree, code } from '~'
import type {
  MeshInputType,
  SiteScopeType,
  TreeNestType,
} from '~'

export function assertNest(
  object: unknown,
): asserts object is TreeNestType {
  if (!code.isNest(object)) {
    throw new Error('MeshHint error')
  }
}

export function assertNestChildrenLength(
  input: MeshInputType,
  length: number,
): void {
  const nest = code.assumeNest(input)
  if (nest.nest.length !== length) {
    code.throwError(
      code.generateInvalidNestChildrenLengthError(
        input,
        length,
      ),
    )
  }
}

export function assertScope(
  object: unknown,
): asserts object is SiteScopeType {
  if (!code.isScope(object)) {
    code.throwError(
      code.generateObjectNotTypeError(object, [Site.Scope]),
    )
  }
}

export function assumeNest(
  input: MeshInputType,
  rank = 0,
): TreeNestType {
  const nest = code.getNestScopeProperty(input, 'nest', rank)
  code.assertNest(nest)
  return nest
}

export function assumeNestIndex(input: MeshInputType): number {
  const index = code.getNestScopeProperty(input, 'index')
  code.assertNumber(index)
  return index
}

export function determineNestType(
  input: MeshInputType,
): MeshHint {
  if (code.nestIsTerm(input)) {
    if (
      code.termIsInterpolated(input) ||
      code.termIsNested(input)
    ) {
      return MeshHint.DynamicTerm
    } else {
      return MeshHint.StaticTerm
    }
  } else if (code.nestIsText(input)) {
    if (code.textIsInterpolated(input)) {
      return MeshHint.DynamicText
    } else {
      return MeshHint.StaticText
    }
  } else if (code.nestIsMark(input)) {
    return MeshHint.Mark
  } else if (code.nestIsCode(input)) {
    return MeshHint.Code
  } else {
    code.throwError(
      code.generateUnhandledNestCaseBaseError(input),
    )
  }

  return MeshHint.Empty
}

export function getNestScopeProperty(
  input: MeshInputType,
  property: string,
  rank = 0,
): unknown {
  let scope = input.nestScope
  while (rank > 0 && scope) {
    scope = scope.parent
    rank--
  }
  code.assertScope(scope)
  return code.getProperty(scope.data, property)
}

export function isNest(
  object: unknown,
): object is TreeNestType {
  return (
    code.isRecord(object) &&
    'like' in object &&
    (object as TreeNestType).like === Tree.MeshHint
  )
}

export function nestIsCode(input: MeshInputType): boolean {
  const nest = code.assumeNest(input)

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

export function nestIsMark(input: MeshInputType): boolean {
  const nest = code.assumeNest(input)

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

export function nestIsTerm(input: MeshInputType): boolean {
  const nest = code.assumeNest(input)

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

  return true
}

export function nestIsText(input: MeshInputType): boolean {
  const nest = code.assumeNest(input)

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

import {
  isBoolean as isNativeBoolean,
  isNumber as isNativeNumber,
  isString as isNativeString,
  isObject,
} from 'lodash'

import {
  APIInputType,
  AST,
  ASTModuleBaseType,
  ASTType,
  ErrorType,
  Tree,
  TreeNodeType,
  TreeType,
  api,
} from '~'

export function assertBoolean(
  object: unknown,
): asserts object is boolean {
  if (!api.isBoolean(object)) {
    api.throwError({
      code: '0017',
      note: `Object is not type 'boolean'`,
    })
  }
}

export function assertString(
  object: unknown,
  error?: () => ErrorType,
): asserts object is string {
  if (!api.isString(object)) {
    api.throwError(
      error ? error() : api.generateMissingStringError(object),
    )
  }
}

export function assumeInputObjectAsASTPartialType<
  T extends AST,
>(input: APIInputType, type: T, rank = 0): ASTType<T> {
  let objectScope = input.objectScope
  while (rank > 0 && objectScope.parent) {
    objectScope = objectScope.parent
    rank--
  }
  api.assertASTPartial(objectScope.data, type)
  return objectScope.data
}

export function assumeInputObjectAsASTType<T extends AST>(
  input: APIInputType,
  type: T,
  rank = 0,
): ASTType<T> {
  let objectScope = input.objectScope
  while (rank > 0 && objectScope.parent) {
    objectScope = objectScope.parent
    rank--
  }
  api.assertAST(objectScope.data, type)
  return objectScope.data
}

export function assumeInputObjectAsTreeType<T extends Tree>(
  type: T,
  input: APIInputType,
  rank = 0,
): TreeType<T> {
  let objectScope = input.objectScope
  while (rank > 0 && objectScope.parent) {
    objectScope = objectScope.parent
    rank--
  }
  api.assertTreeType(objectScope.data, type)
  return objectScope.data
}

export function createInitialAPIInput<
  T extends ASTModuleBaseType,
>(
  card: T,
  objectScopeData: Record<string, unknown>,
  lexicalScopeData: Record<string, unknown>,
): APIInputType {
  return {
    card,
    lexicalScope: api.createScope(lexicalScopeData),
    objectScope: api.createScope(objectScopeData),
  }
}

export function extendWithNestScope(
  input: APIInputType,
  data: Record<string, unknown>,
): APIInputType {
  return {
    ...input,
    nestScope: api.createScope(data),
  }
}

export function extendWithObjectScope(
  input: APIInputType,
  data: Record<string, unknown>,
): APIInputType {
  return {
    ...input,
    objectScope: api.createScope(data, input.objectScope),
  }
}

export function isBoolean(object: unknown): object is boolean {
  return api.isNativeBoolean(object)
}

export {
  isNativeBoolean,
  isNativeNumber,
  isNativeString,
  isObject,
}

export function isRecord(
  object: unknown,
): object is Record<string, unknown> {
  return api.isObject(object)
}

export function isString(object: unknown): object is string {
  return api.isNativeString(object)
}

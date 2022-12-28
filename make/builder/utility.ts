import _ from 'lodash'

import { AST, Tree, api } from '~'
import type {
  APIInputType,
  ASTModuleBaseType,
  ASTPartialType,
  ASTType,
  ErrorType,
  TreeType,
} from '~'

export function assertArray<T = unknown>(
  object: unknown,
): asserts object is Array<T> {
  if (!api.isArray(object)) {
    throw new Error('Object is not array')
  }
}

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

export function assertNumber(
  object: unknown,
): asserts object is number {
  if (!api.isNumber(object)) {
    api.throwError({
      code: '0016',
      note: 'Compiler error',
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

export function assertTrue(
  object: unknown,
): asserts object is true {
  if (object !== true) {
    api.throwError({
      code: '0017',
      note: `Object is not type 'true'`,
    })
  }
}

export function assumeInputObjectAsASTPartialType<
  T extends AST,
>(
  input: APIInputType,
  type: T | Array<T>,
  rank = 0,
): ASTPartialType<T> {
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

export function assumeInputObjectAsGenericASTType(
  input: APIInputType,
  rank = 0,
): Record<string, unknown> {
  let objectScope = input.objectScope
  while (rank > 0 && objectScope.parent) {
    objectScope = objectScope.parent
    rank--
  }
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
    nestScope: api.createScope(data, input.nestScope),
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

export function isArray<T = unknown>(
  object: unknown,
): object is Array<T> {
  return _.isArray(object)
}

export function isBoolean(object: unknown): object is boolean {
  return _.isBoolean(object)
}

export function isNumber(object: unknown): object is number {
  return _.isNumber(object)
}

export function isRecord(
  object: unknown,
): object is Record<string, unknown> {
  return _.isObject(object)
}

export function isString(object: unknown): object is string {
  return _.isString(object)
}

export const omit = _.omit

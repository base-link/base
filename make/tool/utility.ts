import _ from 'lodash'

import { Link, Mesh, code } from '~'
import type {
  LinkType,
  MeshInputType,
  MeshModuleBaseType,
  MeshPartialType,
  MeshType,
} from '~'

export function assertArray<T = unknown>(
  object: unknown,
): asserts object is Array<T> {
  if (!code.isArray(object)) {
    throw new Error('Object is not array')
  }
}

export function assertBoolean(
  object: unknown,
): asserts object is boolean {
  if (!code.isBoolean(object)) {
    code.throwError({
      code: '0017',
      note: `Object is not type 'boolean'`,
    })
  }
}

export function assertNumber(
  object: unknown,
): asserts object is number {
  if (!code.isNumber(object)) {
    code.throwError({
      code: '0016',
      note: 'Compiler error',
    })
  }
}

export function assertString(
  object: unknown,
  name?: string,
): asserts object is string {
  if (!code.isString(object)) {
    code.throwError(
      code.generateIncorrectlyTypedVariable('string', name),
    )
  }
}

export function assumeInputObjectAsGenericMeshType(
  input: MeshInputType,
  rank = 0,
): Record<string, unknown> {
  let objectScope = input.objectScope
  while (rank > 0 && objectScope.parent) {
    objectScope = objectScope.parent
    rank--
  }
  return objectScope.data
}

export function assumeInputObjectAsLinkType<T extends Link>(
  type: T,
  input: MeshInputType,
  rank = 0,
): LinkType<T> {
  let objectScope = input.objectScope
  while (rank > 0 && objectScope.parent) {
    objectScope = objectScope.parent
    rank--
  }
  code.assertLinkType(objectScope.data, type)
  return objectScope.data
}

export function assumeInputObjectAsMeshPartialType<
  T extends Mesh,
>(
  input: MeshInputType,
  type: T | Array<T>,
  rank = 0,
): MeshPartialType<T> {
  let objectScope = input.objectScope
  while (rank > 0 && objectScope.parent) {
    objectScope = objectScope.parent
    rank--
  }
  code.assertMeshPartialType(objectScope.data, type)
  return objectScope.data
}

export function assumeInputObjectAsMeshType<T extends Mesh>(
  input: MeshInputType,
  type: T,
  rank = 0,
): MeshType<T> {
  let objectScope = input.objectScope
  while (rank > 0 && objectScope.parent) {
    objectScope = objectScope.parent
    rank--
  }
  code.assertMeshType(objectScope.data, type)
  return objectScope.data
}

export function createInitialMeshInput<
  T extends MeshModuleBaseType,
>(
  card: T,
  objectScopeData: Record<string, unknown>,
  lexicalScopeData: Record<string, unknown>,
): MeshInputType {
  return {
    card,
    lexicalScope: code.createScope(lexicalScopeData),
    objectScope: code.createScope(objectScopeData),
  }
}

export function extendWithNestScope(
  input: MeshInputType,
  data: Record<string, unknown>,
): MeshInputType {
  return {
    ...input,
    nestScope: code.createScope(data, input.nestScope),
  }
}

export function extendWithObjectScope(
  input: MeshInputType,
  data: Record<string, unknown>,
): MeshInputType {
  return {
    ...input,
    objectScope: code.createScope(data, input.objectScope),
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

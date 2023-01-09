import _ from 'lodash'

import { Link, Mesh, Nest, NestType, code } from '~'
import type { LinkType, MeshType, SiteProcessInputType } from '~'

export function assertArray<T = unknown>(
  object: unknown,
): asserts object is Array<T> {
  if (!code.isArray(object)) {
    code.throwError(code.generateIncorrectlyTypedVariable('array'))
  }
}

export function assertBoolean(
  object: unknown,
): asserts object is boolean {
  if (!code.isBoolean(object)) {
    code.throwError(code.generateIncorrectlyTypedVariable('boolean'))
  }
}

export function assertNumber(
  object: unknown,
): asserts object is number {
  if (!code.isNumber(object)) {
    code.throwError(code.generateIncorrectlyTypedVariable('number'))
  }
}

export function assertRecord(
  object: unknown,
): asserts object is Record<string, unknown> {
  if (!code.isRecord(object)) {
    code.throwError(code.generateIncorrectlyTypedVariable('record'))
  }
}

export function assertString(
  object: unknown,
  name?: string,
  path?: string,
): asserts object is string {
  if (!code.isString(object)) {
    code.throwError(
      code.generateIncorrectlyTypedVariable('string', name, path),
    )
  }
}

export function assumeElementAsGenericMesh(
  input: SiteProcessInputType,
  rank = 0,
): Record<string, unknown> {
  let branch = input.element
  while (rank > 0 && branch && branch.parent) {
    branch = branch.parent
    rank--
  }
  code.assertGenericMesh(branch?.node)
  return branch?.node
}

// export function assumeElementAsGenericMeshPartialType<
//   T extends Mesh,
// >(input: SiteProcessInputType, type: T, rank = 0): MeshPartialType<T> {
//   let branch = input.branch
//   while (rank > 0 && branch && branch.parent) {
//     branch = branch.parent
//     rank--
//   }
//   code.assertGenericMeshPartialType(branch?.element, type)
//   return branch?.element
// }
export function assumeElementAsGenericNest(
  input: SiteProcessInputType,
  rank = 0,
): Record<string, unknown> {
  let branch = input.element
  while (rank > 0 && branch && branch.parent) {
    branch = branch.parent
    rank--
  }
  code.assertGenericNest(branch?.node)
  return branch?.node
}

export function assumeElementAsLink<T extends Link>(
  type: T,
  input: SiteProcessInputType,
  rank = 0,
): LinkType<T> {
  let branch = input.element
  while (rank > 0 && branch && branch.parent) {
    branch = branch.parent
    rank--
  }
  code.assertLink(branch?.node, type)
  return branch?.node
}

export function assumeElementAsMesh<T extends Mesh>(
  input: SiteProcessInputType,
  type: T,
  rank = 0,
): MeshType<T> {
  let branch = input.element
  while (rank > 0 && branch && branch.parent) {
    branch = branch.parent
    rank--
  }
  code.assertMesh(branch?.node, type)
  return branch?.node
}

export function assumeElementAsNest<T extends Nest>(
  input: SiteProcessInputType,
  type: T,
  rank = 0,
): NestType<T> {
  let branch = input.element
  while (rank > 0 && branch && branch.parent) {
    branch = branch.parent
    rank--
  }
  code.assertNest(branch?.node, type)
  return branch?.node
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

export const keyBy = _.keyBy
export const omit = _.omit

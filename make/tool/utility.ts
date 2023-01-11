import _ from 'lodash'

import {
  Base,
  Link,
  Mesh,
  MeshNodeType,
  Nest,
  SiteElementType,
  code,
} from '~'
import type {
  LinkType,
  MeshType,
  NestType,
  SiteProcessInputType,
} from '~'

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
): MeshType<Mesh> {
  let branch: SiteElementType | undefined = input.element
  while (rank > 0) {
    branch = branch?.parent
    rank--
  }
  const node = branch?.node
  code.assertGenericMesh(node)
  return node
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

export function isBase(object: unknown): object is Base {
  return _.isObject(object)
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

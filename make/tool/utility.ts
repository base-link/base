import _ from 'lodash'

import { Link, MESH_TYPE, Mesh, code } from '~'
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

// export function assumeBranchAsGenericMeshPartialType<
//   T extends Mesh,
// >(input: MeshInputType, type: T, rank = 0): MeshPartialType<T> {
//   let branch = input.branch
//   while (rank > 0 && branch && branch.parent) {
//     branch = branch.parent
//     rank--
//   }
//   code.assertGenericMeshPartialType(branch?.element, type)
//   return branch?.element
// }

export function assumeBranchAsGenericMeshType(
  input: MeshInputType,
  rank = 0,
): Record<string, unknown> {
  let branch = input.branch
  while (rank > 0 && branch && branch.parent) {
    branch = branch.parent
    rank--
  }
  code.assertGenericMeshType(branch?.element)
  return branch?.element
}

export function assumeBranchAsLinkType<T extends Link>(
  type: T,
  input: MeshInputType,
  rank = 0,
): LinkType<T> {
  let branch = input.branch
  while (rank > 0 && branch && branch.parent) {
    branch = branch.parent
    rank--
  }
  code.assertLinkType(branch?.element, type)
  return branch?.element
}

export function assumeBranchAsMeshPartialType<T extends Mesh>(
  input: MeshInputType,
  type: T | Array<T>,
  rank = 0,
): MeshPartialType<T> {
  let branch = input.branch
  while (rank > 0 && branch && branch.parent) {
    branch = branch.parent
    rank--
  }
  code.assertMeshPartialType(branch?.element, type)
  return branch?.element
}

export function assumeBranchAsMeshType<T extends Mesh>(
  input: MeshInputType,
  type: T,
  rank = 0,
): MeshType<T> {
  let branch = input.branch
  while (rank > 0 && branch && branch.parent) {
    branch = branch.parent
    rank--
  }
  code.assertMeshType(branch?.element, type)
  return branch?.element
}

export function isArray<T = unknown>(
  object: unknown,
): object is Array<T> {
  return _.isArray(object)
}

export function isBoolean(object: unknown): object is boolean {
  return _.isBoolean(object)
}

export function isGenericMeshPartialType(
  object: unknown,
): object is MeshType<Mesh> {
  return (
    code.isRecord(object) &&
    'like' in object &&
    MESH_TYPE.includes((object as MeshType<Mesh>).like) &&
    (object as MeshType<Mesh>).partial === true
  )
}

export function isGenericMeshType(
  object: unknown,
): object is MeshType<Mesh> {
  return (
    code.isRecord(object) &&
    'like' in object &&
    MESH_TYPE.includes((object as MeshType<Mesh>).like)
  )
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

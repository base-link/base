import _ from 'lodash'

import { Mesh, SiteLinkType, code } from '~'
import type { LinkTreeType, RedType, SiteProcessInputType } from '~'

export function assertRecord(
  object: unknown,
): asserts object is Record<string, unknown> {
  if (!code.isRecord(object)) {
    code.throwError(code.generateIncorrectlyTypedVariable('record'))
  }
}

export function getNestedProperty(
  object: Record<string, unknown>,
  path: Array<string>,
): unknown {
  let value: unknown = object
  path.forEach(part => {
    if (code.isRecord(value)) {
      value = value[part]
    } else {
      value = undefined
    }
  })
  return value
}

export function getProperty(
  object: Record<string, unknown>,
  path: string,
): unknown {
  if (code.isRecord(object) && path in object) {
    return object[path]
  }
}

export function getWithObjectDefault(
  obj: Record<string, unknown>,
  name: string,
): Record<string, unknown> {
  let value = obj[name]

  if (!code.isRecord(value)) {
    value = obj[name] = {}
  }

  code.assertRecord(value)
  return value
}

export function insertIntoRed(
  input: SiteProcessInputType,
  value: RedType,
): void {
  const red = input.red.node
  code.assertRed(red, Mesh.Gather)
  red.children.push(value)
}

export function isObjectWithType(object: unknown): boolean {
  return code.isRecord(object) && 'type' in object
}

export function isRecord(
  object: unknown,
): object is Record<string, unknown> {
  return _.isObject(object)
}

export const mergeObjects = _.merge

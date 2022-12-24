import { isNumber, isObject, isString } from 'lodash'

import { api } from '~'

export const isNativeNumber = isNumber

export const isNativeString = isString

export { isObject }

export function isRecord(
  object: unknown,
): object is Record<string, unknown> {
  return api.isObject(object)
}

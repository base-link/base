import {
  isNumber as isNativeNumber,
  isString as isNativeString,
  isObject,
} from 'lodash'

import { ErrorType, api } from '~'

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

export { isNativeNumber, isNativeString, isObject }

export function isRecord(
  object: unknown,
): object is Record<string, unknown> {
  return api.isObject(object)
}

export function isString(object: unknown): object is string {
  return api.isNativeString(object)
}

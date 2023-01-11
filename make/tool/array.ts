import _ from 'lodash'

import { code } from '~'

export function assertArray<T = unknown>(
  object: unknown,
): asserts object is Array<T> {
  if (!code.isArray(object)) {
    code.throwError(code.generateIncorrectlyTypedVariable('array'))
  }
}

export function isArray<T = unknown>(
  object: unknown,
): object is Array<T> {
  return _.isArray(object)
}

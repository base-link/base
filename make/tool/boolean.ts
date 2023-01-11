import _ from 'lodash'

import { code } from '~'

export function assertBoolean(
  object: unknown,
): asserts object is boolean {
  if (!code.isBoolean(object)) {
    code.throwError(code.generateIncorrectlyTypedVariable('boolean'))
  }
}

export function isBoolean(object: unknown): object is boolean {
  return _.isBoolean(object)
}

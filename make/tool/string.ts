import _ from 'lodash'

import { code } from '~'

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

export function isString(object: unknown): object is string {
  return _.isString(object)
}

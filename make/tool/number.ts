import _ from 'lodash'

export function assertNumber(
  object: unknown,
): asserts object is number {
  if (!code.isNumber(object)) {
    code.throwError(code.generateIncorrectlyTypedVariable('number'))
  }
}

export function isNumber(object: unknown): object is number {
  return _.isNumber(object)
}

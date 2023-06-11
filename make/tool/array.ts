import _ from 'lodash'

export function assertArray<T = unknown>(
  object: unknown,
  name?: string,
  path?: string,
): asserts object is Array<T> {
  if (!code.isArray(object)) {
    code.throwError(
      code.generateIncorrectlyTypedVariable('array', name, path),
    )
  }
}

export function isArray<T = unknown>(
  object: unknown,
): object is Array<T> {
  return _.isArray(object)
}

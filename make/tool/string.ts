import _ from 'lodash'

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

export function assertStringPattern(
  input: SiteProcessInputType,
  string: string,
  pattern: RegExp,
): void {
  if (!string.match(pattern)) {
    // code.throwError(code.generateInvalidPatternError(input, pattern))
  }
}

export function isString(object: unknown): object is string {
  return _.isString(object)
}

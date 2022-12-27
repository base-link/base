import { APIInputType, AST, ERROR, api } from '~'

export type ErrorConfigType = {
  code: string
  hint?: string
  note: (props: Record<string, unknown>) => string
  text?: string
}

export type ErrorInputType = Record<string, unknown>

export type ErrorType = {
  code: string
  file?: string
  hint?: string
  note: string
  text?: string
}

export function assertError(
  error: unknown,
): asserts error is ErrorConfigType {
  if (!api.isError(error)) {
    throw new Error('Error handler undefined')
  }
}

export function errorReducer(
  m: Record<string, ErrorConfigType>,
  x: ErrorConfigType,
) {
  return {
    ...m,
    [x.code]: {
      isError: true,
      ...x,
    },
  }
}

export function generateForkMissingPropertyError(
  property: string,
): ErrorType {
  return {
    code: `0010`,
    note: `Scope is missing property '${property}'.`,
  }
}

export function generateInvalidDeckLink(
  input: APIInputType,
  link: string,
): ErrorType {
  return {
    code: `0008`,
    note: `Invalid deck link '${link}'.`,
  }
}

export function generateInvalidNestChildrenLengthError(
  input: APIInputType,
  length: number,
): ErrorType {
  return {
    code: `0009`,
    note: `Term doesn't have ${length} children.`,
  }
}

export function generateInvalidPatternError(
  input: APIInputType,
  pattern: unknown,
  name: string,
): ErrorType {
  const { card } = input
  return {
    code: `0012`,
    file: `${card.path}`,
    note: `Invalid pattern ${pattern} for ${name}.`,
    text: '',
  }
}

export function generateMissingStringError(
  object: unknown,
): ErrorType {
  return {
    code: `0011`,
    note: `Object ${object} is not a string.`,
  }
}

export function generateObjectNotASTNodeError(
  like: AST,
): ErrorType {
  return {
    code: `0007`,
    note: `Object isn't AST node '${like}'.`,
  }
}

export function generateTermMissingChildError(): void {}

export function generateUnhandledNestCaseBaseError(
  input: APIInputType,
): ErrorType {
  const { card } = input
  return {
    code: `0005`,
    file: `${card.path}`,
    note: `We haven't implemented handling this type of nest yet.`,
    text: '',
  }
}

export function generateUnhandledNestCaseError(
  input: APIInputType,
  type: string,
): ErrorType {
  return {
    code: `0004`,
    file: `${input.card.path}`,
    note: `We haven't implemented handling ${type} nests yet.`,
    text: '',
  }
}

export function generateUnhandledTermCaseError(
  input: APIInputType,
): ErrorType | undefined {
  const name = api.resolveStaticTermFromNest(input)
  api.assertString(name)
  const handle = ERROR['0002']
  api.assertError(handle)
  return {
    code: `0002`,
    file: `${input.card.path}`,
    note: handle.note({ name }),
    text: '',
  }
}

export function generateUnhandledTermInterpolationError(
  input: APIInputType,
): ErrorType {
  return {
    code: `0001`,
    file: `${input.card.path}`,
    note: `We haven't implemented handling term interpolation yet.`,
    text: '',
  }
}

export function generateUnknownTermError(
  input: APIInputType,
): ErrorType {
  const { card } = input
  const name = api.resolveStaticTermFromNest(input)
  return {
    code: `0003`,
    file: `${card.path}`,
    note: `Unknown term ${name}.`,
    text: '',
  }
}

export function generateUnresolvedPathError(
  input: APIInputType,
  path: string,
): ErrorType {
  const { card } = input
  return {
    code: `0013`,
    file: card.path,
    note: `File not found ${path}.`,
  }
}

export function isError(
  error: unknown,
): error is ErrorConfigType {
  return (
    api.isObject(error) &&
    Boolean((error as ErrorConfigType).code)
  )
}

export function throwError(error: ErrorType): void {
  const text: Array<string> = []

  text.push(``)
  text.push(``)
  text.push(`  note <${error.note}>`)
  text.push(`  code <${error.code}>`)
  if (error.file) {
    if (error.text) {
      text.push(`  file <${error.file}>, <`)
      error.text.split('\n').forEach(line => {
        text.push(`    ${line}`)
      })
      text.push(`  >`)
    } else {
      text.push(`  file <${error.file}>`)
    }
  }
  text.push(``)

  throw new Error(text.join('\n'))
}

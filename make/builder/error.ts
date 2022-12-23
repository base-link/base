import { ERROR, Mesh, NestInputType, api } from '~'

export type ErrorType = {
  code: string
  file?: string
  hint?: string
  note: string
  text?: string
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
  input: NestInputType,
  link: string,
): ErrorType {
  return {
    code: `0008`,
    note: `Invalid deck link '${link}'.`,
  }
}

export function generateInvalidNestChildrenLengthError(
  input: NestInputType,
  length: number,
): ErrorType {
  return {
    code: `0009`,
    note: `Term doesn't have ${length} children.`,
  }
}

export function generateInvalidPatternError(
  input: NestInputType,
  pattern: unknown,
  name: string,
): ErrorType {
  const card = api.getForkProperty(input.fork, 'card')
  api.assertCard(card)
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

export function generateObjectNotMeshNodeError(
  like: Mesh,
): ErrorType {
  return {
    code: `0007`,
    note: `Object isn't Mesh node '${like}'.`,
  }
}

export function generateTermMissingChildError(): void {}

export function generateUnhandledNestCaseBaseError(
  input: NestInputType,
): ErrorType {
  const card = api.getForkProperty(input.fork, 'card')
  api.assertCard(card)
  return {
    code: `0005`,
    file: `${card.path}`,
    note: `We haven't implemented handling this type of nest yet.`,
    text: '',
  }
}

export function generateUnhandledNestCaseError(
  input: NestInputType,
  type: string,
): ErrorType {
  const card = api.getForkProperty(input.fork, 'card')
  api.assertCard(card)
  return {
    code: `0004`,
    file: `${card.path}`,
    note: `We haven't implemented handling ${type} nests yet.`,
    text: '',
  }
}

export function generateUnhandledTermCaseError(
  input: NestInputType,
): ErrorType | undefined {
  const card = api.getForkProperty(input.fork, 'card')
  api.assertCard(card)
  const name = api.resolveStaticTerm(input)
  if (ERROR['0002'] && name) {
    return {
      code: `0002`,
      file: `${card.path}`,
      note: ERROR['0002'].note({ name }),
      text: '',
    }
  }
}

export function generateUnhandledTermInterpolationError(
  input: NestInputType,
): ErrorType {
  const card = api.getForkProperty(input.fork, 'card')
  api.assertCard(card)
  return {
    code: `0001`,
    file: `${card.path}`,
    note: `We haven't implemented handling term interpolation yet.`,
    text: '',
  }
}

export function generateUnknownTermError(
  input: NestInputType,
): ErrorType {
  const card = api.getForkProperty(input.fork, 'card')
  api.assertCard(card)
  const name = api.resolveStaticTerm(input)
  return {
    code: `0003`,
    file: `${card.path}`,
    note: `Unknown term ${name}.`,
    text: '',
  }
}

export function generateUnresolvedPathError(
  input: NestInputType,
  path: string,
): ErrorType {
  const card = api.getForkProperty(input.fork, 'card')
  api.assertCard(card)
  return {
    code: `0013`,
    file: card.path,
    note: `File not found ${path}.`,
  }
}

export function throwError(error: ErrorType | undefined): void {
  if (!error) {
    error = {
      code: `0005`,
      file: `.`,
      note: `Error.`,
      text: '',
    }
  }

  const text: Array<string> = []

  text.push(``)
  text.push(``)
  text.push(`  note <${error.note}>`)
  text.push(`  code <${error.code}>`)
  if (error.file) {
    if (error.text) {
      text.push(`  text <${error.file}>, <`)
      error.text.split('\n').forEach(line => {
        text.push(`    ${line}`)
      })
      text.push(`  >`)
    } else {
      text.push(`  text <${error.file}>`)
    }
  }
  text.push(``)

  throw new Error(text.join('\n'))
}

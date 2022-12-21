import {
  LexicalScope,
  LexicalScopeNestAddonType,
  api,
} from '~server'
import ERROR from '~server/config/error'

type ErrorType = {
  code: string
  file: string
  hint?: string
  note: string
  text: string
}

export function generateUnhandledNestCaseError(
  scope: LexicalScope<LexicalScopeNestAddonType>,
  type: string,
): ErrorType {
  const path = api.getPropertyValueFromScope(scope, 'path')
  return {
    code: `0004`,
    file: `${path}`,
    note: `We haven't implemented handling ${type} nests yet.`,
    text: '',
  }
}

export function generateUnhandledTermCaseError(
  scope: LexicalScope<LexicalScopeNestAddonType>,
): ErrorType | undefined {
  const path = api.getPropertyValueFromScope(scope, 'path')
  const name = api.resolveStaticTerm(scope.data.nest)
  if (ERROR['0002'] && name) {
    return {
      code: `0002`,
      file: `${path}`,
      note: ERROR['0002'].note({ name }),
      text: '',
    }
  }
}

export function generateUnhandledTermInterpolationError(
  scope: LexicalScope,
): ErrorType {
  const path = api.getPropertyValueFromScope(scope, 'path')
  return {
    code: `0001`,
    file: `${path}`,
    note: `We haven't implemented handling term interpolation yet.`,
    text: '',
  }
}

export function generateUnknownTermError(
  scope: LexicalScope<LexicalScopeNestAddonType>,
): ErrorType {
  const path = api.getPropertyValueFromScope(scope, 'path')
  return {
    code: `0003`,
    file: `${path}`,
    note: `Unknown term ${name}.`,
    text: '',
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
  text.push(`  note <${error.note}>`)
  text.push(`  code <${error.code}>`)
  text.push(`  text <${error.file}>, <`)
  error.text.split('\n').forEach(line => {
    text.push(`    ${line}`)
  })
  text.push(`  >`)
  text.push(``)

  throw new Error(text.join('\n'))
}

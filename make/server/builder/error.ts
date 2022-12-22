import { Scope, ScopeType, api } from '~server'
import ERROR from '~server/config/error'

type ErrorType = {
  code: string
  file: string
  hint?: string
  note: string
  text: string
}

export function generateUnhandledNestCaseBaseError(
  scope: ScopeType<Scope.Nest>,
): ErrorType {
  const card = api.getPropertyValueFromScope<
    Scope.Nest,
    ScopeType<Scope.Nest, ScopeType<Scope.CodeCard>>,
    'nest'
  >(scope, 'nest')
  return {
    code: `0005`,
    file: `${path}`,
    note: `We haven't implemented handling this type of nest yet.`,
    text: '',
  }
}

export function generateUnhandledNestCaseError(
  scope: ScopeType<Scope.Nest>,
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
  scope: ScopeType<Scope.Nest>,
): ErrorType | undefined {
  const path = api.getPropertyValueFromScope(scope, 'path')
  const name = api.resolveStaticTerm(scope)
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
  scope: ScopeType<Scope.Nest>,
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
  scope: ScopeType<Scope.Nest>,
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

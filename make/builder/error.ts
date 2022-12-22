import ERROR from '~config/error'
import { AST, Scope, ScopeType, api } from '~tool'

type ErrorType = {
  code: string
  file: string
  hint?: string
  note: string
  text: string
}

export function generateInvalidDeckLink(
  scope: ScopeType<Scope.Nest>,
  link: string,
): ErrorType {
  return {
    code: `0008`,
    file: ``,
    note: `Invalid deck link '${link}'.`,
    text: '',
  }
}

export function generateInvalidNestChildrenLengthError(
  scope: ScopeType<Scope.Nest>,
  length: number,
): ErrorType {
  return {
    code: `0009`,
    file: ``,
    note: `Term doesn't have ${length} children.`,
    text: '',
  }
}

export function generateObjectNotASTNodeError(
  like: AST,
): ErrorType {
  return {
    code: `0007`,
    file: ``,
    note: `Object isn't AST node '${like}'.`,
    text: '',
  }
}

export function generateTermMissingChildError(): void {}

export function generateUnhandledNestCaseBaseError(
  scope: ScopeType<Scope>,
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

import {
  LexicalScope,
  LexicalScopeNestAddonType,
  api,
} from '~server'
import shared from '~shared'

type ErrorType = {
  code: string
  file: string
  hint?: string
  note: string
  text: string
}

export function generateUnhandledTermCaseError(
  scope: LexicalScope<LexicalScopeNestAddonType>,
): ErrorType | undefined {
  const path = api.getPropertyValueFromScope(scope, 'path')
  if (shared.isSimpleTerm(scope.data.nest)) {
    const name = shared.getSimpleTerm(scope.data.nest)
    return {
      code: `0002`,
      file: `${path}`,
      note: `We haven't implemented handling the term '${name}' yet.`,
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
    code: `0001`,
    file: `${path}`,
    note: `Unknown term ${name}.`,
    text: '',
  }
}

export function throwError(error: ErrorType | undefined): void {
  if (!error) {
    return
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

  throw new Error(text.join('\n'))
}

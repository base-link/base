import { Scope, ScopeType, Tree } from '~'

export function resolveCodeAsNumber(
  scope: ScopeType<Scope.Nest>,
): number {
  const nest = scope.data.nest

  let line = nest.line[0]

  if (line && line.like === Tree.Code) {
    let type = line.base
    let rest = line.code

    switch (type) {
      case 'b':
        return parseInt(rest, 2)
      case 'x':
        return parseInt(rest, 16)
      case 'o':
        return parseInt(rest, 8)
      case 'h':
        return parseInt(rest, 16)
      default:
        throw new Error(line.code)
    }
  } else {
    throw new Error('Oops')
  }
}
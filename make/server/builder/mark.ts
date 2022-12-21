import { Scope, ScopeType } from '~server/type'

export function getMark(scope: ScopeType<Scope.Nest>) {
  const nest = scope.data.nest
  const line = nest.line[0]

  if (line && line.like === 'mark') {
    return line.mark
  }
}

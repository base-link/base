import { Scope, ScopeType, Tree } from '~'

export function getMark(scope: ScopeType<Scope.Nest>) {
  const nest = scope.data.nest
  const line = nest.line[0]

  if (line && line.like === Tree.Mark) {
    return line.mark
  }
}

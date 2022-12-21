import { Scope, ScopeType } from '~server/type'

export function nestHasSlot(
  scope: ScopeType<Scope.Nest>,
): boolean {
  const nest = scope.data.nest

  for (let i = 0, n = nest.line.length; i < n; i++) {
    let line = nest.line[i]
    if (line) {
      if (line.like !== 'term') {
        continue
      }

      for (let j = 0, m = line.link.length; j < m; j++) {
        let link = line.link[j]
        if (link && link.like === 'slot' && link.size === 1) {
          return true
        }
      }
    }
  }

  return false
}

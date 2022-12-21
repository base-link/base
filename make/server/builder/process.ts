import { ParserNestNodeType } from '~parse'

import { Base, Scope, ScopeType, api } from '~server'

export function enqueueDependencyResolution(
  dependencyList: Array<ParserNestNodeType>,
  scope: ScopeType,
  handle: (scope: ScopeType) => void,
) {
  const base = api.getPropertyValueFromScope(
    scope,
    'base',
  ) as Base

  if (base) {
    // fork.card.mesh.base.request({
    //   hash,
    //   like,
    //   name,
    //   site,
    //   link,
    //   fork,
    //   hook,
    // })
  }
}

export function processDependencyList<T extends LexicalScope>(
  dependencyList: Array<ParserNestNodeType>,
  scope: T,
  handle: (fork: T) => void,
) {
  if (dependencyList.length) {
    api.enqueueDependencyResolution<T>(
      dependencyList,
      scope,
      handle,
    )
  } else {
    handle(scope)
  }
}

// export function processSimpleTerm(scope: CompilerNestForkType, callback: (scope: CompilerNestForkType) => void): void {
// }
export function processTextDependencyList(
  scope: ScopeType<Scope.Nest>,
  handle: () => void,
): void {
  const dependencyList = api.getTextDependencyList(
    scope.data.nest,
  )
  api.processDependencyList(dependencyList, scope, handle)
}

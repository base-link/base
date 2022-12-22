import { Base, Scope, ScopeType, TreeNestType, api } from '~'

export function enqueueDependencyResolution(
  dependencyList: Array<TreeNestType>,
  scope: ScopeType<Scope>,
  handle: (scope: ScopeType<Scope>) => void,
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
  dependencyList: Array<TreeNestType>,
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

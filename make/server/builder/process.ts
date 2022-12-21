import { ParserNestNodeType } from '~parse'

import { Base, api } from '~server'
import type {
  LexicalScope,
  LexicalScopeNestAddonType,
} from '~server'

export function enqueueDependencyResolution<
  T extends LexicalScope,
>(
  dependencyList: Array<ParserNestNodeType>,
  scope: T,
  handle: (scope: T) => void,
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
  scope: LexicalScope<LexicalScopeNestAddonType>,
  handle: () => void,
): void {
  const dependencyList = api.getTextDependencyList(
    scope.data.nest,
  )
  api.processDependencyList(dependencyList, scope, handle)
}

import { ParserNestNodeType } from '~parse'

import {
  CompilerCardForkType,
  CompilerNestForkType,
} from '~server/type'

export function enqueueDependencyResolution<
  T extends CompilerNestForkType,
>(
  dependencyList: Array<ParserNestNodeType>,
  fork: T,
  handle: (fork: T) => void,
) {
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

export function processDependencyList<
  T extends CompilerCardForkType,
>(
  dependencyList: Array<ParserNestNodeType>,
  fork: T,
  handle: (fork: T) => void,
) {
  if (dependencyList.length) {
    api.enqueueDependencyResolution<T>(
      dependencyList,
      fork,
      handle,
    )
  } else {
    handle(fork)
  }
}

// export function processSimpleTerm(scope: CompilerNestForkType, callback: (scope: CompilerNestForkType) => void): void {
// }
export function processTextDependencyList(
  scope: CompilerNestForkType,
  handle: () => void,
): void {
  const dependencyList = api.getTextDependencyList(scope.nest)
  api.processDependencyList(dependencyList, scope, handle)
}

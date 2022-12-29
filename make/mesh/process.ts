// export function enqueueDependencyResolution(
//   dependencyList: Array<TreeNestType>,
//   scope: ScopeType<Scope>,
//   handle: (scope: ScopeType<Scope>) => void,
// ) {
//   const base = code.getPropertyValueFromScope(
//     scope,
//     'base',
//   ) as Base

//   if (base) {
//     // fork.card.mesh.base.request({
//     //   hash,
//     //   like,
//     //   name,
//     //   site,
//     //   link,
//     //   fork,
//     //   hook,
//     // })
//   }
// }

// export function processDependencyList<T extends LexicalScope>(
//   dependencyList: Array<TreeNestType>,
//   scope: T,
//   handle: (fork: T) => void,
// ) {
//   if (dependencyList.length) {
//     code.enqueueDependencyResolution<T>(
//       dependencyList,
//       scope,
//       handle,
//     )
//   } else {
//     handle(input)
//   }
// }

// // export function processSimpleTerm(scope: CompilerNestForkType, callback: (scope: CompilerNestForkType) => void): void {
// // }
// export function processTextDependencyList(
//   input: MeshInputType,
//   handle: () => void,
// ): void {
//   const dependencyList = code.getTextDependencyList(input.nest)
//   code.processDependencyList(dependencyList, scope, handle)
// }

import { SiteProcessInputType, code } from '~'

export function bindPath(input: SiteProcessInputType): void {
  const dependencyTree = code.resolvePathDependencyTree(input)
  const leafDependencyList = code.getLeafDependencyList(dependencyTree)
  // code.registerReferenceWatchers(leafDependencyList)
  // code.tryToResolveReferences()
}

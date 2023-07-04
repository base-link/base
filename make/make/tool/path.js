export function bindPath(load) {
    const dependencyTree = code.resolvePathDependencyTree(load);
    const leafDependencyList = code.getLeafDependencyList(dependencyTree);
    // code.registerReferenceWatchers(leafDependencyList)
    // code.tryToResolveReferences()
}
//# sourceMappingURL=path.js.map
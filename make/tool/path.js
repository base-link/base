export function bindPath(input) {
    const dependencyTree = code.resolvePathDependencyTree(input);
    const leafDependencyList = code.getLeafDependencyList(dependencyTree);
    // code.registerReferenceWatchers(leafDependencyList)
    // code.tryToResolveReferences()
}
//# sourceMappingURL=path.js.map
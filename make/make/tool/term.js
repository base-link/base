export function assumeTermString(load) {
    const term = code.resolveTermString(load);
    code.assertString(term);
    return term;
}
export function attachStaticTerm(load, property, value) {
    const blueString = code.createBlueString(value);
    code.pushRed(load, code.createRedValue(load, property, blueString));
    code.attachBlue(load, property, blueString);
}
export function bindTerm(load) {
    const dependencyTree = code.resolveTermDependencyTree(load);
    const leafDependencyList = code.getLeafDependencyList(dependencyTree);
    // code.registerReferenceWatchers(leafDependencyList)
    // code.tryToResolveReferences()
}
export function getTerm(load) {
    const nest = load.link.element;
    if (nest.type === Link.Term) {
        return nest;
    }
    if (nest.type !== Link.Tree) {
        return;
    }
    const child = nest.head;
    if (!child) {
        return;
    }
    if (child.type !== Link.Term) {
        return;
    }
    return child;
}
export function load_dynamicTerm(load) {
    const nest = load.link.element;
    code.pushRed(load, code.createRedValue(load, undefined, nest));
}
export function load_first_dynamicTerm(load, property) {
    const nest = load.link.element;
    code.assertLink(nest, Link.Term);
    code.pushRed(load, code.createRedValue(load, property, nest));
    code.attachBlue(load, property, code.createBlueTerm(nest));
}
export function load_first_staticTerm(load, property) {
    const name = code.assumeTermString(load);
    const string = code.createBlueString(name);
    code.pushRed(load, code.createRedValue(load, property, string));
    code.attachBlue(load, property, string);
}
export function resolveTermString(load) {
    const term = code.getTerm(load);
    code.assertLink(term, Link.Term);
    const string = [];
    term.segment.forEach(seg => {
        if (seg.type === Link.String) {
            string.push(seg.value);
        }
        else {
            string.push('RESOLVE FROM PLUGIN');
        }
    });
    return string.join('');
}
export function termIsInterpolated(load) {
    const nest = load.link.element;
    const term = code.getTerm(load);
    if (!term) {
        return false;
    }
    return code.termIsInterpolatedImpl(term);
}
export function termIsInterpolatedImpl(term) {
    for (const seg of term.segment) {
        if (seg.type === Link.Plugin) {
            return true;
        }
    }
    return false;
}
export function termIsNested(load) {
    const nest = load.link.element;
    return nest.type === Link.Path;
}
//# sourceMappingURL=term.js.map
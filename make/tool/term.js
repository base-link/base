export function assumeTermString(input) {
    const term = code.resolveTermString(input);
    code.assertString(term);
    return term;
}
export function attachStaticTerm(input, property, value) {
    const blueString = code.createBlueString(value);
    code.pushRed(input, code.createRedValue(input, property, blueString));
    code.attachBlue(input, property, blueString);
}
export function bindTerm(input) {
    const dependencyTree = code.resolveTermDependencyTree(input);
    const leafDependencyList = code.getLeafDependencyList(dependencyTree);
    // code.registerReferenceWatchers(leafDependencyList)
    // code.tryToResolveReferences()
}
export function getTerm(input) {
    const nest = input.link.element;
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
export function load_dynamicTerm(input) {
    const nest = input.link.element;
    code.pushRed(input, code.createRedValue(input, undefined, nest));
}
export function load_first_dynamicTerm(input, property) {
    const nest = input.link.element;
    code.assertLink(nest, Link.Term);
    code.pushRed(input, code.createRedValue(input, property, nest));
    code.attachBlue(input, property, code.createBlueTerm(nest));
}
export function load_first_staticTerm(input, property) {
    const name = code.assumeTermString(input);
    const string = code.createBlueString(name);
    code.pushRed(input, code.createRedValue(input, property, string));
    code.attachBlue(input, property, string);
}
export function resolveTermString(input) {
    const term = code.getTerm(input);
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
export function termIsInterpolated(input) {
    const nest = input.link.element;
    const term = code.getTerm(input);
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
export function termIsNested(input) {
    const nest = input.link.element;
    return nest.type === Link.Path;
}
//# sourceMappingURL=term.js.map
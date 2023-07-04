export function assumeText(load) {
    const text = code.resolveText(load);
    code.assertString(text);
    return text;
}
export function bindText(load, callback) {
    const dependencyTree = code.resolveTextDependencyTree(load);
    const leafDependencyList = code.getLeafDependencyList(dependencyTree);
    const canResolveDependencyTreeNow = code.canResolveDependencyTree(load, leafDependencyList);
    if (canResolveDependencyTreeNow) {
        code.addTask(load.base, callback);
    }
    else {
        code.addDependencyTreeObserver(load, leafDependencyList);
    }
}
export function readLinkIndex(load) {
    const nest = load.link.element;
    if (nest.type === Link.Index) {
        const child = nest.nest[0];
        code.assertGenericLink(child);
        switch (child.type) {
            case Link.Tree:
                return code.readLinkTree(code.withLink(load, child));
            case Link.Path:
                return code.readLinkPath(code.withLink(load, child));
            case Link.Term:
                return code.readLinkTerm(code.withLink(load, child));
            default:
                throw new Error('Never');
        }
    }
}
export function readLinkPath(load) {
    const nest = code.assumeLink(load, Link.Path);
    let i = 0;
    const first = nest.segment[i++];
    code.assertGenericLink(first);
    const firstTerm = code.resolveTermString(code.withLink(load, first));
    code.assertString(firstTerm);
    let value = code.getEnvironmentProperty(load.environment, firstTerm);
    while (i < nest.segment.length) {
        const seg = nest.segment[i++];
        switch (seg?.type) {
            case Link.Index: {
                const index = code.readLinkIndex(code.withLink(load, seg));
                if (code.isRecord(value) && code.isString(index)) {
                    value = code.getProperty(value, index);
                }
                else {
                    value = undefined;
                }
                break;
            }
            case Link.Term: {
                const term = code.resolveTermString(code.withLink(load, seg));
                if (code.isRecord(value) && code.isString(term)) {
                    value = code.getProperty(value, term);
                }
                else {
                    value = undefined;
                }
                break;
            }
            default:
                throw new Error('Compiler error');
        }
    }
    return value;
}
export function readLinkPlugin(load) {
    const nest = load.link.element;
    if (nest.type === Link.Plugin) {
        const child = nest.nest[0];
        code.assertGenericLink(child);
        switch (child.type) {
            case Link.Tree:
                return code.readLinkTree(code.withLink(load, child));
            case Link.Path:
                return code.readLinkPath(code.withLink(load, child));
            case Link.Term:
                return code.readLinkTerm(code.withLink(load, child));
            default:
                throw new Error('Never');
        }
    }
}
export function readLinkTerm(load) {
    const term = code.resolveTermString(load);
    code.assertString(term);
    return code.getEnvironmentProperty(load.environment, term);
}
export function readLinkTree(load) {
    const nest = load.link.element;
    code.assertLink(nest, Link.Tree);
    throw new Error('TODO');
    return undefined;
}
export function resolveText(load) {
    const nest = load.link.element;
    if (nest.type !== Link.Text) {
        return;
    }
    const str = [];
    nest.segment.forEach(seg => {
        switch (seg.type) {
            case Link.String:
                str.push(seg.value);
                break;
            case Link.Plugin:
                const text = code.readLinkPlugin(code.withLink(load, seg, 0));
                str.push(text);
                break;
            default:
                code.throwError(code.generateInvalidCompilerStateError());
        }
    });
    return str.join('');
}
export function textIsInterpolated(load, size = 1) {
    const nest = load.link.element;
    if (nest.type !== Link.Text) {
        return false;
    }
    for (const seg of nest.segment) {
        if (seg.type === Link.Plugin) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=text.js.map
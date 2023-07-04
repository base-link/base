import { CompilerError, Link, LinkHint, code, } from '~';
export function addDependencyTreeObserver(load, list) {
    // list.forEach()
}
export function canResolveDependencyTree(load, list) {
    if (list.length === 0) {
        return true;
    }
    const stack = list.concat();
    while (stack.length) {
        const observer = stack.shift();
        code.assertRecord(observer);
        // we made it back to the base
        if (!observer.parent) {
            return true;
        }
        const name = observer.path[0];
        code.assertString(name);
        if (code.hasEnvironmentVariable(load.environment, name)) {
            if (observer.parent) {
                observer.parent.remaining--;
                if (observer.parent.remaining === 0) {
                    stack;
                }
            }
        }
    }
    return false;
}
export function connectDependency(parent, binding, child) {
    child.parent = binding;
    binding.remaining++;
    parent.children.push(child);
}
export function getLeafDependencyList(tree, array = []) {
    tree.children.forEach(child => {
        if (typeof child === 'object') {
            if (!child.children.length) {
                array.push(child);
            }
            else {
                getLeafDependencyList(child, array);
            }
        }
    });
    return array;
}
export function resolveDynamicPathDependencyTree(load) {
    const path = code.assumeLink(load, Link.Path);
    const observer = {
        children: [],
        node: path,
        path: [],
    };
    const binding = {
        observer,
        remaining: 0,
    };
    path.segment.forEach((seg, i) => {
        if (seg.type === Link.Index) {
            code.throwError(code.generateCompilerTodoError());
        }
        else {
            code.connectDependency(observer, binding, resolveTermDependencyTree(code.withLink(load, seg, i)));
        }
    });
    return observer;
}
export function resolveDynamicTermDependencyTree(load) {
    const term = code.assumeLink(load, Link.Term);
    const observer = {
        children: [],
        node: term,
        path: [],
    };
    const binding = {
        observer,
        remaining: 0,
    };
    term.segment.forEach((seg, i) => {
        if (seg.type === Link.String) {
            observer.children.push(seg.value);
        }
        else {
            code.connectDependency(observer, binding, code.resolvePluginDependencyTree(code.withLink(load, seg, i)));
        }
    });
    return observer;
}
export function resolvePathDependencyTree(load) {
    const type = code.getLinkHint(load);
    switch (type) {
        case LinkHint.StaticPath: {
            return code.resolveStaticPathDependencyTree(load);
        }
        case LinkHint.DynamicPath: {
            return code.resolveDynamicPathDependencyTree(load);
        }
        default:
            code.throwError(code.generateInvalidCompilerStateError());
            throw new CompilerError();
    }
}
export function resolvePluginDependencyTree(load) {
    const nest = load.link.element;
    const observer = {
        children: [],
        node: nest,
        path: [],
    };
    const binding = {
        observer,
        remaining: 0,
    };
    switch (nest.type) {
        case Link.Term: {
            code.connectDependency(observer, binding, code.resolveTermDependencyTree(load));
            break;
        }
        case Link.Path: {
            code.connectDependency(observer, binding, code.resolvePathDependencyTree(load));
            break;
        }
        case Link.Tree: {
            code.throwError(code.generateCompilerTodoError());
            break;
        }
        default:
            code.throwError(code.generateInvalidCompilerStateError());
    }
    return observer;
}
export function resolveStaticPathDependencyTree(load) {
    const path = code.assumeLink(load, Link.Path);
    const observer = {
        children: [],
        node: path,
        path: [],
    };
    const binding = {
        observer,
        remaining: 0,
    };
    path.segment.forEach((seg, i) => {
        if (seg.type === Link.Index) {
            code.throwError(code.generateCompilerTodoError());
        }
        else {
            code.connectDependency(observer, binding, resolveTermDependencyTree(code.withLink(load, seg, i)));
        }
    });
    return observer;
}
export function resolveStaticTermDependencyTree(load) {
    const term = code.assumeLink(load, Link.Term);
    const string = [];
    const observer = {
        children: [],
        node: term,
        path: [],
    };
    term.segment.forEach((seg, i) => {
        if (seg.type === Link.String) {
            string.push(seg.value);
        }
        else {
            code.throwError(code.generateInvalidCompilerStateError());
        }
    });
    observer.path.push(string.join(''));
    return observer;
}
export function resolveTermDependencyTree(load) {
    const type = code.getLinkHint(load);
    switch (type) {
        case LinkHint.StaticTerm: {
            return code.resolveStaticTermDependencyTree(load);
        }
        case LinkHint.DynamicTerm: {
            return code.resolveDynamicTermDependencyTree(load);
        }
        default:
            code.throwError(code.generateInvalidCompilerStateError());
            throw new CompilerError();
    }
}
export function resolveTextDependencyTree(load) {
    const nest = code.assumeLink(load, Link.Text);
    const observer = {
        children: [],
        node: nest,
        path: [],
    };
    const binding = {
        observer,
        remaining: 0,
    };
    nest.segment.forEach(seg => {
        switch (seg.type) {
            case Link.String:
                observer.children.push(seg.value);
                break;
            case Link.Plugin:
                const childNest = seg.nest[0];
                code.assertGenericLink(childNest);
                code.connectDependency(observer, binding, code.resolvePluginDependencyTree(code.withLink(load, childNest, 0)));
                break;
            default:
                code.throwError(code.generateInvalidCompilerStateError());
        }
    });
    return observer;
}
//# sourceMappingURL=dependency.js.map
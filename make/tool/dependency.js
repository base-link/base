import { CompilerError, Link, LinkHint, code, } from '~';
export function addDependencyTreeObserver(input, list) {
    // list.forEach()
}
export function canResolveDependencyTree(input, list) {
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
        if (code.hasEnvironmentVariable(input.environment, name)) {
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
export function resolveDynamicPathDependencyTree(input) {
    const path = code.assumeLink(input, Link.Path);
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
            code.connectDependency(observer, binding, resolveTermDependencyTree(code.withLink(input, seg, i)));
        }
    });
    return observer;
}
export function resolveDynamicTermDependencyTree(input) {
    const term = code.assumeLink(input, Link.Term);
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
            code.connectDependency(observer, binding, code.resolvePluginDependencyTree(code.withLink(input, seg, i)));
        }
    });
    return observer;
}
export function resolvePathDependencyTree(input) {
    const type = code.getLinkHint(input);
    switch (type) {
        case LinkHint.StaticPath: {
            return code.resolveStaticPathDependencyTree(input);
        }
        case LinkHint.DynamicPath: {
            return code.resolveDynamicPathDependencyTree(input);
        }
        default:
            code.throwError(code.generateInvalidCompilerStateError());
            throw new CompilerError();
    }
}
export function resolvePluginDependencyTree(input) {
    const nest = input.link.element;
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
            code.connectDependency(observer, binding, code.resolveTermDependencyTree(input));
            break;
        }
        case Link.Path: {
            code.connectDependency(observer, binding, code.resolvePathDependencyTree(input));
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
export function resolveStaticPathDependencyTree(input) {
    const path = code.assumeLink(input, Link.Path);
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
            code.connectDependency(observer, binding, resolveTermDependencyTree(code.withLink(input, seg, i)));
        }
    });
    return observer;
}
export function resolveStaticTermDependencyTree(input) {
    const term = code.assumeLink(input, Link.Term);
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
export function resolveTermDependencyTree(input) {
    const type = code.getLinkHint(input);
    switch (type) {
        case LinkHint.StaticTerm: {
            return code.resolveStaticTermDependencyTree(input);
        }
        case LinkHint.DynamicTerm: {
            return code.resolveDynamicTermDependencyTree(input);
        }
        default:
            code.throwError(code.generateInvalidCompilerStateError());
            throw new CompilerError();
    }
}
export function resolveTextDependencyTree(input) {
    const nest = code.assumeLink(input, Link.Text);
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
                code.connectDependency(observer, binding, code.resolvePluginDependencyTree(code.withLink(input, childNest, 0)));
                break;
            default:
                code.throwError(code.generateInvalidCompilerStateError());
        }
    });
    return observer;
}
//# sourceMappingURL=dependency.js.map
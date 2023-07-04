export function assumeLinkIndex(load) {
    const index = load.link.index;
    code.assertNumber(index);
    return index;
}
export function getLinkHint(load) {
    if (code.nestIsTerm(load)) {
        if (code.termIsInterpolated(load)) {
            return LinkHint.DynamicTerm;
        }
        else {
            return LinkHint.StaticTerm;
        }
    }
    else if (code.nestIsPath(load)) {
        if (code.pathIsInterpolated(load)) {
            return LinkHint.DynamicPath;
        }
        else {
            return LinkHint.StaticPath;
        }
    }
    else if (code.nestIsText(load)) {
        if (code.textIsInterpolated(load)) {
            return LinkHint.DynamicText;
        }
        else {
            return LinkHint.StaticText;
        }
    }
    else if (code.nestIsUnsignedInteger(load)) {
        return LinkHint.Mark;
    }
    else if (code.nestIsHashtag(load)) {
        return LinkHint.Code;
    }
    else {
        code.throwError(code.generateUnhandledNestCaseBaseError(load));
    }
    return LinkHint.Empty;
}
export function nestIsHashtag(load) {
    const nest = load.link.element;
    return nest.type === Link.Hashtag;
}
export function nestIsPath(load) {
    const nest = load.link.element;
    return nest.type === Link.Path;
}
export function nestIsTerm(load) {
    const nest = load.link.element;
    if (nest.type === Link.Term) {
        return true;
    }
    if (nest.type !== Link.Tree) {
        return false;
    }
    const child = nest.head;
    if (!child) {
        return false;
    }
    if (child.type !== Link.Term) {
        return false;
    }
    return true;
}
export function nestIsText(load) {
    const nest = load.link.element;
    return nest.type === Link.Text;
}
export function nestIsUnsignedInteger(load) {
    const nest = load.link.element;
    return nest.type === Link.UnsignedInteger;
}
export function pathIsInterpolated(load) {
    const nest = load.link.element;
    if (nest.type !== Link.Path) {
        return false;
    }
    for (const seg of nest.segment) {
        if (seg.type === Link.Index) {
            return true;
        }
        if (code.termIsInterpolatedImpl(seg)) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=nest.js.map
export function assumeNest(load) {
    return code.assumeLink(load, Link.Tree).nest;
}
export function load_codeCard_bind(load) {
    const nest = code.assumeNest(load);
    nest.forEach((nest, index) => {
        load_codeCard_bind_nestedChildren(code.withLink(load, nest, index));
    });
}
export function load_codeCard_bind_nestedChildren(load) {
    const type = code.getLinkHint(load);
    switch (type) {
        case LinkHint.StaticTerm:
            const term = code.resolveTermString(load);
            break;
        default:
            code.throwError(code.generateUnhandledTermCaseError(load));
    }
}
//# sourceMappingURL=index.js.map
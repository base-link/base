export function load_codeCard_time(load) {
    code.assumeLink(load, Link.Tree).nest.forEach((nest, index) => {
        load_codeCard_time_nestedChildren(code.withLink(load, nest, index));
    });
}
export function load_codeCard_time_nestedChildren(load) {
    const type = code.getLinkHint(load);
    switch (type) {
        case LinkHint.StaticTerm:
            const term = code.resolveTermString(load);
            break;
        default:
            code.throwError(code.generateUnhandledNestCaseError(load, type));
    }
}
//# sourceMappingURL=index.js.map
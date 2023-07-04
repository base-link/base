export function load_codeCard_stem(load) {
    code.assumeLink(load, Link.Tree).nest.forEach((nest, index) => {
        load_codeCard_stem_nestedChildren(code.withLink(load, nest, index));
    });
}
export function load_codeCard_stem_nestedChildren(load) {
    const type = code.getLinkHint(load);
    switch (type) {
        case LinkHint.StaticTerm:
            break;
        default:
            code.throwError(code.generateUnhandledTermCaseError(load));
    }
}
//# sourceMappingURL=index.js.map
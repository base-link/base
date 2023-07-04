export function load_codeCard_beam(load) {
    code.assumeLink(load, Link.Tree).nest.forEach((nest, index) => {
        load_codeCard_beam_nestedChildren(code.withLink(load, nest, index));
    });
}
export function load_codeCard_beam_nestedChildren(load) {
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
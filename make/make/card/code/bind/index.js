import card from '../../../../make/card.js';
export function assumeNest(load) {
    return card.loadLink(load, Link.Tree).nest;
}
export function load_codeCard_bind(load) {
    const nest = card.assumeNest(load);
    nest.forEach((nest, index) => {
        load_codeCard_bind_nestedChildren(card.withLink(load, nest, index));
    });
}
export function load_codeCard_bind_nestedChildren(load) {
    const type = card.getLinkHint(load);
    switch (type) {
        case LinkHint.StaticTerm:
            const term = card.resolveTermString(load);
            break;
        default:
            card.throwError(card.generateUnhandledTermCaseError(load));
    }
}
//# sourceMappingURL=index.js.map
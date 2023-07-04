import card from '../../../../make/card.js';
export function load_codeCard_wait(load) {
    card.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
        load_codeCard_wait_nestedChildren(card.withLink(load, nest, index));
    });
}
export function load_codeCard_wait_nestedChildren(load) {
    const type = card.getLinkHint(load);
    switch (type) {
        case LinkHint.StaticTerm:
            break;
        default:
            card.throwError(card.generateUnhandledNestCaseError(load, type));
    }
}
//# sourceMappingURL=index.js.map
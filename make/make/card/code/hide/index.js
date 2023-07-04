import card from '../../../../make/card.js';
export function load_codeCard_hide(load) {
    card.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
        load_codeCard_hide_nestedChildren(card.withLink(load, nest, index));
    });
}
export function load_codeCard_hide_nestedChildren(load) {
    const type = card.getLinkHint(load);
    switch (type) {
        case LinkHint.StaticTerm:
            break;
        default:
            card.throwError(card.generateUnhandledNestCaseError(load, type));
    }
}
//# sourceMappingURL=index.js.map
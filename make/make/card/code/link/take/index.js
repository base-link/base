import card from '../../../../../make/card.js';
export function load_codeCard_link_take(load) {
    card.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
        load_codeCard_link_take_nestedChildren(card.withLink(load, nest, index));
    });
}
export function load_codeCard_link_take_nestedChildren(load) {
    const type = card.getLinkHint(load);
    switch (type) {
        case LinkHint.StaticTerm:
            break;
        default:
            card.throwError(card.generateUnhandledTermCaseError(load));
    }
}
//# sourceMappingURL=index.js.map
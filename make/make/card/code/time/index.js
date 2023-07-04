import card from '../../../../make/card.js';
export function load_codeCard_time(load) {
    card.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
        load_codeCard_time_nestedChildren(card.withLink(load, nest, index));
    });
}
export function load_codeCard_time_nestedChildren(load) {
    const type = card.getLinkHint(load);
    switch (type) {
        case LinkHint.StaticTerm:
            const term = card.resolveTermString(load);
            break;
        default:
            card.throwError(card.generateUnhandledNestCaseError(load, type));
    }
}
//# sourceMappingURL=index.js.map
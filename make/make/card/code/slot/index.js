import card from '../../../../make/card.js';
export function load_codeCard_slot(load) {
    card.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
        load_codeCard_slot_nestedChildren(card.withLink(load, nest, index));
    });
}
export function load_codeCard_slot_nestedChildren(load) {
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
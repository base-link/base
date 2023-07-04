import card from '../../../../../../make/card.js';
export function load_codeCard_load_find_bear(load) {
    card.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
        card.load_codeCard_load_find_bear_nestedChildren(card.withLink(load, nest, index));
    });
}
export function load_codeCard_load_find_bear_nestedChildren(load) {
    const type = card.getLinkHint(load);
    if (type === 'static-term') {
    }
    else {
        card.throwError(card.generateUnhandledTermCaseError(load));
    }
}
//# sourceMappingURL=index.js.map
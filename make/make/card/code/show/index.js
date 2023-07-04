import card from '../../../../make/card.js';
export function load_codeCard_show(load) {
    card.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
        load_codeCard_show_nestedChildren(card.withLink(load, nest, index));
    });
}
export function load_codeCard_show_nestedChildren(load) {
    const type = card.getLinkHint(load);
    switch (type) {
        case LinkHint.StaticText:
            break;
        default:
            card.throwError(card.generateUnhandledTermCaseError(load));
    }
}
//# sourceMappingURL=index.js.map
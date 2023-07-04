import card from '../../../../make/card.js';
export function load_codeCard_make(load) {
    card.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
        load_codeCard_make_nestedChildren(card.withLink(load, nest, index));
    });
}
export function load_codeCard_make_nestedChildren(load) {
    const type = card.getLinkHint(load);
    switch (type) {
        case LinkHint.StaticTerm:
            const term = card.resolveTermString(load);
            switch (term) {
                case 'bind':
                    card.load_codeCard_bind(load);
                    break;
                default:
                    card.throwError(card.generateUnhandledTermCaseError(load));
            }
            break;
        default:
            card.throwError(card.generateUnhandledNestCaseError(load, type));
    }
}
//# sourceMappingURL=index.js.map
import card from '../../../../make/card.js';
export function load_codeCard_zone(load) {
    card.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
        card.load_codeCard_zone_nestedChildren(card.withLink(load, nest, index));
    });
}
export function load_codeCard_zone_nestedChildren(load) {
    const type = card.getLinkHint(load);
    if (type === 'static-term') {
        const term = card.resolveTermString(load);
        switch (term) {
            case 'take':
                card.load_codeCard_link(load);
                break;
            case 'hook':
                card.load_codeCard_zoneHook(load);
                break;
            case 'head':
                card.load_codeCard_head(load);
                break;
            default:
                card.throwError(card.generateUnknownTermError(load));
        }
    }
    else {
        card.throwError(card.generateUnhandledNestCaseError(load, type));
    }
}
//# sourceMappingURL=index.js.map
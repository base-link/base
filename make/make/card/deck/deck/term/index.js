export function load_deckCard_deck_term(load) {
    card.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
        load_deckCard_deck_term_nestedChildren(card.withLink(load, nest, index));
    });
}
export function load_deckCard_deck_term_nestedChildren(load) {
    const type = card.getLinkHint(load);
    switch (type) {
        case LinkHint.StaticText:
            break;
        default:
            card.throwError(card.generateUnhandledNestCaseError(load, type));
    }
}
//# sourceMappingURL=index.js.map
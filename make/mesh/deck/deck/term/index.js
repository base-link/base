export function load_deckCard_deck_term(load) {
    code.assumeLink(load, Link.Tree).nest.forEach((nest, index) => {
        load_deckCard_deck_term_nestedChildren(code.withLink(load, nest, index));
    });
}
export function load_deckCard_deck_term_nestedChildren(load) {
    const type = code.getLinkHint(load);
    switch (type) {
        case LinkHint.StaticText:
            break;
        default:
            code.throwError(code.generateUnhandledNestCaseError(load, type));
    }
}
//# sourceMappingURL=index.js.map
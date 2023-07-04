export function load_codeCard_form_base(load) {
    card.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
        load_codeCard_form_base_nestedChildren(card.withLink(load, nest, index));
    });
}
export function load_codeCard_form_base_nestedChildren(load) {
    const type = card.getLinkHint(load);
    switch (type) {
        case LinkHint.StaticTerm:
            break;
        default:
            card.throwError(card.generateUnhandledTermCaseError(load));
    }
}
//# sourceMappingURL=index.js.map
import card from '../../../../make/card.js';
import tool from '../../../../make/tool.js';
export function load_codeCard_beam(load) {
    tool.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
        load_codeCard_beam_nestedChildren(card.withLink(load, nest, index));
    });
}
export function load_codeCard_beam_nestedChildren(load) {
    const type = tool.getLinkHint(load);
    switch (type) {
        case LinkHint.StaticTerm:
            const term = tool.resolveTermString(load);
            break;
        default:
            tool.throwError(tool.generateUnhandledTermCaseError(load));
    }
}
//# sourceMappingURL=index.js.map
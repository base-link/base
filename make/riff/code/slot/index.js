import { Link, LinkHint, code } from '../../../index.js';
export function process_codeCard_slot(input) {
    code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
        process_codeCard_slot_nestedChildren(code.withLink(input, nest, index));
    });
}
export function process_codeCard_slot_nestedChildren(input) {
    const type = code.getLinkHint(input);
    switch (type) {
        case LinkHint.StaticTerm:
            const term = code.resolveTermString(input);
            break;
        default:
            code.throwError(code.generateUnhandledTermCaseError(input));
    }
}
//# sourceMappingURL=index.js.map
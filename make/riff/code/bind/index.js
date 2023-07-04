import { Link, LinkHint, code } from '../../../index.js';
export function assumeNest(input) {
    return code.assumeLink(input, Link.Tree).nest;
}
export function process_codeCard_bind(input) {
    const nest = code.assumeNest(input);
    nest.forEach((nest, index) => {
        process_codeCard_bind_nestedChildren(code.withLink(input, nest, index));
    });
}
export function process_codeCard_bind_nestedChildren(input) {
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
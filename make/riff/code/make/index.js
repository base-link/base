import { Link, LinkHint, code } from '../../../index.js';
export function process_codeCard_make(input) {
    code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
        process_codeCard_make_nestedChildren(code.withLink(input, nest, index));
    });
}
export function process_codeCard_make_nestedChildren(input) {
    const type = code.getLinkHint(input);
    switch (type) {
        case LinkHint.StaticTerm:
            const term = code.resolveTermString(input);
            switch (term) {
                case 'bind':
                    code.process_codeCard_bind(input);
                    break;
                default:
                    code.throwError(code.generateUnhandledTermCaseError(input));
            }
            break;
        default:
            code.throwError(code.generateUnhandledNestCaseError(input, type));
    }
}
//# sourceMappingURL=index.js.map
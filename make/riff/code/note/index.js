import { Link, LinkHint, code } from '../../../index.js';
export function process_codeCard_note(input) {
    code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
        process_codeCard_note_nestedChildren(code.withLink(input, nest, index));
    });
}
export function process_codeCard_note_nestedChildren(input) {
    const type = code.getLinkHint(input);
    switch (type) {
        case LinkHint.StaticText:
            break;
        default:
            code.throwError(code.generateUnhandledNestCaseError(input, type));
    }
}
//# sourceMappingURL=index.js.map
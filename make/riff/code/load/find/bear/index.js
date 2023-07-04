import { Link, code } from '../../../../../index.js';
export function process_codeCard_load_find_bear(input) {
    code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
        code.process_codeCard_load_find_bear_nestedChildren(code.withLink(input, nest, index));
    });
}
export function process_codeCard_load_find_bear_nestedChildren(input) {
    const type = code.getLinkHint(input);
    if (type === 'static-term') {
    }
    else {
        code.throwError(code.generateUnhandledTermCaseError(input));
    }
}
//# sourceMappingURL=index.js.map
import { Link, LinkHint, code } from '../../../../../index.js';
export function process_codeCard_load_find_save(input) {
    const nest = code.assumeLink(input, Link.Tree);
    nest.nest.forEach((nest, index) => {
        code.addTask(input.base, () => {
            code.process_codeCard_load_find_save_nestedChildren(code.withLink(input, nest, index));
        });
    });
}
export function process_codeCard_load_find_save_nestedChildren(input) {
    const type = code.getLinkHint(input);
    if (type === LinkHint.StaticTerm) {
        const term = code.assumeTermString(input);
        code.process_find_scope(input);
    }
    else {
        code.throwError(code.generateUnhandledTermCaseError(input));
    }
}
//# sourceMappingURL=index.js.map
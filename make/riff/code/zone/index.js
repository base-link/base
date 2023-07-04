import { Link, code } from '../../../index.js';
export * from './hook/index.js';
export function process_codeCard_zone(input) {
    code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
        code.process_codeCard_zone_nestedChildren(code.withLink(input, nest, index));
    });
}
export function process_codeCard_zone_nestedChildren(input) {
    const type = code.getLinkHint(input);
    if (type === 'static-term') {
        const term = code.resolveTermString(input);
        switch (term) {
            case 'take':
                code.process_codeCard_link(input);
                break;
            case 'hook':
                code.process_codeCard_zoneHook(input);
                break;
            case 'head':
                code.process_codeCard_head(input);
                break;
            default:
                code.throwError(code.generateUnknownTermError(input));
        }
    }
    else {
        code.throwError(code.generateUnhandledNestCaseError(input, type));
    }
}
//# sourceMappingURL=index.js.map
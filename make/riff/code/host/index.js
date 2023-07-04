import { code, LinkHint, Mesh } from '../../../index.js';
export function process_codeCard_host(input, property = 'constants') {
    const red = code.pushRed(input, code.createRedGather(input, property));
    const blue = code.pushBlue(input, property, {
        type: Mesh.Constant
    });
    const colorInput = code.withColors(input, { blue, red });
    code.assumeNest(colorInput).forEach((nest, index) => {
        process_codeCard_host_nestedChildren(code.withLink(colorInput, nest, index));
    });
}
export function process_codeCard_host_nestedChildren(input) {
    const type = code.getLinkHint(input);
    switch (type) {
        case LinkHint.StaticTerm: {
            const term = code.assumeTermString(input);
            const index = code.assumeLinkIndex(input);
            if (index === 0) {
                code.attachStaticTerm(input, 'name', term);
                return;
            }
            break;
        }
        default:
            code.throwError(code.generateUnhandledNestCaseError(input, type));
    }
}
//# sourceMappingURL=index.js.map
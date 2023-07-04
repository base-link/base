import { LinkHint, Mesh, code } from '../../../index.js';
export function process_codeCard_head(input) {
    const red = code.pushRed(input, code.createRedGather(input, 'typeInputs'));
    const blue = code.pushBlue(input, 'typeInputs', {
        type: Mesh.ClassInput,
    });
    const colorInput = code.withColors(input, { blue, red });
    code.assumeNest(colorInput).forEach((nest, index) => {
        code.addTask(input.base, () => {
            code.process_codeCard_head_nestedChildren(code.withLink(input, nest, index));
        });
    });
}
export function process_codeCard_head_nestedChildren(input) {
    const type = code.getLinkHint(input);
    switch (type) {
        case LinkHint.StaticTerm:
            const term = code.assumeTermString(input);
            const index = code.assumeLinkIndex(input);
            if (index === 0) {
                code.attachStaticTerm(input, 'name', term);
                return;
            }
            switch (term) {
                case 'like':
                    code.process_codeCard_like(input);
                    break;
                case 'base':
                    code.process_codeCard_like(input);
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
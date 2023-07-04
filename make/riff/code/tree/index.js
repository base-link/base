import { Mesh, code } from '../../../index.js';
export * from './hook/index.js';
export function process_codeCard_tree(input) {
    const red = code.pushRed(input, code.createRedGather(input, 'template'));
    const blue = code.pushBlue(input, 'templates', {
        hooks: code.createBlueArray(input),
        inputs: code.createBlueArray(input),
        type: Mesh.Template,
    });
    const colorInput = code.withColors(input, { blue, red });
    code.assumeNest(colorInput).forEach((nest, index) => {
        code.addTask(input.base, () => {
            code.process_codeCard_tree_nestedChildren(code.withLink(colorInput, nest, index));
        });
    });
}
export function process_codeCard_tree_nestedChildren(input) {
    const type = code.getLinkHint(input);
    if (type === 'static-term') {
        const name = code.assumeTermString(input);
        const index = code.assumeLinkIndex(input);
        if (index === 0) {
            code.attachStaticTerm(input, 'name', name);
        }
        else {
            switch (name) {
                case 'take':
                    code.process_codeCard_link(input);
                    break;
                case 'hook':
                    code.process_codeCard_tree_hook(input);
                    break;
                case 'head':
                    code.process_codeCard_head(input);
                    break;
                default:
                    code.throwError(code.generateUnknownTermError(input));
            }
        }
    }
    else {
        code.throwError(code.generateUnhandledTermCaseError(input));
    }
}
//# sourceMappingURL=index.js.map
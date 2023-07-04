import { LinkHint, Mesh, code } from '../../../../index.js';
export function process_codeCard_tree_hook(input) {
    const red = code.pushRed(input, code.createRedGather(input, 'hook'));
    const blue = code.pushBlue(input, 'hooks', {
        type: Mesh.Hook,
    });
    const colorInput = code.withColors(input, { blue, red });
    code.assumeNest(colorInput).forEach((nest, index) => {
        code.addTask(colorInput.base, () => {
            process_codeCard_tree_hook_nestedChildren(code.withLink(colorInput, nest, index));
        });
    });
}
export function process_codeCard_tree_hook_nestedChildren(input) {
    const type = code.getLinkHint(input);
    switch (type) {
        case LinkHint.StaticTerm:
            const index = code.assumeLinkIndex(input);
            if (index === 0) {
                const name = code.assumeTermString(input);
                code.attachStaticTerm(input, 'name', name);
            }
            else {
                const blueString = code.getBlueValue(input, 'name');
                if (blueString?.value === 'fuse') {
                    if (!code.hasBlueValue(input, 'content')) {
                        code.attachBlueValue(input, 'content', code.createBlueArray(input));
                    }
                    const nest = input.link.element;
                    code.pushRed(input, code.createRedValue(input, 'link', nest));
                    code.pushBlue(input, 'content', code.createBlueLink(nest));
                }
            }
            break;
        default:
            code.throwError(code.generateUnhandledNestCaseError(input, type));
    }
}
//# sourceMappingURL=index.js.map
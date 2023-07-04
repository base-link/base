export function load_codeCard_tree_hook(load) {
    const red = code.pushRed(load, code.createRedGather(load, 'hook'));
    const blue = code.pushBlue(load, 'hooks', {
        type: Mesh.Hook,
    });
    const colorInput = code.withColors(load, { blue, red });
    code.assumeNest(colorInput).forEach((nest, index) => {
        code.addTask(colorInput.base, () => {
            load_codeCard_tree_hook_nestedChildren(code.withLink(colorInput, nest, index));
        });
    });
}
export function load_codeCard_tree_hook_nestedChildren(load) {
    const type = code.getLinkHint(load);
    switch (type) {
        case LinkHint.StaticTerm:
            const index = code.assumeLinkIndex(load);
            if (index === 0) {
                const name = code.assumeTermString(load);
                code.attachStaticTerm(load, 'name', name);
            }
            else {
                const blueString = code.getBlueValue(load, 'name');
                if (blueString?.value === 'fuse') {
                    if (!code.hasBlueValue(load, 'content')) {
                        code.attachBlueValue(load, 'content', code.createBlueArray(load));
                    }
                    const nest = load.link.element;
                    code.pushRed(load, code.createRedValue(load, 'link', nest));
                    code.pushBlue(load, 'content', code.createBlueLink(nest));
                }
            }
            break;
        default:
            code.throwError(code.generateUnhandledNestCaseError(load, type));
    }
}
//# sourceMappingURL=index.js.map
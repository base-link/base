export function load_codeCard_task_free(load) {
    const red = code.pushRed(load, code.createRedGather(load, 'definedOutputType'));
    const blue = code.attachBlue(load, 'definedOutputType', {
        type: Mesh.Output,
    });
    const colorInput = code.withColors(load, { blue, red });
    code.assumeNest(colorInput).forEach((nest, index) => {
        code.addTask(colorInput.base, () => {
            code.load_codeCard_task_free_nestedChildren(code.withLink(colorInput, nest, index));
        });
    });
}
export function load_codeCard_task_free_nestedChildren(load) {
    const type = code.getLinkHint(load);
    switch (type) {
        case LinkHint.StaticTerm: {
            const term = code.assumeTermString(load);
            const index = code.assumeLinkIndex(load);
            if (index === 0) {
                const blueString = code.createBlueString(term);
                code.pushRed(load, code.createRedValue(load, 'name', blueString));
                code.attachBlue(load, 'name', blueString);
                return;
            }
            break;
        }
        default:
            code.throwError(code.generateUnhandledTermCaseError(load));
    }
}
//# sourceMappingURL=index.js.map
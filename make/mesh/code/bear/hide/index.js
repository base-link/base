export function load_codeCard_bear_hide(load) {
    const red = code.pushRed(load, code.createRedGather(load, 'hide'));
    const blue = code.pushBlue(load, 'hides', {
        type: Mesh.HideExportVariable,
    });
    const colorInput = code.withColors(load, { blue, red });
    code.load_find_scope(colorInput);
}
//# sourceMappingURL=index.js.map
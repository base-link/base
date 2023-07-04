export function load_codeCard_bear_hide(load) {
    const red = card.pushRed(load, card.createRedGather(load, 'hide'));
    const blue = card.pushBlue(load, 'hides', {
        type: Mesh.HideExportVariable,
    });
    const colorInput = card.withColors(load, { blue, red });
    card.load_find_scope(colorInput);
}
//# sourceMappingURL=index.js.map
import { Mesh, code } from '../../../../index.js';
export function process_codeCard_bear_hide(input) {
    const red = code.pushRed(input, code.createRedGather(input, 'hide'));
    const blue = code.pushBlue(input, 'hides', {
        type: Mesh.HideExportVariable,
    });
    const colorInput = code.withColors(input, { blue, red });
    code.process_find_scope(colorInput);
}
//# sourceMappingURL=index.js.map
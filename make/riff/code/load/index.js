import { LinkHint, Mesh, code } from '../../../index.js';
export * from './bear/index.js';
export * from './find/index.js';
export function process_codeCard_load(input) {
    const red = code.pushRed(input, code.createRedGather(input, 'import'));
    const blue = code.pushBlue(input, 'imports', {
        imports: code.createBlueArray(input),
        type: Mesh.Import,
        variables: code.createBlueArray(input),
    });
    const colorInput = code.withColors(input, { blue, red });
    code.assumeNest(colorInput).forEach((nest, index) => {
        process_codeCard_load_nestedChildren(code.withLink(colorInput, nest, index));
    });
}
export function process_codeCard_load_nestedChildren(input) {
    const type = code.getLinkHint(input);
    switch (type) {
        case LinkHint.StaticText: {
            const index = code.assumeLinkIndex(input);
            if (index !== 0) {
                code.throwError(code.generateInvalidCompilerStateError());
            }
            else {
                const string = code.assumeText(input);
                const path = code.resolveModulePath(input, string);
                const bluePath = code.createBlueString(path);
                code.pushRed(input, code.createRedValue(input, 'absolutePath', bluePath));
                code.attachBlue(input, 'absolutePath', bluePath);
                code.addTask(input.base, () => {
                    code.handle_codeCard(input.base, path);
                });
            }
            break;
        }
        case LinkHint.StaticTerm: {
            const term = code.resolveTermString(input);
            switch (term) {
                case 'find':
                case 'take':
                    code.process_codeCard_load_find(input);
                    break;
                case 'load':
                    code.process_codeCard_load(input);
                    break;
                case 'bear':
                    code.process_codeCard_load_bear(input);
                    break;
                default:
                    code.throwError(code.generateUnknownTermError(input));
            }
            break;
        }
        default:
            code.throwError(code.generateUnhandledNestCaseError(input, type));
    }
}
//# sourceMappingURL=index.js.map
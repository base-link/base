import { Mesh, code, } from '~';
export function load_codeCard_form(load) {
    const container = code.createContainerScope(load);
    const scope = code.createStepScope(container);
    const red = code.pushRed(load, code.createRedGather(load, 'class'));
    const blue = code.pushBlue(load, 'classes', {
        callbacks: code.createBlueArray(load),
        interfaces: code.createBlueArray(load),
        methods: code.createBlueArray(load),
        parents: code.createBlueArray(load),
        properties: code.createBlueArray(load),
        type: Mesh.Class,
        typeInputs: code.createBlueArray(load),
    });
    const scopeInput = code.withScope(load, scope);
    const colorInput = code.withColors(scopeInput, { blue, red });
    code.assumeNest(colorInput).forEach((nest, index) => {
        code.addTask(colorInput.base, () => {
            code.load_codeCard_form_nestedChildren(code.withLink(colorInput, nest, index));
        });
    });
}
export function load_codeCard_form_nestedChildren(load) {
    const type = code.getLinkHint(load);
    if (type === 'static-term') {
        const index = code.assumeLinkIndex(load);
        if (index === 0) {
            code.load_first_staticTerm(load, 'name');
        }
        else {
            const term = code.assumeTermString(load);
            switch (term) {
                case 'link':
                    code.load_codeCard_link(load, 'properties');
                    break;
                case 'task':
                    code.load_codeCard_task(load, 'methods');
                    break;
                case 'head':
                    code.load_codeCard_head(load);
                    break;
                // case 'wear':
                //   code.load_codeCard_form_wear(load)
                //   break
                case 'base':
                    code.load_codeCard_form_base(load);
                    break;
                case 'case':
                    code.load_codeCard_formCase(load);
                    break;
                // case 'fuse':
                //   code.load_codeCard_fuse(load)
                //   break
                case 'hold':
                    code.load_codeCard_hold(load);
                    break;
                case 'stem':
                    code.load_codeCard_stem(load);
                    break;
                case 'note':
                    code.load_codeCard_note(load);
                    break;
                case 'like':
                    code.load_codeCard_like(load);
                    break;
                default:
                    code.throwError(code.generateUnknownTermError(load));
            }
        }
    }
    else {
        code.throwError(code.generateUnhandledNestCaseError(load, type));
    }
}
//# sourceMappingURL=index.js.map
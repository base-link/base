export function load_codeCard_task(load, property = 'functions') {
    const container = code.createContainerScope(load);
    const scope = code.createStepScope(container);
    const scopeInput = code.withScope(load, scope);
    const red = code.pushRed(load, code.createRedGather(load, property));
    const blue = code.pushBlue(load, property, {
        functions: code.createBlueArray(load),
        loads: code.createBlueArray(load),
        steps: code.createBlueArray(load),
        type: Mesh.Function,
        typeInputs: code.createBlueArray(load),
    });
    const colorInput = code.withColors(scopeInput, { blue, red });
    code.assumeNest(colorInput).forEach((nest, index) => {
        code.addTask(load.base, () => {
            code.load_codeCard_task_nestedChildren(code.withLink(colorInput, nest, index));
        });
    });
}
export function load_codeCard_task_nestedChildren(load) {
    const type = code.getLinkHint(load);
    switch (type) {
        case LinkHint.DynamicTerm: {
            const index = code.assumeLinkIndex(load);
            if (index === 0) {
                code.load_dynamicTerm(load);
            }
            else {
                code.throwError(code.generateUnhandledNestCaseError(load, type));
            }
            break;
        }
        case LinkHint.StaticTerm: {
            const index = code.assumeLinkIndex(load);
            if (index === 0) {
                code.load_first_staticTerm(load, 'name');
                return;
            }
            const term = code.assumeTermString(load);
            switch (term) {
                case 'take':
                    code.load_codeCard_link(load);
                    break;
                case 'task':
                    code.load_codeCard_task(load);
                    break;
                case 'head':
                    code.load_codeCard_head(load);
                    break;
                case 'free':
                    code.load_codeCard_task_free(load);
                    break;
                case 'call':
                    code.load_codeCard_call(load);
                    break;
                case 'save':
                    code.load_codeCard_save(load);
                    break;
                case 'back':
                    code.load_codeCard_task_back(load);
                    break;
                case 'hide':
                    code.load_codeCard_hide(load);
                    break;
                case 'wait':
                    code.load_codeCard_wait(load);
                    break;
                case 'risk':
                    code.load_codeCard_risk(load);
                    break;
                case 'base':
                    code.load_codeCard_task_base(load);
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
                default:
                    code.throwError(code.generateUnknownTermError(load));
            }
            break;
        }
        default:
            code.throwError(code.generateUnhandledNestCaseError(load, type));
    }
}
//# sourceMappingURL=index.js.map
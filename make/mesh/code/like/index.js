export function load_codeCard_like(load) {
    const red = code.pushRed(load, code.createRedGather(load, 'definedType'));
    const blue = code.attachBlue(load, 'definedType', {
        bind: [],
        type: Mesh.ClassReference,
    });
    const childInput = code.withColors(load, { blue, red });
    code.assumeNest(load).forEach((nest, index) => {
        code.addTask(load.base, () => {
            load_codeCard_like_nestedChildren(code.withLink(childInput, nest, index));
        });
    });
}
export function load_codeCard_like_free(load) { }
export function load_codeCard_like_head(load) { }
export function load_codeCard_like_like(load) { }
export function load_codeCard_like_list(load) { }
export function load_codeCard_like_mesh(load) { }
export function load_codeCard_like_nestedChildren(load) {
    const type = code.getLinkHint(load);
    switch (type) {
        case LinkHint.DynamicTerm: {
            const index = code.assumeLinkIndex(load);
            if (index === 0) {
                code.load_first_dynamicTerm(load, 'name');
            }
            else {
                code.load_dynamicTerm(load);
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
                case 'head':
                    code.load_codeCard_head(load);
                    break;
                case 'like':
                    code.load_codeCard_like_like(load);
                    break;
                case 'list':
                    code.load_codeCard_like_list(load);
                    break;
                case 'mesh':
                    code.load_codeCard_like_mesh(load);
                    break;
                case 'take':
                    code.load_codeCard_like_take(load);
                    break;
                case 'free':
                    code.load_codeCard_like_free(load);
                    break;
                case 'term':
                    code.load_codeCard_like_term(load);
                    break;
                case 'link':
                    // code.load_codeCard_link(load)
                    break;
                case 'task':
                    code.load_codeCard_task(load);
                    break;
                case 'stem':
                    code.load_codeCard_stem(load);
                    break;
                default:
                    code.throwError(code.generateUnhandledTermCaseError(load));
            }
            break;
        }
        default:
            code.throwError(code.generateUnhandledNestCaseError(load, type));
    }
}
export function load_codeCard_like_take(load) { }
export function load_codeCard_like_term(load) { }
//# sourceMappingURL=index.js.map
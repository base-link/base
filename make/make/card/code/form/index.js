import card from '../../../../make/card.js';
import tool from '../../../../make/tool.js';
export function load_codeCard_form(load) {
    const container = card.createContainerScope(load);
    const scope = card.createStepScope(container);
    const red = card.pushRed(load, card.createRedGather(load, 'class'));
    const blue = card.pushBlue(load, 'classes', {
        callbacks: card.createBlueArray(load),
        interfaces: card.createBlueArray(load),
        methods: card.createBlueArray(load),
        parents: card.createBlueArray(load),
        properties: card.createBlueArray(load),
        type: Mesh.Class,
        typeInputs: card.createBlueArray(load),
    });
    const scopeInput = card.withScope(load, scope);
    const colorInput = card.withColors(scopeInput, { blue, red });
    card.assumeNest(colorInput).forEach((nest, index) => {
        tool.loadTask(colorInput.base, () => {
            card.load_codeCard_form_nestedChildren(card.withLink(colorInput, nest, index));
        });
    });
}
export function load_codeCard_form_nestedChildren(load) {
    const type = card.getLinkHint(load);
    if (type === 'static-term') {
        const index = card.loadLinkIndex(load);
        if (index === 0) {
            card.load_first_staticTerm(load, 'name');
        }
        else {
            const term = card.assumeTermString(load);
            switch (term) {
                case 'link':
                    card.load_codeCard_link(load, 'properties');
                    break;
                case 'task':
                    card.load_codeCard_task(load, 'methods');
                    break;
                case 'head':
                    card.load_codeCard_head(load);
                    break;
                // case 'wear':
                //   card.load_codeCard_form_wear(load)
                //   break
                case 'base':
                    card.load_codeCard_form_base(load);
                    break;
                case 'case':
                    card.load_codeCard_formCase(load);
                    break;
                // case 'fuse':
                //   card.load_codeCard_fuse(load)
                //   break
                case 'hold':
                    card.load_codeCard_hold(load);
                    break;
                case 'stem':
                    card.load_codeCard_stem(load);
                    break;
                case 'note':
                    card.load_codeCard_note(load);
                    break;
                case 'like':
                    card.load_codeCard_like(load);
                    break;
                default:
                    card.throwError(card.generateUnknownTermError(load));
            }
        }
    }
    else {
        card.throwError(card.generateUnhandledNestCaseError(load, type));
    }
}
//# sourceMappingURL=index.js.map
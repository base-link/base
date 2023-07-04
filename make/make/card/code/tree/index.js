import card from '../../../../make/card.js';
import tool from '../../../../make/tool.js';
export function load_codeCard_tree(load) {
    const red = card.pushRed(load, card.createRedGather(load, 'template'));
    const blue = card.pushBlue(load, 'templates', {
        hooks: card.createBlueArray(load),
        loads: card.createBlueArray(load),
        type: Mesh.Template,
    });
    const colorInput = card.withColors(load, { blue, red });
    card.assumeNest(colorInput).forEach((nest, index) => {
        tool.loadTask(load.base, () => {
            card.load_codeCard_tree_nestedChildren(card.withLink(colorInput, nest, index));
        });
    });
}
export function load_codeCard_tree_nestedChildren(load) {
    const type = card.getLinkHint(load);
    if (type === 'static-term') {
        const name = card.assumeTermString(load);
        const index = card.loadLinkIndex(load);
        if (index === 0) {
            card.attachStaticTerm(load, 'name', name);
        }
        else {
            switch (name) {
                case 'take':
                    card.load_codeCard_link(load);
                    break;
                case 'hook':
                    card.load_codeCard_tree_hook(load);
                    break;
                case 'head':
                    card.load_codeCard_head(load);
                    break;
                default:
                    card.throwError(card.generateUnknownTermError(load));
            }
        }
    }
    else {
        card.throwError(card.generateUnhandledTermCaseError(load));
    }
}
//# sourceMappingURL=index.js.map
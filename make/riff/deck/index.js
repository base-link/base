import { Link, LinkHint, Mesh, code, } from '../../index.js';
export * from './deck/index.js';
export function handle_deckCard(base, link) {
    code.process_deckCard(base, link);
}
/**
 * Entrypoint function.
 */
export function process_deckCard(base, link) {
    const parse = code.loadLinkModule(base, link);
    const card = base.card(link);
    const container = code.createTopContainerScope();
    const scope = code.createStepScope(container);
    const red = code.createTopRed({
        children: [],
        scope,
        type: Mesh.Gather,
    });
    const blue = code.createTopBlue();
    const baseModule = {
        ...parse,
        base,
        blue,
        id: card.id,
        isModule: true,
        link: code.createTopLink(parse.linkTree),
        red,
        scope,
    };
    baseModule.module = baseModule;
    baseModule.environment = code.createEnvironment(baseModule);
    const module = baseModule;
    code.assertString(module.text);
    code.assertLink(module.linkTree, Link.Tree);
    card.bind(module);
    const packageBlue = code.attachBlue(module, 'definitions', {
        type: Mesh.PackageModule,
    });
    const colorInput = code.withColors(module, { blue: packageBlue });
    if (module.text.trim()) {
        module.linkTree.nest.forEach((nest, index) => {
            code.addTask(base, () => {
                code.process_deckCard_nestedChildren(code.withLink(colorInput, nest, index));
            });
        });
    }
}
export function process_deckCard_nestedChildren(input) {
    const type = code.getLinkHint(input);
    switch (type) {
        case LinkHint.StaticTerm: {
            code.process_deckCard_staticTerm(input);
            break;
        }
        default:
            code.throwError(code.generateUnhandledNestCaseError(input, type));
    }
}
export function process_deckCard_staticTerm(input) {
    const term = code.resolveTermString(input);
    switch (term) {
        case 'deck':
            code.process_deckCard_deck(input);
            break;
        default:
            code.throwError(code.generateUnhandledTermCaseError(input));
    }
}
//# sourceMappingURL=index.js.map
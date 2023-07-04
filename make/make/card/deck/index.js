export * from './deck/index.js';
export function load_deckCard(base, link) {
    const linkText = card.readLinkText(base, link);
    const hook = hold;
    const container = card.createTopContainerScope();
    const scope = card.createStepScope(container);
    const red = card.createTopRed({
        children: [],
        scope,
        type: Mesh.Gather,
    });
    const blue = card.createTopBlue();
    const baseModule = {
        ...parse,
        base,
        blue,
        id: card.id,
        isModule: true,
        link: card.createTopLink(parse.linkTree),
        red,
        scope,
    };
    baseModule.module = baseModule;
    baseModule.environment = card.createEnvironment(baseModule);
    const module = baseModule;
    card.assertString(module.text);
    card.assertLink(module.linkTree, Link.Tree);
    card.bind(module);
    const packageBlue = card.attachBlue(module, 'definitions', {
        type: Mesh.PackageModule,
    });
    const colorInput = card.withColors(module, { blue: packageBlue });
    if (module.text.trim()) {
        module.linkTree.nest.forEach((nest, index) => {
            tool.loadTask(base, () => {
                card.load_deckCard_nestedChildren(card.withLink(colorInput, nest, index));
            });
        });
    }
}
export function load_deckCard_nestedChildren(load) {
    const type = card.getLinkHint(load);
    switch (type) {
        case LinkHint.StaticTerm: {
            card.load_deckCard_staticTerm(load);
            break;
        }
        default:
            card.throwError(card.generateUnhandledNestCaseError(load, type));
    }
}
export function load_deckCard_staticTerm(load) {
    const term = card.resolveTermString(load);
    switch (term) {
        case 'deck':
            card.load_deckCard_deck(load);
            break;
        default:
            card.throwError(card.generateUnhandledTermCaseError(load));
    }
}
//# sourceMappingURL=index.js.map
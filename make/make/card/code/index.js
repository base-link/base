import card from '../../../make/card.js';
import tool from '../../../make/tool.js';
export function loadMintFile(deck) {
    if (deck.mint) {
        return card.readFileLink(path.relative(deck.mint, deck.link));
    }
}
export function load_codeCard(base, link) {
    const linkText = card.readLinkText(base, link);
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
        callbacks: card.createBlueArray(module),
        classInterfaces: card.createBlueArray(module),
        classes: card.createBlueArray(module),
        components: card.createBlueArray(module),
        constants: card.createBlueArray(module),
        exports: card.createBlueArray(module),
        functions: card.createBlueArray(module),
        imports: card.createBlueArray(module),
        nativeClassInterfaces: card.createBlueArray(module),
        public: card.createBlueMap(module, {
            classInterfaces: card.createBlueArray(module),
            classes: card.createBlueArray(module),
            components: card.createBlueArray(module),
            constants: card.createBlueArray(module),
            functions: card.createBlueArray(module),
            nativeClassInterfaces: card.createBlueArray(module),
            templates: card.createBlueArray(module),
            tests: card.createBlueArray(module),
        }),
        templates: card.createBlueArray(module),
        tests: card.createBlueArray(module),
        type: Mesh.CodeModule,
    });
    const colorInput = card.withColors(module, { blue: packageBlue });
    if (module.text.trim()) {
        module.linkTree.nest.forEach((nest, index) => {
            tool.loadTask(base, () => {
                card.load_codeCard_nestedChildren(card.withLink(colorInput, nest, index));
            });
        });
    }
}
export function load_codeCard_nestedChildren(load) {
    const type = card.getLinkHint(load);
    switch (type) {
        case LinkHint.DynamicTerm: {
            card.load_dynamicTerm(load);
            break;
        }
        case LinkHint.StaticTerm:
            card.load_codeCard_nestedChildren_term(load);
            break;
        default: {
            card.throwError(card.generateUnhandledNestCaseError(load, type));
        }
    }
}
export function load_codeCard_nestedChildren_term(load) {
    const term = card.resolveTermString(load);
    switch (term) {
        case 'bear': {
            card.load_codeCard_bear(load);
            break;
        }
        case 'load': {
            card.load_codeCard_load(load);
            break;
        }
        // case 'fuse': {
        //   card.load_codeCard_fuse(load)
        //   break
        // }
        case 'tree': {
            card.load_codeCard_tree(load);
            break;
        }
        case 'face': {
            card.load_codeCard_face(load);
            break;
        }
        case 'host': {
            card.load_codeCard_host(load);
            break;
        }
        case 'form': {
            card.load_codeCard_form(load);
            break;
        }
        case 'suit': {
            card.load_codeCard_suit(load);
            break;
        }
        case 'task': {
            card.load_codeCard_task(load);
            break;
        }
        case 'note': {
            card.load_codeCard_note(load);
            break;
        }
        default: {
            card.throwError(card.generateUnhandledTermCaseError(load));
        }
    }
}
//# sourceMappingURL=index.js.map
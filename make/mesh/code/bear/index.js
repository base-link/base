export function bearImports(load) {
    const exportNode = load.blue.node;
    code.assertBlue(exportNode, Mesh.Export);
    code.assertBlueString(exportNode.absolutePath);
    const card = load.base.card(exportNode.absolutePath.value);
    code.assertRecord(card);
    const id = card.id;
    const schemas = [
        code.createCodeModulePublicCollectionObserverSchema('classes', handleClassesGathered),
        code.createCodeModulePublicCollectionObserverSchema('classInterfaces', handleInterfacesGathered),
        code.createCodeModulePublicCollectionObserverSchema('functions', handleFunctionsGathered),
        code.createCodeModulePublicCollectionObserverSchema('templates', handleTemplatesGathered),
        // code.createCodeModulePublicCollectionObserverSchema(
        //   'variables',
        //   handleVariablesGathered,
        // ),
        code.createCodeModuleObjectNameObserverSchema('classes', handleClass),
        code.createCodeModuleObjectNameObserverSchema('classInterfaces', handleInterface),
        code.createCodeModuleObjectNameObserverSchema('functions', handleFunction),
        code.createCodeModuleObjectNameObserverSchema('templates', handleTemplate),
        // code.createCodeModuleObjectNameObserverSchema(
        //   'variables',
        //   handleVariable,
        // ),
    ];
    function handleClassesGathered(value) {
        code.assertGenericBlue(value);
        code.triggerObjectBindingUpdate(load, value);
    }
    function handleInterfacesGathered(value) {
        code.assertGenericBlue(value);
        code.triggerObjectBindingUpdate(load, value);
    }
    function handleFunctionsGathered(value) {
        code.assertGenericBlue(value);
        code.triggerObjectBindingUpdate(load, value);
    }
    function handleTemplatesGathered(value) {
        code.assertGenericBlue(value);
        code.triggerObjectBindingUpdate(load, value);
    }
    function handleVariablesGathered(value) {
        code.assertGenericBlue(value);
        code.triggerObjectBindingUpdate(load, value);
    }
    function handleClass(value) {
        code.assertBlue(value, Mesh.Class);
        code.assertBlue(load.module, Mesh.CodeModule);
        load.module.classes.value.push(value);
        load.module.public.value.classes.value.push(value);
    }
    function handleInterface(value) {
        code.assertBlue(value, Mesh.ClassInterface);
        code.assertBlue(load.module, Mesh.CodeModule);
        load.module.classInterfaces.value.push(value);
        load.module.public.value.classInterfaces.value.push(value);
    }
    function handleFunction(value) {
        code.assertBlue(value, Mesh.Function);
        code.assertBlue(load.module, Mesh.CodeModule);
        load.module.functions.value.push(value);
        load.module.public.value.functions.value.push(value);
    }
    function handleTemplate(value) {
        code.assertBlue(value, Mesh.Template);
        code.assertBlue(load.module, Mesh.CodeModule);
        load.module.templates.value.push(value);
        load.module.public.value.templates.value.push(value);
    }
    function handleVariable(value) {
        code.assertBlue(value, Mesh.Variable);
        code.assertBlue(load.module, Mesh.CodeModule);
    }
    schemas.forEach(schema => {
        code.bindSchema({ ...load, moduleId: id }, schema);
    });
}
export function load_codeCard_bear(load) {
    const red = code.pushRed(load, code.createRedGather(load, 'bear'));
    const blue = code.pushBlue(load, 'exports', {
        hides: code.createBlueArray(load),
        type: Mesh.Export,
    });
    const colorInput = code.withColors(load, { blue, red });
    const nest = code.assumeNest(colorInput);
    nest.forEach((nest, index) => {
        code.addTask(load.base, () => {
            code.load_codeCard_bear_nestedChildren(code.withLink(colorInput, nest, index));
        });
    });
    code.addTask(load.base, () => {
        code.bearImports(colorInput);
    });
}
export function load_codeCard_bear_nestedChildren(load) {
    const type = code.getLinkHint(load);
    switch (type) {
        case LinkHint.StaticText: {
            code.load_codeCard_bear_nestedChildren_text(load);
            break;
        }
        case LinkHint.DynamicText: {
            code.load_codeCard_bear_nestedChildren_dynamicText(load);
            break;
        }
        case LinkHint.StaticTerm: {
            const term = code.resolveTermString(load);
            switch (term) {
                case 'hide':
                    code.load_codeCard_bear_hide(load);
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
export function load_codeCard_bear_nestedChildren_dynamicText(load) {
    const nest = code.assumeLink(load, Link.Text);
    code.pushRed(load, code.createRedGather(load, 'absolute-path', [nest]));
    const text = code.assumeText(load);
    const path = code.resolveModulePath(load, text);
    const string = code.createBlueString(path);
    code.attachBlue(load, 'absolutePath', string);
    code.addTask(load.base, () => {
        code.handle_codeCard(load.base, path);
    });
}
export function load_codeCard_bear_nestedChildren_text(load) {
    const text = code.assumeText(load);
    const path = code.resolveModulePath(load, text);
    const string = code.createBlueString(path);
    code.pushRed(load, code.createRedGather(load, 'absolute-path', [string]));
    code.attachBlue(load, 'absolutePath', string);
    code.addTask(load.base, () => {
        code.handle_codeCard(load.base, path);
    });
}
//# sourceMappingURL=index.js.map
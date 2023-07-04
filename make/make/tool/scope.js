export const DEFAULT_CONTAINER_SCOPE = {
// base: { definedType: { name: code.createMeshString('base') } },
// path: { definedType: { name: code.createMeshString('string') } },
// text: { definedType: { name: code.createMeshString('string') } },
};
export function createContainerScope(load, declarations = {}) {
    return {
        declarations,
        parent: load.scope.container,
        steps: [],
    };
}
export function createStepScope(container, declarations = {}) {
    const previous = container.steps[container.steps.length - 1];
    const step = {
        container,
        declarations,
        previous,
    };
    container.steps.push(step);
    return step;
}
export function createTopContainerScope(declarations = {}) {
    return {
        declarations,
        steps: [],
    };
}
export function declareScopeVariable(scope, variable) {
    scope.declarations[variable.name] = variable;
}
export function hasScopeVariable(scope, name) {
    if (name in scope.declarations) {
        return true;
    }
    else if (scope.previous) {
        return code.hasScopeVariable(scope.previous, name);
    }
    else {
        return false;
    }
}
export function setInferredScopeType(scope, property, type) {
    if (property in scope.declarations) {
        const declaration = scope.declarations[property];
        if (code.isRecord(declaration)) {
            declaration.inferredType = type;
        }
    }
    else if (scope.previous) {
        code.setInferredScopeType(scope.previous, property, type);
    }
    else {
        code.throwError(code.generateEnvironmentMissingPropertyError(property));
    }
}
export function withScope(load, scope) {
    return {
        ...load,
        scope,
    };
}
//# sourceMappingURL=scope.js.map
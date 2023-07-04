import { Base } from '../form/base.js';
export function assertEnvironment(object) {
    if (!code.isEnvironment(object)) {
        code.throwError(code.generateObjectNotTypeError(object, ['environment']));
    }
}
export function createBase() {
    return new Base();
}
export function createEnvironment(bindings, parent) {
    return {
        bindings,
        isEnv: true,
        parent,
    };
}
export function getEnvironmentProperty(environment, name) {
    let source = environment;
    while (source) {
        if (name in source.bindings) {
            return source.bindings[name];
        }
        else if (source.parent) {
            source = source.parent;
        }
        else {
            return;
        }
    }
}
export function getEnvironmentVariable(base, key) {
    return base.env[key];
}
export function hasEnvironmentVariable(environment, name) {
    let source = environment;
    while (source) {
        if (name in source.bindings) {
            return true;
        }
        else if (source.parent) {
            source = source.parent;
        }
        else {
            return false;
        }
    }
    return false;
}
export function isEnvironment(object) {
    return object.isEnv === true;
}
export function setCachedFile(base, path, content) {
    base.textMap[path] = content;
}
export function setEnvironmentProperty(scope, property, value) {
    if (property in scope.bindings) {
        scope.bindings[property] = value;
    }
    else if (scope.parent) {
        code.setEnvironmentProperty(scope.parent, property, value);
    }
    else {
        code.throwError(code.generateEnvironmentMissingPropertyError(property));
    }
}
export function setEnvironmentVariable(base, key, value) {
    base.env[key] = value;
}
export function withEnvironment(load, bindings) {
    return {
        ...load,
        environment: code.createEnvironment(bindings, load.environment),
    };
}
//# sourceMappingURL=environment.js.map
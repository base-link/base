import { Color, MESH_TERM_LINK_TYPE, Mesh, SiteObserverState, code, } from '~';
export function assertBlue(object, type, name) {
    if (!code.isBlue(object, type)) {
        code.throwError(code.generateIncorrectlyTypedVariable('blue', name));
    }
}
export function assertBlueArray(array, type, name) {
    array.forEach(object => {
        if (!code.isBlue(object, type)) {
            code.throwError(code.generateIncorrectlyTypedVariable('blue', name));
        }
    });
}
export function assertBlueBoolean(object) {
    code.assertBlue(object, [
        Mesh.Boolean,
        Mesh.String,
        Mesh.StringArray,
        Mesh.Term,
        Mesh.Path,
    ]);
}
export function assertBlueOrUndefined(object, type, name) {
    if (code == undefined) {
        return;
    }
    code.assertBlue(object, type, name);
}
export function assertBluePath(object) {
    code.assertBlue(object, [Mesh.StringArray, Mesh.Path]);
}
export function assertBlueStepArray(array) {
    code.assertBlueArray(array, [
        Mesh.Call,
        Mesh.Assertion,
        Mesh.Constant,
    ]);
}
export function assertBlueString(object) {
    code.assertBlue(object, [Mesh.String]);
}
export function assertBlueTerm(object) {
    code.assertBlue(object, MESH_TERM_LINK_TYPE);
}
export function assertBlueText(object) {
    code.assertBlue(object, [Mesh.String, Mesh.Text]);
}
export function assertGenericBlue(object, name) {
    if (!code.isGenericBlue(object)) {
        code.throwError(code.generateIncorrectlyTypedVariable('blue', name));
    }
}
export function assertRed(object, type, property) {
    if (!code.isRed(object, type)) {
        code.throwError(code.generateIncorrectlyTypedVariable('red', property));
    }
}
export function attachBlue(input, property, node) {
    const child = {
        node: {
            ...node,
            color: Color.Blue,
            state: SiteObserverState.Initialized,
        },
        parent: input.blue,
    };
    const parent = child.parent;
    code.assertRecord(parent);
    child.node.attachedAs = property;
    const parentNode = parent.node;
    if (code.isBlue(parentNode, Mesh.Map)) {
        parentNode.value[property] = child.node;
    }
    else {
        ;
        parent.node[property] = child.node;
    }
    return child;
}
export function attachBlueValue(input, property, node) {
    code.assertRecord(input.blue);
    if (code.isGenericBlue(node)) {
        node.attachedAs = property;
    }
    const childNode = input.blue.node;
    if (code.isBlue(childNode, Mesh.Map)) {
        childNode.value[property] = node;
    }
    else {
        ;
        childNode[property] = node;
    }
}
export function createBlue(input, node) {
    return {
        node: {
            ...node,
            color: Color.Blue,
            state: SiteObserverState.Initialized,
        },
        parent: input.blue,
    };
}
export function createBlueArray(input, value = []) {
    return {
        color: Color.Blue,
        scope: input.scope,
        state: SiteObserverState.Initialized,
        type: Mesh.Array,
        value,
    };
}
export function createBlueBoolean(value) {
    return {
        color: Color.Blue,
        state: SiteObserverState.RuntimeComplete,
        type: Mesh.Boolean,
        value,
    };
}
export function createBlueMap(input, value) {
    return {
        color: Color.Blue,
        scope: input.scope,
        state: SiteObserverState.Initialized,
        type: Mesh.Map,
        value,
    };
}
export function createBlueString(value) {
    return {
        color: Color.Blue,
        state: SiteObserverState.RuntimeComplete,
        type: Mesh.String,
        value,
    };
}
export function createBlueStringArray(value) {
    return {
        color: Color.Blue,
        state: SiteObserverState.RuntimeComplete,
        type: Mesh.StringArray,
        value,
    };
}
export function createBlueText(input, value) {
    return {
        color: Color.Blue,
        scope: input.scope,
        state: SiteObserverState.Initialized,
        type: Mesh.Text,
        value,
    };
}
export function createRedGather(input, name, children = []) {
    return {
        children,
        color: Color.Red,
        name,
        scope: input.scope,
        type: Mesh.Gather,
    };
}
export function createRedValue(input, name, value) {
    return {
        color: Color.Red,
        name,
        scope: input.scope,
        type: Mesh.Value,
        value,
    };
}
export function createTopBlue() {
    return {
        node: {
            color: Color.Blue,
            state: SiteObserverState.Initialized,
            type: Mesh.Map,
            value: {},
        },
    };
}
export function createTopRed(node) {
    return {
        node: {
            ...node,
            color: Color.Red,
        },
    };
}
export function getBlueValue(input, property) {
    code.assertRecord(input.blue);
    return input.blue.node[property];
}
export function hasBlueValue(input, property) {
    code.assertRecord(input.blue);
    return property in input.blue.node;
}
export function isBlue(object, type) {
    const array = Array.isArray(type) ? type : [type];
    return (code.isRecord(object) &&
        'type' in object &&
        code.isString(object.type) &&
        array.includes(object.type) &&
        object.color === Color.Blue);
}
export function isGenericBlue(object) {
    return (code.isRecord(object) &&
        'color' in object &&
        code.isString(object.color) &&
        object.color === Color.Blue);
}
export function isRed(object, type) {
    const array = Array.isArray(type) ? type : [type];
    return (code.isRecord(object) &&
        'type' in object &&
        code.isString(object.type) &&
        array.includes(object.type) &&
        object.color === Color.Red);
}
export function pushBlue(input, property, node) {
    const child = {
        node: {
            ...node,
            attachedAs: '*',
            color: Color.Blue,
            state: SiteObserverState.Initialized,
        },
        parent: input.blue,
    };
    if (child.parent) {
        const node = child.parent.node;
        const array = node[property];
        array.value.push(child.node);
    }
    code.triggerObjectBindingUpdate;
    return child;
}
export function pushRed(input, node) {
    const child = {
        node: {
            ...node,
            color: Color.Red,
        },
        parent: input.red,
    };
    if (child.parent) {
        const node = child.parent.node;
        code.assertRed(node, Mesh.Gather);
        node.children.push(child.node);
    }
    return child;
}
export function withColors(input, { red, blue }) {
    const newInput = { ...input };
    if (red) {
        newInput.red = red;
    }
    if (blue) {
        newInput.blue = blue;
    }
    return newInput;
}
//# sourceMappingURL=color.js.map
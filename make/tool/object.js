import _ from 'lodash';
export function assertRecord(object) {
    if (!code.isRecord(object)) {
        code.throwError(code.generateIncorrectlyTypedVariable('record'));
    }
}
export function getNestedProperty(object, path) {
    let value = object;
    path.forEach(part => {
        if (code.isRecord(value)) {
            value = value[part];
        }
        else {
            value = undefined;
        }
    });
    return value;
}
export function getProperty(object, path) {
    if (code.isRecord(object) && path in object) {
        return object[path];
    }
}
export function getWithObjectDefault(obj, name) {
    let value = obj[name];
    if (!code.isRecord(value)) {
        value = obj[name] = {};
    }
    code.assertRecord(value);
    return value;
}
export function insertIntoRed(input, value) {
    const red = input.red.node;
    code.assertRed(red, Mesh.Gather);
    red.children.push(value);
}
export function isObjectWithType(object) {
    return code.isRecord(object) && 'type' in object;
}
export function isRecord(object) {
    return _.isObject(object);
}
export const mergeObjects = _.merge;
//# sourceMappingURL=object.js.map
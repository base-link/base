import { LINK_TYPE, code, } from '~';
export function assertGenericLink(object, name) {
    if (!code.isGenericLink(object)) {
        code.throwError(code.generateIncorrectlyTypedVariable('link', name));
    }
}
export function assertLink(object, type, name) {
    if (!code.isLink(object, type)) {
        code.throwError(code.generateIncorrectlyTypedVariable('link', name));
    }
}
export function assumeGenericLink(object, name) {
    code.assertGenericLink(object, name);
    return object;
}
export function assumeLink(input, type, name) {
    const nest = input.link.element;
    code.assertLink(nest, type, name);
    return nest;
}
export function createLink(input, link, index) {
    return {
        element: link,
        index,
        parent: input.link,
    };
}
export function createTopLink(link, index) {
    return {
        element: link,
        index,
    };
}
export function isGenericLink(object) {
    return (code.isObjectWithType(object) &&
        LINK_TYPE.includes(object.type));
}
export function isLink(object, type) {
    return (code.isObjectWithType(object) &&
        object.type === type);
}
export function withLink(input, element, index) {
    return {
        ...input,
        link: code.createLink(input, element, index),
    };
}
//# sourceMappingURL=link.js.map
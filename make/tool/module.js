import { code, } from '~';
export function assertModule(object) {
    if (!code.isModule(object)) {
        code.throwError(code.generateObjectNotTypeError(object, ['module']));
    }
}
export function hasModuleInitialized(module) {
    return Object.keys(module.seed).length > 0;
}
export function isModule(object) {
    return object.isModule === true;
}
export function loadLinkModule(base, path) {
    const text = code.readTextFile(base, path);
    const data = code.parseLinkText({ path, text });
    const directory = code.getLinkHost(path);
    return {
        directory,
        ...data,
    };
}
export function testHaveCard(base, path) {
    return path in base.cardsByPath;
}
//# sourceMappingURL=module.js.map
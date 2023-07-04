import { Base } from './base.js';
export * from './base.js';
export * from './card.js';
export function createBase() {
    return new Base();
}
export function getEnvironmentVariable(base, key) {
    return base.env[key];
}
export function setCachedFile(base, path, content) {
    base.textMap[path] = content;
}
export function setEnvironmentVariable(base, key, value) {
    base.env[key] = value;
}
//# sourceMappingURL=index.js.map
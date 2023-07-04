import fs from 'fs';
import glob from 'glob';
import pathResolver from 'path';
import { fileURLToPath } from 'url';
export const SOURCE_MAP_MESH = {};
const __filename = fileURLToPath(import.meta.url);
export const __dirname = pathResolver.dirname(__filename);
export async function findFilePathsRecursively(pattern) {
    return glob.sync(pattern);
}
export function loadLink(load, loadPath) {
    const card = load.module;
    const path = code.findPath(loadPath, card.directory);
    if (!path) {
        code.throwError(code.generateUnresolvedPathError(load, loadPath));
    }
    code.assertString(path, 'path');
    return path;
}
export function readLinkHost(link) {
    return pathResolver.dirname(link);
}
export function readTextFile(base, link) {
    return base.textMap[link] ?? fs.readFileSync(link, 'utf-8');
}
export function resolveDirectoryPath(path) {
    return pathResolver.dirname(path);
}
export function resolveModulePath(load, text) {
    const { module } = load;
    const path = code.findPath(text, module.directory);
    if (!path) {
        code.throwError(code.generateUnresolvedPathError(load, text));
    }
    code.assertString(path);
    return path;
}
export function resolveNativePath(path, context) {
    const relative = pathResolver.relative(process.cwd(), pathResolver.resolve(context, path));
    return relative.startsWith('.') ? relative : `./${relative}`;
}
//# sourceMappingURL=file.js.map
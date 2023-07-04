import fs from 'fs';
import glob from 'glob';
import pathResolve, { dirname } from 'path';
import smc from 'source-map';
import { fileURLToPath } from 'url';
export const SOURCE_MAP_MESH = {};
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export function assumePath(input, inputPath) {
    const card = input.module;
    const path = code.findPath(inputPath, card.directory);
    if (!path) {
        code.throwError(code.generateUnresolvedPathError(input, inputPath));
    }
    code.assertString(path, 'path');
    return path;
}
export async function findFilePathsRecursively(pattern) {
    return new Promise((res, rej) => {
        glob(pattern, (err, files) => {
            if (err) {
                return rej(err);
            }
            res(files);
        });
    });
}
/**
 * This is the core finding algorithm.
 */
export function findPath(link, context) {
    link = (context ? pathResolve.join(context, link) : link).replace(/\/$/, '');
    if (fs.existsSync(`${link}/base.link`)) {
        link = `${link}/base.link`;
    }
    else if (fs.existsSync(`${link}/deck.link`)) {
        link = `${link}/deck.link`;
    }
    else if (fs.existsSync(`${link}.link`)) {
        link = `${link}.link`;
    }
    else {
        return;
    }
    return link;
}
export function getLinkHost(link) {
    return pathResolve.dirname(link);
}
export async function loadSourceMaps() {
    const startDir = pathResolve.resolve(`${__dirname}/../../host`);
    const paths = await code.findFilePathsRecursively(`${startDir}/**/*.js`);
    for (const path of paths) {
        const mapContent = fs.readFileSync(`${path}.map`, 'utf-8');
        const json = JSON.parse(mapContent);
        const sm = await new smc.SourceMapConsumer(json);
        SOURCE_MAP_MESH[`file://${path}`] = sm;
    }
}
export function readTextFile(base, link) {
    return base.textMap[link] ?? fs.readFileSync(link, 'utf-8');
}
export function resolveDirectoryPath(path) {
    return pathResolve.dirname(path);
}
export function resolveModulePath(input, text) {
    const { module } = input;
    const path = code.findPath(text, module.directory);
    if (!path) {
        code.throwError(code.generateUnresolvedPathError(input, text));
    }
    code.assertString(path);
    return path;
}
export function resolveNativePath(path, context) {
    const relative = pathResolve.relative(process.cwd(), pathResolve.resolve(context, path));
    return relative.startsWith('.') ? relative : `./${relative}`;
}
//# sourceMappingURL=file.js.map
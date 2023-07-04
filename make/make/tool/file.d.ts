import smc from 'source-map';
import type { Base, SiteProcessInputType } from '~';
export declare const SOURCE_MAP_MESH: Record<string, smc.SourceMapConsumer>;
export declare const __dirname: string;
export declare function findFilePathsRecursively(pattern: string): Promise<Array<string>>;
/**
 * This is the core finding algorithm.
 */
export declare function findPath(link: string, context?: string): string | undefined;
export declare function getLinkHost(link: string): string;
export declare function loadLink(input: SiteProcessInputType, inputPath: string): string;
export declare function loadSourceMaps(): Promise<void>;
export declare function readTextFile(base: Base, link: string): string;
export declare function resolveDirectoryPath(path: string): string;
export declare function resolveModulePath(input: SiteProcessInputType, text: string): string;
export declare function resolveNativePath(path: string, context: string): string;

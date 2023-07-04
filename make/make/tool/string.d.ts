import { SiteProcessInputType } from '../..';
export declare function assertString(object: unknown, name?: string, path?: string): asserts object is string;
export declare function assertStringPattern(input: SiteProcessInputType, string: string, pattern: RegExp): void;
export declare function isString(object: unknown): object is string;

import { Base } from './base.js';
export * from './base.js';
export * from './card.js';
export declare function createBase(): Base;
export declare function getEnvironmentVariable(base: Base, key: string): unknown;
export declare function setCachedFile(base: Base, path: string, content: string): void;
export declare function setEnvironmentVariable(base: Base, key: string, value: unknown): void;

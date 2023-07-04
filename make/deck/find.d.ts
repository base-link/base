/// <reference types="node" />
import fs from 'fs';
export declare function findHostLink(link: string, base: string): string | void;
export declare function findLeadLink(linkBase: string): string | void;
export declare function findLink(link: string, base: string): string | void;
export declare const readLink: typeof fs.realpathSync.native;
export declare function testFile(dir: string): boolean;
export declare function testFileBase(file: string): boolean;

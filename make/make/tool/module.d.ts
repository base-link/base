import { Base, BaseCard, SiteModuleType, SiteCardCode } from '~';
export declare function assertModule(object: unknown): asserts object is SiteModuleType;
export declare function hasModuleInitialized(module: BaseCard): boolean;
export declare function isModule(object: unknown): object is SiteModuleType;
export declare function loadLinkModule(base: Base, path: string): SiteCardCode;
export declare function testHaveCard(base: Base, path: string): boolean;

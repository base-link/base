import { SiteProcessInputType } from '../..';
import type { SiteEnvironmentType } from '../..';
export declare function assertEnvironment(object: unknown): asserts object is SiteEnvironmentType;
export declare function createEnvironment(bindings: Record<string, unknown>, parent?: SiteEnvironmentType): SiteEnvironmentType;
export declare function getEnvironmentProperty(environment: SiteEnvironmentType, name: string | number | symbol): unknown;
export declare function hasEnvironmentVariable(environment: SiteEnvironmentType, name: string | number | symbol): boolean;
export declare function isEnvironment(object: unknown): object is SiteEnvironmentType;
export declare function setEnvironmentProperty(scope: SiteEnvironmentType, property: string, value: unknown): void;
export declare function withEnvironment(input: SiteProcessInputType, bindings: Record<string, unknown>): SiteProcessInputType;

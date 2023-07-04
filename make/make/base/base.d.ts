import { BaseCard, SiteObjectWatcherType } from '../..';
export { Base };
export type BaseCallbackType = {
    fork: string;
    hook: (site: string, fork: unknown) => void;
    link: string;
    site: string;
};
export type BaseEncounterParamsType = {
    hash: string;
    load: string;
    name: string;
    type: string;
};
export type BaseFreeType = () => void;
declare class Base {
    tasks: Array<() => void>;
    textMap: Record<string, string>;
    watchers: Record<number, Array<SiteObjectWatcherType>>;
    env: Record<string, unknown>;
    observersByModuleThenIdThenName: Record<string, Record<string, Record<string, unknown>>>;
    observersByModuleThenNameThenId: Record<string, Record<string, Record<string, unknown>>>;
    cardsByPath: Record<string, BaseCard>;
    cardsById: Record<number, BaseCard>;
    constructor();
    load(call: () => void): void;
    card(key: string | number): any;
}
export type BaseHookType = () => BaseFreeType;
export type BaseRequestParamsType = {
    fork: string;
    hash: string;
    hook: (site: string, fork: unknown) => void;
    link: string;
    name: string;
    site: string;
    type: string;
};

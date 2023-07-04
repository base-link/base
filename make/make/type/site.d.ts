import { Base, BlueArrayType, BlueMapType, BlueNodeType, Mesh } from '../..';
import type { BlueType, GreenClassReferenceType, LinkNodeType, LinkTreeType, RedType, YellowType } from '../..';
export type SiteBindingCountdownType = {
    dependencies: Array<string>;
    handle: SiteCallbackType;
};
export type SiteBlueType = SiteColorType<BlueType | BlueArrayType<BlueType> | BlueMapType<Record<string, BlueType | BlueArrayType<BlueType> | BlueMapType>>>;
export type SiteColorType<T> = {
    node: T;
    parent?: SiteColorType<T>;
};
export type SiteColorsType = {
    blue?: SiteBlueType;
    red?: SiteRedType;
};
export type SiteContainerScopeType = {
    declarations: Record<string, SiteVariableDeclarationType>;
    parent?: SiteContainerScopeType;
    steps: Array<SiteStepScopeType>;
};
export type SiteCreateInputType = {
    base: Base;
    bindings: Record<string, unknown>;
    module: SiteModuleBaseType;
    red: SiteRedType;
    scope: SiteStepScopeType;
};
export type SiteDependencyObserverParentType = {
    observer: SiteDependencyObserverType;
    remaining: number;
};
export type SiteDependencyObserverType = {
    children: Array<SiteDependencyObserverType | string>;
    node: LinkNodeType;
    parent?: SiteDependencyObserverParentType;
    path: Array<string>;
};
export type SiteEnvironmentType = {
    bindings: Record<string, unknown>;
    isEnv: true;
    parent?: SiteEnvironmentType;
};
export type SiteLinkType = {
    element: LinkNodeType;
    index?: number;
    parent?: SiteLinkType;
};
export type SiteModuleBaseType = {
    base: Base;
    directory: string;
    id: number;
    isModule: true;
    link: SiteLinkType;
    linkTree: LinkTreeType;
    path: string;
    text: string;
    textByLine: Array<string>;
};
export type SiteModuleBindingInputType = SiteProcessInputType & {
    moduleId: number;
};
export type SiteModuleType = SiteModuleBaseType & {
    blue: SiteBlueType;
    environment: SiteEnvironmentType;
    module: SiteModuleType;
    red: SiteRedType;
    scope: SiteStepScopeType;
};
export type SiteObjectWatcherHandleType = (value: unknown) => void;
export type SiteObjectWatcherPropertiesType = {
    [name: string]: SiteObjectWatcherPropertyType;
};
export type SiteObjectWatcherPropertyType = {
    counted: boolean;
    dynamicProperties?: SiteObjectWatcherPropertiesType;
    handle?: SiteObjectWatcherHandleType;
    matched: boolean;
    name: string;
    node?: BlueNodeType<Mesh>;
    parent?: SiteObjectWatcherPropertyType;
    pending: number;
    properties?: SiteObjectWatcherPropertiesType;
    state: Array<SiteObserverState>;
};
export type SiteObjectWatcherSchemaPropertiesType = {
    [name: string]: SiteObjectWatcherSchemaPropertyType;
};
export type SiteObjectWatcherSchemaPropertyType = {
    handle?: SiteObjectWatcherHandleType;
    properties?: SiteObjectWatcherSchemaPropertiesType;
    state: Array<SiteObserverState>;
};
export type SiteObjectWatcherSchemaType = {
    handle?: undefined;
    properties: SiteObjectWatcherSchemaPropertiesType;
};
export type SiteObjectWatcherType = {
    handle?: undefined;
    properties: SiteObjectWatcherPropertiesType;
};
export declare enum SiteObserverState {
    CollectionGathered = "collection-gathered",
    Initialized = "initialized",
    RuntimeComplete = "runtime-complete",
    StaticComplete = "static-complete"
}
export declare const SITE_OBSERVER_STATE: SiteObserverState[];
export declare const SITE_OBSERVER_COMPLETE_STATE: SiteObserverState[];
export type SiteCallbackType = () => void;
export type SiteParseType = {
    directory: string;
    linkTree: LinkTreeType;
    path: string;
    text: string;
    textByLine: Array<string>;
};
export type SitePotentialScopeType = SiteContainerScopeType | SiteStepScopeType;
export type SiteProcessInputType = {
    base: Base;
    blue: SiteBlueType;
    environment: SiteEnvironmentType;
    link: SiteLinkType;
    module: SiteModuleType;
    red: SiteRedType;
    scope: SiteStepScopeType;
};
export type SiteRedType = SiteColorType<RedType>;
export type SiteScopeType = {
    bindings: Record<string, unknown>;
    parent?: SiteScopeType;
};
export type SiteStepScopeType = {
    container?: SiteContainerScopeType;
    declarations: Record<string, SiteVariableDeclarationType>;
    previous?: SiteStepScopeType;
};
export type SiteVariableDeclarationOptionsType = {
    definedType?: GreenClassReferenceType;
    isMutable?: boolean;
    isReference?: boolean;
};
export type SiteVariableDeclarationType = {
    definedType: GreenClassReferenceType;
    inferredType: GreenClassReferenceType;
    isMutable: boolean;
    isOwner: boolean;
    isReference: boolean;
    name: string;
};
export type SiteYellowType = SiteColorType<YellowType>;

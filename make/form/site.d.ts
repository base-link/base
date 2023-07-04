export type SiteFork = {
    base?: SiteFork;
    link: Record<string, unknown>;
};
export type SiteLookForm = {
    hook?: undefined;
    link: SiteLookFormLinkList;
};
export type SiteLookFormLink = {
    hook?: SiteLookHook;
    link?: SiteLookFormLinkList;
};
export type SiteLookFormLinkList = {
    [name: string]: SiteLookFormLink;
};
export type SiteLookHook = (value: unknown) => void;
export type SiteLookLink = {
    base?: SiteLookLink;
    bond: boolean;
    flowLink?: SiteLookLinkList;
    hook?: SiteLookHook;
    link?: SiteLookLinkList;
    name: string;
    size: number;
    test: boolean;
};
export type SiteLookLinkList = {
    [name: string]: SiteLookLink;
};
export type SiteObjectWatcherType = {
    hook?: undefined;
    link: SiteLookLinkList;
};

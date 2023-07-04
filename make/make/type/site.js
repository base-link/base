export var SiteObserverState;
(function (SiteObserverState) {
    SiteObserverState["CollectionGathered"] = "collection-gathered";
    SiteObserverState["Initialized"] = "initialized";
    SiteObserverState["RuntimeComplete"] = "runtime-complete";
    SiteObserverState["StaticComplete"] = "static-complete";
})(SiteObserverState || (SiteObserverState = {}));
// eslint-disable-next-line sort-exports/sort-exports
export const SITE_OBSERVER_STATE = [
    SiteObserverState.Initialized,
    SiteObserverState.StaticComplete,
    SiteObserverState.RuntimeComplete,
];
// eslint-disable-next-line sort-exports/sort-exports
export const SITE_OBSERVER_COMPLETE_STATE = [
    SiteObserverState.StaticComplete,
    SiteObserverState.RuntimeComplete,
];
//# sourceMappingURL=site.js.map
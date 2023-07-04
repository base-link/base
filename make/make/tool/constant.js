import { Color, Mesh, SiteObserverState, code, } from '~';
export function createBlueConstant(name, value) {
    return {
        color: Color.Blue,
        hidden: code.createBlueBoolean(false),
        name,
        state: SiteObserverState.Initialized,
        type: Mesh.Constant,
        value,
    };
}
export function createBlueLink(value) {
    return {
        color: Color.Blue,
        state: SiteObserverState.Initialized,
        type: Mesh.Link,
        value,
    };
}
export function createBluePath(value) {
    return {
        color: Color.Blue,
        state: SiteObserverState.Initialized,
        type: Mesh.Path,
        value,
    };
}
export function createBlueTerm(value) {
    return {
        color: Color.Blue,
        state: SiteObserverState.Initialized,
        type: Mesh.Term,
        value,
    };
}
//# sourceMappingURL=constant.js.map
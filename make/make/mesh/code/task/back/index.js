export function load_codeCard_task_back(load) {
    code.assumeLink(load, Link.Tree).nest.forEach((nest, index) => {
        load_codeCard_task_back_nestedChildren(code.withLink(load, nest, index));
    });
}
export function load_codeCard_task_back_nestedChildren(load) {
    const type = code.getLinkHint(load);
    switch (type) {
        case LinkHint.StaticText:
            break;
        default:
            code.throwError(code.generateUnhandledTermCaseError(load));
    }
}
//# sourceMappingURL=index.js.map
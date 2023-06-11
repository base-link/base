export function load_codeCard_hold(load: code.MeshLoad): void {
  code.assumeLink(load, Link.Tree).nest.forEach((nest, index) => {
    load_codeCard_hold_nestedChildren(code.withLink(load, nest, index))
  })
}

export function load_codeCard_hold_nestedChildren(
  load: code.MeshLoad,
): void {
  const type = code.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticTerm:
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(load, type))
  }
}

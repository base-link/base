export function load_codeCard_walk(load: code.MeshLoad): void {
  code.assumeLink(load, Link.Tree).nest.forEach((nest, index) => {
    load_codeCard_walk_nestedChildren(code.withLink(load, nest, index))
  })
}

export function load_codeCard_walk_nestedChildren(
  load: code.MeshLoad,
): void {
  const type = code.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticTerm:
      const term = code.resolveTermString(load)
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(load, type))
  }
}

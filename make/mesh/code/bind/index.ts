export function assumeNest(load: code.MeshLoad): Array<LinkNodeType> {
  return code.assumeLink(load, Link.Tree).nest
}

export function load_codeCard_bind(load: code.MeshLoad): void {
  const nest = code.assumeNest(load)
  nest.forEach((nest, index) => {
    load_codeCard_bind_nestedChildren(code.withLink(load, nest, index))
  })
}

export function load_codeCard_bind_nestedChildren(
  load: code.MeshLoad,
): void {
  const type = code.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticTerm:
      const term = code.resolveTermString(load)
      break
    default:
      code.throwError(code.generateUnhandledTermCaseError(load))
  }
}

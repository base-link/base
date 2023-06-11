export function load_codeCard_show(load: code.MeshLoad): void {
  code.assumeLink(load, Link.Tree).nest.forEach((nest, index) => {
    load_codeCard_show_nestedChildren(code.withLink(load, nest, index))
  })
}

export function load_codeCard_show_nestedChildren(
  load: code.MeshLoad,
): void {
  const type = code.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticText:
      break
    default:
      code.throwError(code.generateUnhandledTermCaseError(load))
  }
}

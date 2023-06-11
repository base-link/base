export function load_codeCard_form_base(load: code.MeshLoad): void {
  code.assumeLink(load, Link.Tree).nest.forEach((nest, index) => {
    load_codeCard_form_base_nestedChildren(
      code.withLink(load, nest, index),
    )
  })
}

export function load_codeCard_form_base_nestedChildren(
  load: code.MeshLoad,
): void {
  const type = code.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticTerm:
      break
    default:
      code.throwError(code.generateUnhandledTermCaseError(load))
  }
}

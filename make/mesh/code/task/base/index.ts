export function load_codeCard_task_base(load: code.MeshLoad): void {
  code.assumeLink(load, Link.Tree).nest.forEach((nest, index) => {
    load_codeCard_task_base_nestedChildren(
      code.withLink(load, nest, index),
    )
  })
}

export function load_codeCard_task_base_nestedChildren(
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

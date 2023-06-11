export function load_codeCard_load_find_save(
  load: code.MeshLoad,
): void {
  const nest = code.assumeLink(load, Link.Tree)

  nest.nest.forEach((nest, index) => {
    code.addTask(load.base, () => {
      code.load_codeCard_load_find_save_nestedChildren(
        code.withLink(load, nest, index),
      )
    })
  })
}

export function load_codeCard_load_find_save_nestedChildren(
  load: code.MeshLoad,
): void {
  const type = code.getLinkHint(load)
  if (type === LinkHint.StaticTerm) {
    const term = code.assumeTermString(load)

    code.load_find_scope(load)
  } else {
    code.throwError(code.generateUnhandledTermCaseError(load))
  }
}

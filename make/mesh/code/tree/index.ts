export function load_codeCard_tree(load: code.MeshLoad): void {
  const red = code.pushRed(load, code.createRedGather(load, 'template'))
  const blue = code.pushBlue(load, 'templates', {
    hooks: code.createBlueArray(load),
    loads: code.createBlueArray(load),
    type: Mesh.Template,
  })

  const colorInput = code.withColors(load, { blue, red })

  code.assumeNest(colorInput).forEach((nest, index) => {
    code.addTask(load.base, () => {
      code.load_codeCard_tree_nestedChildren(
        code.withLink(colorInput, nest, index),
      )
    })
  })
}

export function load_codeCard_tree_nestedChildren(
  load: code.MeshLoad,
): void {
  const type = code.getLinkHint(load)
  if (type === 'static-term') {
    const name = code.assumeTermString(load)
    const index = code.assumeLinkIndex(load)
    if (index === 0) {
      code.attachStaticTerm(load, 'name', name)
    } else {
      switch (name) {
        case 'take':
          code.load_codeCard_link(load)
          break
        case 'hook':
          code.load_codeCard_tree_hook(load)
          break

        case 'head':
          code.load_codeCard_head(load)
          break
        default:
          code.throwError(code.generateUnknownTermError(load))
      }
    }
  } else {
    code.throwError(code.generateUnhandledTermCaseError(load))
  }
}

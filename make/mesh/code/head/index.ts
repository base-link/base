export function load_codeCard_head(load: code.MeshLoad): void {
  const red = code.pushRed(
    load,
    code.createRedGather(load, 'typeInputs'),
  )
  const blue = code.pushBlue(load, 'typeInputs', {
    type: Mesh.ClassInput,
  })

  const colorInput = code.withColors(load, { blue, red })

  code.assumeNest(colorInput).forEach((nest, index) => {
    code.addTask(load.base, () => {
      code.load_codeCard_head_nestedChildren(
        code.withLink(load, nest, index),
      )
    })
  })
}

export function load_codeCard_head_nestedChildren(
  load: code.MeshLoad,
): void {
  const type = code.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticTerm:
      const term = code.assumeTermString(load)
      const index = code.assumeLinkIndex(load)
      if (index === 0) {
        code.attachStaticTerm(load, 'name', term)
        return
      }

      switch (term) {
        case 'like':
          code.load_codeCard_like(load)
          break
        case 'base':
          code.load_codeCard_like(load)
          break
        default:
          code.throwError(code.generateUnhandledTermCaseError(load))
      }
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(load, type))
  }
}

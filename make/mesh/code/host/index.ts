


export function load_codeCard_host(
  load: code.MeshLoad,
  property = 'constants'
): void {
  const red = code.pushRed(load, code.createRedGather(load, property))
  const blue = code.pushBlue(load, property, {
    type: Mesh.Constant
  })

  const colorInput = code.withColors(load, { blue, red })
  code.assumeNest(colorInput).forEach((nest, index) => {
    load_codeCard_host_nestedChildren(
      code.withLink(colorInput, nest, index)
    )
  })
}

export function load_codeCard_host_nestedChildren(
  load: code.MeshLoad,
): void {
  const type = code.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticTerm: {
      const term = code.assumeTermString(load)
      const index = code.assumeLinkIndex(load)
      if (index === 0) {
        code.attachStaticTerm(load, 'name', term)
        return
      }
      break
    }
    default:
      code.throwError(code.generateUnhandledNestCaseError(load, type))
  }
}

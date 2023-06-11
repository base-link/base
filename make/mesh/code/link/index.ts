export function load_codeCard_link(
  load: code.MeshLoad,
  property = 'loads',
): void {
  const red = code.pushRed(load, code.createRedGather(load, property))
  const blue = code.pushBlue(load, property, {
    type: Mesh.Input,
  })

  const colorInput = code.withColors(load, { blue, red })

  code.assumeNest(colorInput).forEach((nest, index) => {
    code.addTask(load.base, () => {
      code.load_codeCard_link_nestedChildren(
        code.withLink(colorInput, nest, index),
      )
    })
  })
}

export function load_codeCard_link_base(load: code.MeshLoad): void {}

export function load_codeCard_link_nestedChildren(
  load: code.MeshLoad,
): void {
  const type = code.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticTerm: {
      const index = code.assumeLinkIndex(load)
      if (index === 0) {
        const string = code.assumeTermString(load)
        const term = code.createBlueString(string)

        code.pushRed(load, code.createRedValue(load, 'name', term))
        code.attachBlue(load, 'name', term)
        return
      }

      const term = code.assumeTermString(load)
      switch (term) {
        case 'like':
          code.load_codeCard_like(load)
          break
        case 'list':
          code.load_codeCard_like_list(load)
          break
        case 'mesh':
          code.load_codeCard_like_mesh(load)
          break
        case 'time':
          code.load_codeCard_time(load)
          break
        case 'hide':
          code.load_codeCard_hide(load)
          break
        case 'link':
          code.load_codeCard_link(load)
          break
        case 'void':
          code.load_codeCard_void(load)
          break
        case 'take':
          code.load_codeCard_link_take(load)
          break
        case 'base':
          code.load_codeCard_link_base(load)
          break
        case 'note':
          code.load_codeCard_note(load)
          break
        default:
          code.throwError(code.generateUnhandledTermCaseError(load))
      }
      break
    }
    default:
      code.throwError(code.generateUnhandledNestCaseError(load, type))
  }
}

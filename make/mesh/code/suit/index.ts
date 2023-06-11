export function load_codeCard_suit(load: code.MeshLoad): void {
  const red = code.pushRed(
    load,
    code.createRedGather(load, 'classInterface'),
  )
  const blue = code.pushBlue(load, 'classInterfaces', {
    methods: code.createBlueArray(load),
    properties: code.createBlueArray(load),
    type: Mesh.ClassInterface,
    typeInputs: code.createBlueArray(load),
  })
  const colorInput = code.withColors(load, { blue, red })

  code.assumeNest(colorInput).forEach((nest, index) => {
    code.addTask(colorInput.base, () => {
      code.load_codeCard_suit_nestedChildren(
        code.withLink(colorInput, nest, index),
      )
    })
  })
}

export function load_codeCard_suit_nestedChildren(
  load: code.MeshLoad,
): void {
  const type = code.getLinkHint(load)
  if (type === 'static-term') {
    const term = code.assumeTermString(load)
    const index = code.assumeLinkIndex(load)
    if (index === 0) {
      const blueString = code.createBlueString(term)
      code.pushRed(load, code.createRedValue(load, 'name', blueString))
      code.attachBlue(load, 'name', blueString)
      return
    }
    switch (term) {
      case 'link':
        code.load_codeCard_link(load, 'properties')
        break
      case 'task':
        code.load_codeCard_task(load, 'methods')
        break
      case 'case':
        // code.load_codeCard_formTask(load)
        break
      case 'note':
        code.load_codeCard_note(load)
        break
      case 'head':
        code.load_codeCard_head(load)
        break
      // case 'fuse':
      //   code.load_codeCard_fuse(load)
      //   break
      case 'hold':
        code.load_codeCard_hold(load)
        break
      case 'slot':
        code.load_codeCard_slot(load)
        break
      case 'walk':
        code.load_codeCard_walk(load)
        break
      case 'stem':
        code.load_codeCard_stem(load)
        break
      case 'base':
        code.load_codeCard_form_base(load)
        break
      case 'like':
        code.load_codeCard_like(load)
        break
      default:
        code.throwError(code.generateUnhandledTermCaseError(load))
    }
  } else {
    code.throwError(code.generateUnhandledNestCaseError(load, type))
  }
}

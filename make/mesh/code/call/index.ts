export function load_codeCard_call(load: code.MeshLoad): void {
  const red = code.pushRed(load, code.createRedGather(load, 'step'))
  const blue = code.pushBlue(load, 'steps', {
    bind: [] as unknown as code.BlueArrayType<code.BlueBindType>,
    type: Mesh.Call,
  })
  const colorInput = code.withColors(load, { blue, red })

  code.assumeNest(load).forEach((nest, index) => {
    code.addTask(load.base, () => {
      load_codeCard_call_nestedChildren(
        code.withLink(colorInput, nest, index),
      )
    })
  })
}

export function load_codeCard_call_nestedChildren(
  load: code.MeshLoad,
): void {
  const type = code.getLinkHint(load)
  switch (type) {
    case LinkHint.DynamicTerm: {
      const index = code.assumeLinkIndex(load)
      if (index === 0) {
        const term = code.createBlueTerm(
          code.assumeLink(load, Link.Term),
        )
        code.pushRed(load, code.createRedGather(load, 'path', [term]))
        code.attachBlue(load, 'path', term)
      } else {
        code.throwError(code.generateUnhandledNestCaseError(load, type))
      }
      break
    }
    case LinkHint.StaticText:
      break
    case LinkHint.StaticPath:
    case LinkHint.DynamicPath: {
      const index = code.assumeLinkIndex(load)
      if (index === 0) {
        const path = code.createBluePath(
          code.assumeLink(load, Link.Path),
        )
        code.pushRed(load, code.createRedGather(load, 'path', [path]))
        code.attachBlue(load, 'path', path)
      } else {
        code.throwError(code.generateUnhandledNestCaseError(load, type))
      }
      break
    }
    case LinkHint.StaticTerm: {
      const index = code.assumeLinkIndex(load)
      if (index === 0) {
        const term = code.createBlueTerm(
          code.assumeLink(load, Link.Term),
        )
        code.pushRed(load, code.createRedGather(load, 'path', [term]))
        code.attachBlue(load, 'path', term)
      } else {
        const term = code.assumeTermString(load)
        switch (term) {
          case 'read':
            break
          case 'loan':
            break
          case 'bind':
            code.load_codeCard_bind(load)
            break
          default:
            code.throwError(code.generateUnhandledTermCaseError(load))
        }
      }
      break
    }
    default:
      code.throwError(code.generateUnhandledNestCaseError(load, type))
  }
}

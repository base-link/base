export function load_codeCard_like(load: code.MeshLoad): void {
  const red = code.pushRed(
    load,
    code.createRedGather(load, 'definedType'),
  )
  const blue = code.attachBlue(load, 'definedType', {
    bind: [] as unknown as code.BlueArrayType<code.BlueClassReferenceType>,
    type: Mesh.ClassReference,
  })

  const childInput = code.withColors(load, { blue, red })

  code.assumeNest(load).forEach((nest, index) => {
    code.addTask(load.base, () => {
      load_codeCard_like_nestedChildren(
        code.withLink(childInput, nest, index),
      )
    })
  })
}

export function load_codeCard_like_free(load: code.MeshLoad): void {}

export function load_codeCard_like_head(load: code.MeshLoad): void {}

export function load_codeCard_like_like(load: code.MeshLoad): void {}

export function load_codeCard_like_list(load: code.MeshLoad): void {}

export function load_codeCard_like_mesh(load: code.MeshLoad): void {}

export function load_codeCard_like_nestedChildren(
  load: code.MeshLoad,
): void {
  const type = code.getLinkHint(load)
  switch (type) {
    case LinkHint.DynamicTerm: {
      const index = code.assumeLinkIndex(load)
      if (index === 0) {
        code.load_first_dynamicTerm(load, 'name')
      } else {
        code.load_dynamicTerm(load)
      }
      break
    }
    case LinkHint.StaticTerm: {
      const index = code.assumeLinkIndex(load)
      if (index === 0) {
        code.load_first_staticTerm(load, 'name')
        return
      }

      const term = code.assumeTermString(load)
      switch (term) {
        case 'head':
          code.load_codeCard_head(load)
          break
        case 'like':
          code.load_codeCard_like_like(load)
          break
        case 'list':
          code.load_codeCard_like_list(load)
          break
        case 'mesh':
          code.load_codeCard_like_mesh(load)
          break
        case 'take':
          code.load_codeCard_like_take(load)
          break
        case 'free':
          code.load_codeCard_like_free(load)
          break
        case 'term':
          code.load_codeCard_like_term(load)
          break
        case 'link':
          // code.load_codeCard_link(load)
          break
        case 'task':
          code.load_codeCard_task(load)
          break
        case 'stem':
          code.load_codeCard_stem(load)
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

export function load_codeCard_like_take(load: code.MeshLoad): void {}

export function load_codeCard_like_term(load: code.MeshLoad): void {}

import { Link, LinkHint, Mesh, code } from '~'
import type { MeshLoad } from '~'

export * from './bear/index.js'
export * from './find/index.js'

export function load_codeCard_load(load: MeshLoad): void {
  const red = code.pushRed(load, code.createRedGather(load, 'import'))
  const blue = code.pushBlue(load, 'imports', {
    imports: code.createBlueArray(load),
    type: Mesh.Import,
    variables: code.createBlueArray(load),
  })
  const colorInput = code.withColors(load, { blue, red })

  code.assumeNest(colorInput).forEach((nest, index) => {
    load_codeCard_load_nestedChildren(
      code.withLink(colorInput, nest, index),
    )
  })
}

export function load_codeCard_load_nestedChildren(load: MeshLoad) {
  const type = code.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticText: {
      const index = code.assumeLinkIndex(load)
      if (index !== 0) {
        code.throwError(code.generateInvalidCompilerStateError())
      } else {
        const string = code.assumeText(load)
        const path = code.resolveModulePath(load, string)
        const bluePath = code.createBlueString(path)

        code.pushRed(
          load,
          code.createRedValue(load, 'absolutePath', bluePath),
        )

        code.attachBlue(load, 'absolutePath', bluePath)

        code.addTask(load.base, () => {
          code.handle_codeCard(load.base, path)
        })
      }
      break
    }

    case LinkHint.StaticTerm: {
      const term = code.resolveTermString(load)
      switch (term) {
        case 'find':
        case 'take':
          code.load_codeCard_load_find(load)
          break
        case 'load':
          code.load_codeCard_load(load)
          break
        case 'bear':
          code.load_codeCard_load_bear(load)
          break
        default:
          code.throwError(code.generateUnknownTermError(load))
      }
      break
    }

    default:
      code.throwError(code.generateUnhandledNestCaseError(load, type))
  }
}

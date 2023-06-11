import card from '~/make/card.js'
import tool from '~/make/tool.js'
import { MeshLoad } from '~/make/form.js'

export function load_codeCard_load(load: MeshLoad): void {
  const red = card.pushRed(load, card.createRedGather(load, 'import'))
  const blue = card.pushBlue(load, 'imports', {
    imports: card.createBlueArray(load),
    type: Mesh.Import,
    variables: card.createBlueArray(load),
  })
  const colorInput = card.withColors(load, { blue, red })

  card.assumeNest(colorInput).forEach((nest, index) => {
    load_codeCard_load_nestedChildren(
      card.withLink(colorInput, nest, index),
    )
  })
}

export function load_codeCard_load_nestedChildren(load: MeshLoad) {
  const type = card.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticText: {
      const index = card.loadLinkIndex(load)
      if (index !== 0) {
        card.throwError(card.generateInvalidCompilerStateError())
      } else {
        const string = card.assumeText(load)
        const path = card.resolveModulePath(load, string)
        const bluePath = card.createBlueString(path)

        card.pushRed(
          load,
          card.createRedValue(load, 'absolutePath', bluePath),
        )

        card.attachBlue(load, 'absolutePath', bluePath)

        card.addTask(load.base, () => {
          card.handle_codeCard(load.base, path)
        })
      }
      break
    }

    case LinkHint.StaticTerm: {
      const term = card.resolveTermString(load)
      switch (term) {
        case 'find':
        case 'take':
          card.load_codeCard_load_find(load)
          break
        case 'load':
          card.load_codeCard_load(load)
          break
        case 'bear':
          card.load_codeCard_load_bear(load)
          break
        default:
          card.throwError(card.generateUnknownTermError(load))
      }
      break
    }

    default:
      card.throwError(card.generateUnhandledNestCaseError(load, type))
  }
}

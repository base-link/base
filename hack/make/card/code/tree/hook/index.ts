import card from '~/make/card.js'
import tool from '~/make/tool.js'
import { MeshLoad } from '~/make/form.js'

export function load_codeCard_tree_hook(load: MeshLoad): void {
  const red = card.pushRed(load, card.createRedGather(load, 'hook'))
  const blue = card.pushBlue(load, 'hooks', {
    type: Mesh.Hook,
  })

  const colorInput = card.withColors(load, { blue, red })

  card.assumeNest(colorInput).forEach((nest, index) => {
    card.addTask(colorInput.base, () => {
      load_codeCard_tree_hook_nestedChildren(
        card.withLink(colorInput, nest, index),
      )
    })
  })
}

export function load_codeCard_tree_hook_nestedChildren(
  load: MeshLoad,
): void {
  const type = card.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticTerm:
      const index = card.loadLinkIndex(load)
      if (index === 0) {
        const name = card.assumeTermString(load)
        card.attachStaticTerm(load, 'name', name)
      } else {
        const blueString = card.getBlueValue(
          load,
          'name',
        ) as BlueStringType

        if (blueString?.value === 'fuse') {
          if (!card.hasBlueValue(load, 'content')) {
            card.attachBlueValue(
              load,
              'content',
              card.createBlueArray(load),
            )
          }

          const nest = load.link.element
          card.pushRed(load, card.createRedValue(load, 'link', nest))
          card.pushBlue(load, 'content', card.createBlueLink(nest))
        }
      }
      break
    default:
      card.throwError(card.generateUnhandledNestCaseError(load, type))
  }
}

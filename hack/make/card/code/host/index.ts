import card from '~/make/card.js'
import tool from '~/make/tool.js'
import { MeshLoad } from '~/make/form.js'

export function load_codeCard_host(
  load: MeshLoad,
  property = 'constants'
): void {
  const red = card.pushRed(load, card.createRedGather(load, property))
  const blue = card.pushBlue(load, property, {
    type: Mesh.Constant
  })

  const colorInput = card.withColors(load, { blue, red })
  card.assumeNest(colorInput).forEach((nest, index) => {
    load_codeCard_host_nestedChildren(
      card.withLink(colorInput, nest, index)
    )
  })
}

export function load_codeCard_host_nestedChildren(
  load: MeshLoad,
): void {
  const type = card.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticTerm: {
      const term = card.assumeTermString(load)
      const index = card.loadLinkIndex(load)
      if (index === 0) {
        card.attachStaticTerm(load, 'name', term)
        return
      }
      break
    }
    default:
      card.throwError(card.generateUnhandledNestCaseError(load, type))
  }
}

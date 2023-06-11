import card from '~/make/card.js'
import tool from '~/make/tool.js'
import { MeshLoad } from '~/make/form.js'

export function load_codeCard_call(load: MeshLoad): void {
  const red = card.pushRed(load, card.createRedGather(load, 'step'))
  const blue = card.pushBlue(load, 'steps', {
    bind: [] as unknown as card.BlueArrayType<card.BlueBindType>,
    type: Mesh.Call,
  })
  const colorInput = card.withColors(load, { blue, red })

  card.assumeNest(load).forEach((nest, index) => {
    card.addTask(load.base, () => {
      load_codeCard_call_nestedChildren(
        card.withLink(colorInput, nest, index),
      )
    })
  })
}

export function load_codeCard_call_nestedChildren(
  load: MeshLoad,
): void {
  const type = card.getLinkHint(load)
  switch (type) {
    case LinkHint.DynamicTerm: {
      const index = card.loadLinkIndex(load)
      if (index === 0) {
        const term = card.createBlueTerm(card.loadLink(load, Link.Term))
        card.pushRed(load, card.createRedGather(load, 'path', [term]))
        card.attachBlue(load, 'path', term)
      } else {
        card.throwError(card.generateUnhandledNestCaseError(load, type))
      }
      break
    }
    case LinkHint.StaticText:
      break
    case LinkHint.StaticPath:
    case LinkHint.DynamicPath: {
      const index = card.loadLinkIndex(load)
      if (index === 0) {
        const path = card.createBluePath(card.loadLink(load, Link.Path))
        card.pushRed(load, card.createRedGather(load, 'path', [path]))
        card.attachBlue(load, 'path', path)
      } else {
        card.throwError(card.generateUnhandledNestCaseError(load, type))
      }
      break
    }
    case LinkHint.StaticTerm: {
      const index = card.loadLinkIndex(load)
      if (index === 0) {
        const term = card.createBlueTerm(card.loadLink(load, Link.Term))
        card.pushRed(load, card.createRedGather(load, 'path', [term]))
        card.attachBlue(load, 'path', term)
      } else {
        const term = card.assumeTermString(load)
        switch (term) {
          case 'read':
            break
          case 'loan':
            break
          case 'bind':
            card.load_codeCard_bind(load)
            break
          default:
            card.throwError(card.generateUnhandledTermCaseError(load))
        }
      }
      break
    }
    default:
      card.throwError(card.generateUnhandledNestCaseError(load, type))
  }
}

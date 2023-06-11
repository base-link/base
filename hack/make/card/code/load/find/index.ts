import card from '~/make/card.js'
import tool from '~/make/tool.js'
import { MeshLoad } from '~/make/form.js'

export function load_codeCard_load_find(load: MeshLoad): void {
  const red = card.pushRed(load, card.createRedGather(load, 'find'))
  const blue = card.pushBlue(load, 'variables', {
    type: Mesh.ImportVariable,
  })
  const colorInput = card.withColors(load, { blue, red })

  card.assumeNest(colorInput).forEach((nest, index) => {
    card.addTask(load.base, () => {
      card.load_codeCard_load_find_nestedChildren(
        card.withLink(colorInput, nest, index),
      )
    })
  })
}

export function load_codeCard_load_find_nestedChildren(
  load: MeshLoad,
): void {
  const type = card.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticTerm: {
      const index = card.loadLinkIndex(load)

      if (index > 0) {
        card.load_codeCard_load_find_staticTerm(load)
      } else {
        card.load_find_scope(load)
      }
      break
    }
    default: {
      card.throwError(card.generateUnhandledTermCaseError(load))
    }
  }
}

export function load_codeCard_load_find_staticTerm(
  load: MeshLoad,
): void {
  const term = card.resolveTermString(load)
  switch (term) {
    case 'save':
      card.load_codeCard_load_find_save(load)
      break
    case 'bear':
      card.load_codeCard_load_find_bear(load)
      break
    default:
      card.throwError(card.generateUnknownTermError(load))
  }
}

export function load_find_scope(load: MeshLoad): void {
  const nest = card.loadLink(load, Link.Tree)
  const scope = card.assumeTermString(load)
  const nestedNest = nest.nest[0]
  card.assertGenericLink(nestedNest)

  const nestedInput = card.withLink(load, nestedNest, 0)

  const name = card.assumeTermString(nestedInput)
  const scopeString = card.createBlueString(scope)
  const nameString = card.createBlueString(name)

  card.pushRed(load, card.createRedGather(load, 'scope', [scopeString]))

  card.pushRed(load, card.createRedGather(load, 'name', [nameString]))

  card.attachBlue(load, 'scopeName', scopeString)
  card.attachBlue(load, 'name', nameString)
}

import card from '~/make/card.js'
import tool from '~/make/tool.js'
import { MeshLoad } from '~/make/form.js'

export function load_codeCard_suit(load: MeshLoad): void {
  const red = card.pushRed(
    load,
    card.createRedGather(load, 'classInterface'),
  )
  const blue = card.pushBlue(load, 'classInterfaces', {
    methods: card.createBlueArray(load),
    properties: card.createBlueArray(load),
    type: Mesh.ClassInterface,
    typeInputs: card.createBlueArray(load),
  })
  const colorInput = card.withColors(load, { blue, red })

  card.assumeNest(colorInput).forEach((nest, index) => {
    tool.loadTask(colorInput.base, () => {
      card.load_codeCard_suit_leadLink(
        card.withLink(colorInput, nest, index),
      )
    })
  })
}

export function load_codeCard_suit_leadLink(load: MeshLoad): void {
  const type = card.getLinkHint(load)
  if (type === 'static-term') {
    const term = card.assumeTermString(load)
    const index = card.loadLinkIndex(load)
    if (index === 0) {
      const blueString = card.createBlueString(term)
      card.pushRed(load, card.createRedValue(load, 'name', blueString))
      card.attachBlue(load, 'name', blueString)
      return
    }
    switch (term) {
      case 'link':
        card.load_codeCard_link(load, 'properties')
        break
      case 'task':
        card.load_codeCard_task(load, 'methods')
        break
      case 'case':
        // card.load_codeCard_formTask(load)
        break
      case 'note':
        card.load_codeCard_note(load)
        break
      case 'head':
        card.load_codeCard_head(load)
        break
      // case 'fuse':
      //   card.load_codeCard_fuse(load)
      //   break
      case 'hold':
        card.load_codeCard_hold(load)
        break
      case 'slot':
        card.load_codeCard_slot(load)
        break
      case 'walk':
        card.load_codeCard_walk(load)
        break
      case 'stem':
        card.load_codeCard_stem(load)
        break
      case 'base':
        card.load_codeCard_form_base(load)
        break
      case 'like':
        card.load_codeCard_like(load)
        break
      default:
        card.throwError(card.generateUnhandledTermCaseError(load))
    }
  } else {
    card.throwError(card.generateUnhandledNestCaseError(load, type))
  }
}

import card from '~/make/card.js'
import tool from '~/make/tool.js'
import { MeshLoad } from '~/make/form.js'

export function load_codeCard_task(
  load: MeshLoad,
  property = 'functions',
): void {
  const container = card.createContainerScope(load)
  const scope = card.createStepScope(container)
  const scopeInput = card.withScope(load, scope)
  const red = card.pushRed(load, card.createRedGather(load, property))
  const blue = card.pushBlue(load, property, {
    functions: card.createBlueArray(load),
    loads: card.createBlueArray(load),
    steps: card.createBlueArray(load),
    type: Mesh.Function,
    typeInputs: card.createBlueArray(load),
  })
  const colorInput = card.withColors(scopeInput, { blue, red })

  card.assumeNest(colorInput).forEach((nest, index) => {
    tool.loadTask(load.base, () => {
      card.load_codeCard_task_leadLink(
        card.withLink(colorInput, nest, index),
      )
    })
  })
}

export function load_codeCard_task_leadLink(load: MeshLoad): void {
  const type = card.getLinkHint(load)
  switch (type) {
    case LinkHint.DynamicTerm: {
      const index = card.loadLinkIndex(load)
      if (index === 0) {
        card.load_dynamicTerm(load)
      } else {
        card.throwError(card.generateUnhandledNestCaseError(load, type))
      }
      break
    }
    case LinkHint.StaticTerm: {
      const index = card.loadLinkIndex(load)
      if (index === 0) {
        card.load_first_staticTerm(load, 'name')
        return
      }
      const term = card.assumeTermString(load)
      switch (term) {
        case 'take':
          card.load_codeCard_link(load)
          break
        case 'task':
          card.load_codeCard_task(load)
          break
        case 'head':
          card.load_codeCard_head(load)
          break
        case 'free':
          card.load_codeCard_task_free(load)
          break
        case 'call':
          card.load_codeCard_call(load)
          break
        case 'save':
          card.load_codeCard_save(load)
          break
        case 'back':
          card.load_codeCard_task_back(load)
          break
        case 'hide':
          card.load_codeCard_hide(load)
          break
        case 'wait':
          card.load_codeCard_wait(load)
          break
        case 'risk':
          card.load_codeCard_risk(load)
          break
        case 'base':
          card.load_codeCard_task_base(load)
          break
        // case 'fuse':
        //   card.load_codeCard_fuse(load)
        //   break
        case 'hold':
          card.load_codeCard_hold(load)
          break
        case 'stem':
          card.load_codeCard_stem(load)
          break
        case 'note':
          card.load_codeCard_note(load)
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

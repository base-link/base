import card from '~/make/card.js'
import tool from '~/make/tool.js'
import { MeshLoad } from '~/make/form.js'

export function load_codeCard_task_free(load: MeshLoad): void {
  const red = card.pushRed(
    load,
    card.createRedGather(load, 'definedOutputType'),
  )
  const blue = card.attachBlue(load, 'definedOutputType', {
    type: Mesh.Output,
  })
  const colorInput = card.withColors(load, { blue, red })

  card.assumeNest(colorInput).forEach((nest, index) => {
    tool.loadTask(colorInput.base, () => {
      card.load_codeCard_task_free_leadLink(
        card.withLink(colorInput, nest, index),
      )
    })
  })
}

export function load_codeCard_task_free_leadLink(load: MeshLoad): void {
  const type = card.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticTerm: {
      const term = card.assumeTermString(load)
      const index = card.loadLinkIndex(load)
      if (index === 0) {
        const blueString = card.createBlueString(term)
        card.pushRed(
          load,
          card.createRedValue(load, 'name', blueString),
        )
        card.attachBlue(load, 'name', blueString)
        return
      }
      break
    }
    default:
      card.throwError(card.generateUnhandledTermCaseError(load))
  }
}

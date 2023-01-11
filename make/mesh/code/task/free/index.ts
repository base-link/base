import { LinkHint, Mesh, code } from '~'
import type { SiteProcessInputType } from '~'

export function process_codeCard_task_free(
  input: SiteProcessInputType,
): void {
  const red = code.pushRed(
    input,
    code.createRedGather(input, 'definedOutputType'),
  )
  const blue = code.attachBlue(input, 'definedOutputType', {
    type: Mesh.Output,
  })
  const colorInput = code.withColors(input, { blue, red })

  code.assumeNest(colorInput).forEach((nest, index) => {
    code.addTask(colorInput.base, () => {
      code.process_codeCard_task_free_nestedChildren(
        code.withLink(colorInput, nest, index),
      )
    })
  })
}

export function process_codeCard_task_free_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticTerm: {
      const term = code.assumeTermString(input)
      const index = code.assumeLinkIndex(input)
      if (index === 0) {
        const blueString = code.createBlueString(term)
        code.pushRed(
          input,
          code.createRedValue(input, 'name', blueString),
        )
        code.attachBlue(input, 'name', blueString)
        return
      }
      break
    }
    default:
      code.throwError(code.generateUnhandledTermCaseError(input))
  }
}

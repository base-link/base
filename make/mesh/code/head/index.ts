import { LinkHint, Mesh, code } from '~'
import type { SiteProcessInputType } from '~'

export function load_codeCard_head(input: SiteProcessInputType): void {
  const red = code.pushRed(
    input,
    code.createRedGather(input, 'typeInputs'),
  )
  const blue = code.pushBlue(input, 'typeInputs', {
    type: Mesh.ClassInput,
  })

  const colorInput = code.withColors(input, { blue, red })

  code.assumeNest(colorInput).forEach((nest, index) => {
    code.addTask(input.base, () => {
      code.load_codeCard_head_nestedChildren(
        code.withLink(input, nest, index),
      )
    })
  })
}

export function load_codeCard_head_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticTerm:
      const term = code.assumeTermString(input)
      const index = code.assumeLinkIndex(input)
      if (index === 0) {
        code.attachStaticTerm(input, 'name', term)
        return
      }

      switch (term) {
        case 'like':
          code.load_codeCard_like(input)
          break
        case 'base':
          code.load_codeCard_like(input)
          break
        default:
          code.throwError(code.generateUnhandledTermCaseError(input))
      }
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

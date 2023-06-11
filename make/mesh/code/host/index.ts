import { code, LinkHint, Mesh } from '~'
import type { SiteProcessInputType } from '~'

export function load_codeCard_host(
  input: SiteProcessInputType,
  property = 'constants'
): void {
  const red = code.pushRed(input, code.createRedGather(input, property))
  const blue = code.pushBlue(input, property, {
    type: Mesh.Constant
  })

  const colorInput = code.withColors(input, { blue, red })
  code.assumeNest(colorInput).forEach((nest, index) => {
    load_codeCard_host_nestedChildren(
      code.withLink(colorInput, nest, index)
    )
  })
}

export function load_codeCard_host_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticTerm: {
      const term = code.assumeTermString(input)
      const index = code.assumeLinkIndex(input)
      if (index === 0) {
        code.attachStaticTerm(input, 'name', term)
        return
      }
      break
    }
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

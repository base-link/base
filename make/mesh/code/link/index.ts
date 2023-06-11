import { LinkHint, Mesh, code } from '~'
import type { SiteProcessInputType } from '~'

export * from './take/index.js'

export function load_codeCard_link(
  input: SiteProcessInputType,
  property = 'inputs',
): void {
  const red = code.pushRed(input, code.createRedGather(input, property))
  const blue = code.pushBlue(input, property, {
    type: Mesh.Input,
  })

  const colorInput = code.withColors(input, { blue, red })

  code.assumeNest(colorInput).forEach((nest, index) => {
    code.addTask(input.base, () => {
      code.load_codeCard_link_nestedChildren(
        code.withLink(colorInput, nest, index),
      )
    })
  })
}

export function load_codeCard_link_base(
  input: SiteProcessInputType,
): void {}

export function load_codeCard_link_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticTerm: {
      const index = code.assumeLinkIndex(input)
      if (index === 0) {
        const string = code.assumeTermString(input)
        const term = code.createBlueString(string)

        code.pushRed(input, code.createRedValue(input, 'name', term))
        code.attachBlue(input, 'name', term)
        return
      }

      const term = code.assumeTermString(input)
      switch (term) {
        case 'like':
          code.load_codeCard_like(input)
          break
        case 'list':
          code.load_codeCard_like_list(input)
          break
        case 'mesh':
          code.load_codeCard_like_mesh(input)
          break
        case 'time':
          code.load_codeCard_time(input)
          break
        case 'hide':
          code.load_codeCard_hide(input)
          break
        case 'link':
          code.load_codeCard_link(input)
          break
        case 'void':
          code.load_codeCard_void(input)
          break
        case 'take':
          code.load_codeCard_link_take(input)
          break
        case 'base':
          code.load_codeCard_link_base(input)
          break
        case 'note':
          code.load_codeCard_note(input)
          break
        default:
          code.throwError(code.generateUnhandledTermCaseError(input))
      }
      break
    }
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

import { LinkHint, Mesh, code } from '~'
import type { SiteProcessInputType } from '~'

export * from './take/index.js'

export function process_codeCard_link(
  input: SiteProcessInputType,
): void {
  const red = code.pushRed(input, code.createRedGather(input, 'input'))
  const blue = code.pushBlue(input, 'inputs', {
    type: Mesh.Input,
  })

  const colorInput = code.withColors(input, { blue, red })

  code.assumeNest(colorInput).forEach((nest, index) => {
    code.addTask(input.base, () => {
      process_codeCard_link_nestedChildren(
        code.withLink(colorInput, nest, index),
      )
    })
  })
}

export function process_codeCard_link_base(
  input: SiteProcessInputType,
): void {}

export function process_codeCard_link_nestedChildren(
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
          code.process_codeCard_like(input)
          break
        case 'list':
          code.process_codeCard_like_list(input)
          break
        case 'mesh':
          code.process_codeCard_like_mesh(input)
          break
        case 'time':
          code.process_codeCard_time(input)
          break
        case 'hide':
          code.process_codeCard_hide(input)
          break
        case 'link':
          code.process_codeCard_link(input)
          break
        case 'void':
          code.process_codeCard_void(input)
          break
        case 'take':
          code.process_codeCard_link_take(input)
          break
        case 'base':
          code.process_codeCard_link_base(input)
          break
        case 'note':
          code.process_codeCard_note(input)
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

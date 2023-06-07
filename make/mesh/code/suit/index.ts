import { Link, Mesh, code } from '~'
import type { SiteProcessInputType } from '~'

export function process_codeCard_suit(
  input: SiteProcessInputType,
): void {
  const red = code.pushRed(
    input,
    code.createRedGather(input, 'classInterface'),
  )
  const blue = code.pushBlue(input, 'classInterfaces', {
    methods: code.createBlueArray(input),
    properties: code.createBlueArray(input),
    type: Mesh.ClassInterface,
    typeInputs: code.createBlueArray(input),
  })
  const colorInput = code.withColors(input, { blue, red })

  code.assumeNest(colorInput).forEach((nest, index) => {
    code.addTask(colorInput.base, () => {
      code.process_codeCard_suit_nestedChildren(
        code.withLink(colorInput, nest, index),
      )
    })
  })
}

export function process_codeCard_suit_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  if (type === 'static-term') {
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
    switch (term) {
      case 'link':
        code.process_codeCard_link(input, 'properties')
        break
      case 'task':
        code.process_codeCard_task(input, 'methods')
        break
      case 'case':
        // code.process_codeCard_formTask(input)
        break
      case 'note':
        code.process_codeCard_note(input)
        break
      case 'head':
        code.process_codeCard_head(input)
        break
      // case 'fuse':
      //   code.process_codeCard_fuse(input)
      //   break
      case 'hold':
        code.process_codeCard_hold(input)
        break
      case 'slot':
        code.process_codeCard_slot(input)
        break
      case 'walk':
        code.process_codeCard_walk(input)
        break
      case 'stem':
        code.process_codeCard_stem(input)
        break
      case 'base':
        code.process_codeCard_form_base(input)
        break
      case 'like':
        code.process_codeCard_like(input)
        break
      default:
        code.throwError(code.generateUnhandledTermCaseError(input))
    }
  } else {
    code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

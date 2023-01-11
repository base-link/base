import { Link, NestClassInterfaceType, code } from '~'
import type { SiteProcessInputType } from '~'

export function process_codeCard_suit(
  input: SiteProcessInputType,
): void {
  const suit: NestClassInterfaceType = {
    children: [],
    scope: input.scope,
    type: Nest.ClassInterface,
  }

  const childInput = code.withElement(input, suit)

  code.assumeLink(childInput, Link.Tree).nest.forEach((nest, index) => {
    code.process_codeCard_suit_nestedChildren(
      code.withLink(childInput, nest, index),
    )
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
      code.gatherIntoMeshParent(
        input,
        code.createStringConstant('name', term),
      )
      return
    }
    switch (term) {
      case 'link':
        code.process_codeCard_link(input)
        break
      case 'task':
        code.process_codeCard_task(input)
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
      case 'fuse':
        code.process_codeCard_fuse(input)
        break
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
      case 'type':
        code.process_codeCard_type(input)
        break
      default:
        code.throwError(code.generateUnhandledTermCaseError(input))
    }
  } else {
    code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

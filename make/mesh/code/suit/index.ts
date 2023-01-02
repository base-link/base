import { Link, Mesh, MeshPartialType, code } from '~'
import type { MeshInputType } from '~'

export function process_codeCard_suit(
  input: MeshInputType,
): void {
  const suit: MeshPartialType<Mesh.ClassInterface> = {
    children: [],
    like: Mesh.ClassInterface,
    partial: true,
  }

  const childInput = code.extendWithObjectScope(input, suit)

  code
    .assumeLinkType(childInput, Link.Tree)
    .nest.forEach((nest, index) => {
      code.process_codeCard_suit_nestedChildren(
        code.extendWithNestScope(childInput, {
          index,
          nest,
        }),
      )
    })
}

export function process_codeCard_suit_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  if (type === 'static-term') {
    const term = code.assumeStaticTermFromNest(input)
    const index = code.assumeNestIndex(input)
    if (index === 0) {
      const suit = code.assumeInputObjectAsMeshPartialType(
        input,
        Mesh.ClassInterface,
      )
      suit.children.push(code.createTerm(term))
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
      case 'like':
        code.process_codeCard_like(input)
        break
      default:
        code.throwError(
          code.generateUnhandledTermCaseError(input),
        )
    }
  } else {
    code.throwError(
      code.generateUnhandledNestCaseError(input, type),
    )
  }
}

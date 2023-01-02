import { Link, Mesh, code } from '~'
import type { MeshInputType, MeshPartialType } from '~'

export * from './base/index.js'
export * from './case/index.js'
export * from './wear/index.js'

export function process_codeCard_form(
  input: MeshInputType,
): void {
  const form: MeshPartialType<Mesh.Class> = {
    children: [],
    like: Mesh.Class,
    partial: true,
  }

  const formInput = code.extendWithObjectScope(input, form)

  code
    .assumeLinkType(formInput, Link.Tree)
    .nest.forEach((nest, index) => {
      code.process_codeCard_form_nestedChildren(
        code.extendWithNestScope(formInput, {
          index,
          nest,
        }),
      )
    })

  code.assertMeshPartialType(input.card, Mesh.CodeModule)

  // code.assertString(formInput.name, `name on form`)

  input.card.children.push(form)
}

export function process_codeCard_form_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  if (type === 'static-term') {
    const term = code.assumeStaticTermFromNest(input)
    const index = code.assumeNestIndex(input)
    if (index === 0) {
      const form = code.assumeInputObjectAsMeshPartialType(
        input,
        Mesh.Class,
      )
      // form.name = term
    } else {
      switch (term) {
        case 'link':
          code.process_codeCard_link(input)
          break
        case 'task':
          code.process_codeCard_task(input)
          break
        case 'head':
          code.process_codeCard_head(input)
          break
        case 'wear':
          code.process_codeCard_form_wear(input)
          break
        case 'base':
          code.process_codeCard_form_base(input)
          break
        case 'case':
          code.process_codeCard_formCase(input)
          break
        case 'fuse':
          code.process_codeCard_fuse(input)
          break
        case 'hold':
          code.process_codeCard_hold(input)
          break
        case 'stem':
          code.process_codeCard_stem(input)
          break
        case 'note':
          code.process_codeCard_note(input)
          break
        case 'like':
          code.process_codeCard_like(input)
          break
        default:
          code.throwError(code.generateUnknownTermError(input))
      }
    }
  } else {
    code.throwError(
      code.generateUnhandledNestCaseError(input, type),
    )
  }
}

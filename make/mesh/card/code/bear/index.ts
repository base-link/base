import { Mesh, MeshHint, code } from '~'
import type { MeshInputType } from '~'

export function finalize_codeCard_bear_nestedChildren(
  input: MeshInputType,
): void {
  const text = code.resolveText(input)

  code.assertString(text)

  const card = code.getProperty(input, 'card')

  code.assertMeshPartial(card, Mesh.CodeModule)

  const path = code.resolveModulePath(input, text)

  card.children.push({
    absolutePath: path,
    complete: true,
    like: Mesh.Export,
    partial: false,
  })
}

export function process_codeCard_bear(
  input: MeshInputType,
): void {
  const nest = code.assumeNest(input)
  nest.nest.forEach((nest, index) => {
    code.process_codeCard_bear_nestedChildren(
      code.extendWithNestScope(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_bear_hide(
  input: MeshInputType,
): void {}

export function process_codeCard_bear_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case MeshHint.StaticText:
      code.finalize_codeCard_bear_nestedChildren(input)
      break
    case MeshHint.DynamicText:
      code.processDynamicTextNest(
        input,
        code.finalize_codeCard_bear_nestedChildren,
      )
      break
    case MeshHint.StaticTerm:
      const term = code.resolveStaticTermFromNest(input)
      switch (term) {
        case 'hide':
          code.process_codeCard_bear_hide(input)
          break
      }
      break
    default:
      code.throwError(
        code.generateUnhandledTermCaseError(input),
      )
  }
}

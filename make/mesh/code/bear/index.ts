import { Link, LinkHint, Mesh, code } from '~'
import type { MeshInputType } from '~'

export function finalize_codeCard_bear_nestedChildren(
  input: MeshInputType,
): void {
  const text = code.resolveText(input)

  code.assertString(text)

  const card = input.module

  code.assertMeshPartialType(card, Mesh.CodeModule)

  const path = code.resolveModulePath(input, text)

  card.children.push({
    absolutePath: path,
    complete: true,
    like: Mesh.Export,
    partial: false,
  })
}

export function process_codeCard_bear(input: MeshInputType): void {
  const nest = code.assumeLinkType(input, Link.Tree)
  nest.nest.forEach((nest, index) => {
    code.process_codeCard_bear_nestedChildren(
      code.withEnvironment(input, {
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
    case LinkHint.StaticText:
      code.finalize_codeCard_bear_nestedChildren(input)
      break
    case LinkHint.DynamicText:
      code.processDynamicTextNest(
        input,
        code.finalize_codeCard_bear_nestedChildren,
      )
      break
    case LinkHint.StaticTerm:
      const term = code.resolveTerm(input)
      switch (term) {
        case 'hide':
          code.process_codeCard_bear_hide(input)
          break
        default:
          code.throwError(code.generateUnhandledTermCaseError(input))
      }
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

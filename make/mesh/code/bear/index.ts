import { Link, LinkHint, Mesh, code } from '~'
import type { SiteProcessInputType } from '~'

export function finalize_codeCard_bear_nestedChildren(
  input: SiteProcessInputType,
): void {
  const text = code.resolveText(input)

  code.assertString(text)

  const path = code.resolveModulePath(input, text)

  code.pushIntoParentObject(input, {
    absolutePath: path,
    complete: true,
    like: Mesh.Export,
  })
}

export function process_codeCard_bear(
  input: SiteProcessInputType,
): void {
  const nest = code.assumeLink(input, Link.Tree)
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
  input: SiteProcessInputType,
): void {}

export function process_codeCard_bear_nestedChildren(
  input: SiteProcessInputType,
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

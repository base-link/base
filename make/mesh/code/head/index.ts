import { Link, LinkHint, Mesh, code } from '~'
import type { SiteProcessInputType } from '~'

export function process_codeCard_head(
  input: SiteProcessInputType,
): void {
  const head = code.createNest(Nest.ClassInput, input.scope)
  code.gatherIntoMeshParent(input, head)

  code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
    process_codeCard_head_nestedChildren(
      code.withLink(input, nest, index),
    )
  })
}

export function process_codeCard_head_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticTerm:
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
        case 'type':
          code.process_codeCard_type(input)
          break
        case 'base':
          code.process_codeCard_type(input)
          break
        default:
          code.throwError(code.generateUnhandledTermCaseError(input))
      }
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

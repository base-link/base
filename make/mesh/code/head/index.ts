import { Link, LinkHint, Mesh, Nest, code } from '~'
import type { SiteProcessInputType } from '~'

export function process_codeCard_head(
  input: SiteProcessInputType,
): void {
  const head = code.createNest(Nest.ClassInput, input.scope)

  code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
    process_codeCard_head_nestedChildren(
      code.withEnvironment(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_head_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case LinkHint.StaticTerm:
      const term = code.assumeTerm(input)
      const index = code.assumeNestIndex(input)
      if (index === 0) {
        code.pushIntoParentObject(
          input,
          code.createStringConstant('name', term),
        )
        return
      }

      switch (term) {
        case 'like':
          code.process_codeCard_like(input)
          break
        case 'base':
          code.process_codeCard_like(input)
          break
        default:
          code.throwError(code.generateUnhandledTermCaseError(input))
      }
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

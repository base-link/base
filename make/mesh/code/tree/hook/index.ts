import { Link, LinkHint, code } from '~'
import type { SiteProcessInputType } from '~'

export function process_codeCard_tree_hook(
  input: SiteProcessInputType,
): void {
  code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
    process_codeCard_tree_hook_nestedChildren(
      code.withEnvironment(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_tree_hook_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticTerm:
      const index = code.assumeLinkIndex(input)
      if (index === 0) {
        const name = code.assumeTerm(input)
        code.gatherIntoMeshParent(
          input,
          code.createStringConstant('name', name),
        )
      } else {
        const nest = code.assumeLink(input)
        code.gatherIntoMeshParent(input, nest)
      }
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

import { Link, LinkHint, Mesh, Nest, NestOutputType, code } from '~'
import type { SiteProcessInputType } from '~'

export function process_codeCard_task_free(
  input: SiteProcessInputType,
): void {
  const output: NestOutputType = {
    children: [],
    scope: input.scope,
    type: Nest.Output,
  }

  const childInput = code.withElement(input, output)

  code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
    process_codeCard_task_free_nestedChildren(
      code.withLink(childInput, nest, index),
    )
  })
}

export function process_codeCard_task_free_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticTerm: {
      const term = code.assumeTermString(input)
      const index = code.assumeLinkIndex(input)
      if (index === 0) {
        code.gatherIntoMeshParent(
          input,
          code.createStringConstant('name', term),
        )
        return
      }
      break
    }
    default:
      code.throwError(code.generateUnhandledTermCaseError(input))
  }
}

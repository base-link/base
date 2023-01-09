import { Link, LinkHint, Mesh, Nest, NestOutputType, code } from '~'
import type { SiteProcessInputType } from '~'

export function process_codeCard_task_free(
  input: SiteProcessInputType,
): void {
  const output: NestOutputType = {
    children: [],
    like: Nest.Output,
    scope: input.scope,
  }

  const childInput = code.withElement(input, output)

  code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
    process_codeCard_task_free_nestedChildren(
      code.withEnvironment(childInput, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_task_free_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case LinkHint.StaticTerm: {
      const term = code.assumeTerm(input)
      const index = code.assumeNestIndex(input)
      if (index === 0) {
        code.pushIntoParentObject(
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

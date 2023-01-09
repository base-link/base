import { Link, Mesh, Nest, code } from '~'
import type { SiteProcessInputType } from '~'

export function process_codeCard_load_find_save(
  input: SiteProcessInputType,
): void {
  code.assertNestChildrenLength(input, 1)

  const nest = code.assumeLink(input, Link.Tree)

  nest.nest.forEach((nest, index) => {
    code.process_codeCard_load_find_save_nestedChildren(
      code.withEnvironment(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_load_find_save_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.determineNestType(input)
  if (type === 'static-term') {
    const term = code.resolveTerm(input)
    code.assertString(term)

    code.pushIntoParentObject(input, {
      complete: true,
      like: Mesh.ImportVariableRename,
      name: term,
    })
  } else {
    code.throwError(code.generateUnhandledTermCaseError(input))
  }
}

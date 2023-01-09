import { Link, code } from '~'
import type { SiteProcessInputType } from '~'

export function process_codeCard_load_find_bear(
  input: SiteProcessInputType,
): void {
  code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
    code.process_codeCard_load_find_bear_nestedChildren(
      code.withEnvironment(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_load_find_bear_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.determineNestType(input)
  if (type === 'static-term') {
  } else {
    code.throwError(code.generateUnhandledTermCaseError(input))
  }
}

import { Link, code } from '~'
import type { MeshInputType } from '~'

export function process_codeCard_load_find_bear(
  input: MeshInputType,
): void {
  code
    .assumeLinkType(input, Link.Tree)
    .nest.forEach((nest, index) => {
      code.process_codeCard_load_find_bear_nestedChildren(
        code.extendWithNestScope(input, {
          index,
          nest,
        }),
      )
    })
}

export function process_codeCard_load_find_bear_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  if (type === 'static-term') {
  } else {
    code.throwError(code.generateUnhandledTermCaseError(input))
  }
}

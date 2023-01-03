import { Link, code } from '~'
import type { MeshInputType } from '~'

export * from './hook/index.js'

export function process_codeCard_zone(input: MeshInputType): void {
  code.assumeLinkType(input, Link.Tree).nest.forEach((nest, index) => {
    code.process_codeCard_zone_nestedChildren(
      code.withEnvironment(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_zone_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  if (type === 'static-term') {
    const term = code.resolveTerm(input)
    switch (term) {
      case 'take':
        code.process_codeCard_link(input)
        break
      case 'hook':
        code.process_codeCard_zoneHook(input)
        break
      case 'head':
        code.process_codeCard_head(input)
        break
      default:
        code.throwError(code.generateUnknownTermError(input))
    }
  } else {
    code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

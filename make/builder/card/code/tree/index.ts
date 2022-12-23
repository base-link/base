import { NestInputType, api } from '~'

export * from './hook'

export function process_codeCard_tree(
  input: NestInputType,
): void {
  input.nest.nest.forEach((nest, index) => {
    api.process_codeCard_tree_nestedChildren({
      ...input,
      index,
      nest,
    })
  })
}

export function process_codeCard_tree_nestedChildren(
  input: NestInputType,
): void {
  const type = api.determineNestType(input)
  if (type === 'static-term') {
    const term = api.resolveStaticTerm(input)
    switch (term) {
      case 'take':
        api.process_codeCard_link(input)
        break
      case 'hook':
        api.process_codeCard_treeHook(input)
        break
      case 'head':
        api.process_codeCard_head(input)
        break
      default:
        api.throwError(api.generateUnknownTermError(input))
    }
  } else {
    api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

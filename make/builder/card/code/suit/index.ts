import { api } from '~'
import type { APIInputType } from '~'

export function process_codeCard_suit(
  input: APIInputType,
): void {
  api.assumeNest(input).nest.forEach((nest, index) => {
    api.process_codeCard_suit_nestedChildren(
      api.extendWithNestScope(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_suit_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  if (type === 'static-term') {
    const term = api.resolveStaticTermFromNest(input)
    switch (term) {
      case 'link':
        api.process_codeCard_link(input)
        break
      case 'task':
        api.process_codeCard_formTask(input)
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

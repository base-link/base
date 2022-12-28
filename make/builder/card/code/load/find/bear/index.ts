import { api } from '~'
import type { APIInputType } from '~'

export function process_codeCard_load_find_bear(
  input: APIInputType,
): void {
  api.assumeNest(input).nest.forEach((nest, index) => {
    api.process_codeCard_load_find_bear_nestedChildren(
      api.extendWithNestScope(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_load_find_bear_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  if (type === 'static-term') {
  } else {
    api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

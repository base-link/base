// the api url handlers go here
import { api } from '~'
import type { APIInputType, Nest } from '~'
import { api } from '~'

export function process_codeCard_take(
  input: APIInputType,
): void {
  api.assumeNest(input).nest.forEach((nest, index) => {
    process_codeCard_take_nestedChildren(
      api.extendWithNestScope(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_take_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.StaticTerm:
      const term = api.resolveStaticTermFromNest(input)
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

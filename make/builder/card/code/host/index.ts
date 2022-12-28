import { api , Nest } from '~'
import type { APIInputType } from '~'

export function process_codeCard_host(
  input: APIInputType,
): void {
  api.assumeNest(input).nest.forEach((nest, index) => {
    process_codeCard_host_nestedChildren(      api.extendWithNestScope(input, {
        index,
        nest,
      }),)
  })
}

export function process_codeCard_host_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.StaticTerm:
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

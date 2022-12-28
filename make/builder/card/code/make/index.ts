import { api } from '~'
import type { APIInputType, Nest } from '~'

export function process_codeCard_make(
  input: APIInputType,
): void {
  api.assumeNest(input).nest.forEach((nest, index) => {
    process_codeCard_make_nestedChildren(
      api.extendWithNestScope(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_make_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.StaticTerm:
      const term = api.resolveStaticTermFromNest(input)
      switch (term) {
        case 'bind':
          api.process_codeCard_bind(input)
          break
      }
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

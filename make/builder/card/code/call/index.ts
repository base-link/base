import { Nest, api } from '~'
import type { APIInputType } from '~'

export function process_codeCard_call(
  input: APIInputType,
): void {
  api.assumeNest(input).nest.forEach((nest, index) => {
    process_codeCard_call_nestedChildren(
      api.extendWithNestScope(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_call_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.DynamicTerm:
      break
    case Nest.StaticText:
      break
    case Nest.StaticTerm:
      const term = api.assumeStaticTermFromNest(input)
      const index = api.assumeNestIndex(input)
      if (index === 0) {
        throw new Error('Hint: call name')
      } else {
        switch (term) {
          case 'read':
            break
          case 'loan':
            break
          default:
            api.throwError(
              api.generateUnhandledTermCaseError(input),
            )
        }
      }
      break
    default:
      api.throwError(
        api.generateUnhandledNestCaseError(input, type),
      )
  }
}

import { api } from '~'
import type { APIInputType, Nest } from '~'

export function process_codeCard_note(
  input: APIInputType,
): void {
  api.assumeNest(input).nest.forEach((nest, index) => {
    process_codeCard_note_nestedChildren(
      api.extendWithNestScope(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_note_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.StaticText:
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

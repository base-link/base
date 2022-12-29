import { LinkHint, code } from '~'
import type { MeshInputType } from '~'

export function process_codeCard_call(
  input: MeshInputType,
): void {
  code.assumeNest(input).nest.forEach((nest, index) => {
    process_codeCard_call_nestedChildren(
      code.extendWithNestScope(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_call_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case LinkHint.DynamicTerm:
      break
    case LinkHint.StaticText:
      break
    case LinkHint.StaticTerm:
      const term = code.assumeStaticTermFromNest(input)
      const index = code.assumeNestIndex(input)
      if (index === 0) {
        throw new Error('Hint: call name')
      } else {
        switch (term) {
          case 'read':
            break
          case 'loan':
            break
          default:
            code.throwError(
              code.generateUnhandledTermCaseError(input),
            )
        }
      }
      break
    default:
      code.throwError(
        code.generateUnhandledNestCaseError(input, type),
      )
  }
}

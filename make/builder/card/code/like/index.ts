import { APIInputType, Nest, api } from '~'

export function process_codeCard_like(
  input: APIInputType,
): void {
  api.assumeNest(input).nest.forEach((nest, index) => {
    process_codeCard_like_nestedChildren(
      api.extendWithNestScope(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_like_free(
  input: APIInputType,
): void {}

export function process_codeCard_like_head(
  input: APIInputType,
): void {}

export function process_codeCard_like_list(
  input: APIInputType,
): void {}

export function process_codeCard_like_mesh(
  input: APIInputType,
): void {}

export function process_codeCard_like_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.StaticTerm:
      const term = api.resolveStaticTermFromNest(input)
      switch (term) {
        case 'head':
          api.process_codeCard_like_head(input)
          break
        case 'like':
          api.process_codeCard_like(input)
          break
        case 'list':
          api.process_codeCard_like_list(input)
          break
        case 'mesh':
          api.process_codeCard_like_mesh(input)
          break
        case 'take':
          api.process_codeCard_like_take(input)
          break
        case 'free':
          api.process_codeCard_like_free(input)
          break
        case 'term':
          api.process_codeCard_like_term(input)
          break
      }
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

export function process_codeCard_like_take(
  input: APIInputType,
): void {}

export function process_codeCard_like_term(
  input: APIInputType,
): void {}

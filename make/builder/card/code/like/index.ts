import { Nest, NestInputType, api } from '~'

export function process_codeCard_like(
  input: NestInputType,
): void {
  input.nest.nest.forEach((nest, index) => {
    process_codeCard_like_nestedChildren({
      ...input,
      index,
      nest,
    })
  })
}

export function process_codeCard_like_free(
  input: NestInputType,
): void {}

export function process_codeCard_like_head(
  input: NestInputType,
): void {}

export function process_codeCard_like_list(
  input: NestInputType,
): void {}

export function process_codeCard_like_mesh(
  input: NestInputType,
): void {}

export function process_codeCard_like_nestedChildren(
  input: NestInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.StaticTerm:
      const term = api.resolveStaticTerm(input)
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
  input: NestInputType,
): void {}

export function process_codeCard_like_term(
  input: NestInputType,
): void {}

import { APIInputType, Nest, api } from '~'

export function process_codeCard_link(
  input: APIInputType,
): void {
  api.assumeNest(input).nest.forEach((nest, index) => {
    process_codeCard_link_nestedChildren(
      api.extendWithNestScope(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_link_base(
  input: APIInputType,
): void {}

export function process_codeCard_link_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.StaticTerm:
      const term = api.resolveStaticTermFromNest(input)
      switch (term) {
        case 'like':
          api.process_codeCard_like(input)
          break
        case 'list':
          api.process_codeCard_like_list(input)
          break
        case 'mesh':
          api.process_codeCard_like_mesh(input)
          break
        case 'time':
          api.process_codeCard_time(input)
          break
        case 'base':
          api.process_codeCard_link_base(input)
          break
      }
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

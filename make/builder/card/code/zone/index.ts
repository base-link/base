import { APIInputType, api } from '~'

export * from './hook'

export function process_codeCard_zone(
  input: APIInputType,
): void {
  api.assumeNest(input).nest.forEach((nest, index) => {
    api.process_codeCard_zone_nestedChildren(
      api.extendWithNestScope(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_zone_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  if (type === 'static-term') {
    const term = api.resolveStaticTermFromNest(input)
    switch (term) {
      case 'take':
        api.process_codeCard_link(input)
        break
      case 'hook':
        api.process_codeCard_zoneHook(input)
        break
      case 'head':
        api.process_codeCard_head(input)
        break
      default:
        api.throwError(api.generateUnknownTermError(input))
    }
  } else {
    api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

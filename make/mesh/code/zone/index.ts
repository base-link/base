export function load_codeCard_zone(load: code.MeshLoad): void {
  code.assumeLink(load, Link.Tree).nest.forEach((nest, index) => {
    code.load_codeCard_zone_nestedChildren(
      code.withLink(load, nest, index),
    )
  })
}

export function load_codeCard_zone_nestedChildren(
  load: code.MeshLoad,
): void {
  const type = code.getLinkHint(load)
  if (type === 'static-term') {
    const term = code.resolveTermString(load)
    switch (term) {
      case 'take':
        code.load_codeCard_link(load)
        break
      case 'hook':
        code.load_codeCard_zoneHook(load)
        break
      case 'head':
        code.load_codeCard_head(load)
        break
      default:
        code.throwError(code.generateUnknownTermError(load))
    }
  } else {
    code.throwError(code.generateUnhandledNestCaseError(load, type))
  }
}

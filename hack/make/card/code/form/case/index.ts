export function load_codeCard_formCase(load: MeshLoad): void {
  card.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
    load_codeCard_formCase_nestedChildren(
      card.withLink(load, nest, index),
    )
  })
}

export function load_codeCard_formCase_nestedChildren(
  load: MeshLoad,
): void {
  const type = card.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticTerm:
      break
    default:
      card.throwError(card.generateUnhandledTermCaseError(load))
  }
}

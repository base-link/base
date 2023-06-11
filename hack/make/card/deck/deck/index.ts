export * from './bear/index.js'
export * from './face/index.js'
export * from './link/index.js'
export * from './mint/index.js'
export * from './term/index.js'
export * from './test/index.js'

export function load_deckCard_deck(load: MeshLoad): void {
  const red = card.pushRed(load, card.createRedGather(load, 'deck'))
  const blue = card.attachBlue(load, 'deck', {
    face: [] as unknown as card.BlueArrayType<card.BluePackageUserType>,
    term: [] as unknown as card.BlueArrayType<card.BluePackageLicenseType>,
    type: Mesh.Package,
  })

  const colorInput = card.withColors(load, { blue, red })

  card.assumeNest(load).forEach((nest, index) => {
    card.addTask(load.base, () => {
      card.load_deckCard_deck_nestedChildren(
        card.withLink(colorInput, nest, index),
      )
    })
  })
}

export function load_deckCard_deck_nestedChildren(
  load: MeshLoad,
): void {
  const type = card.getLinkHint(load)
  const index = card.loadLinkIndex(load)
  switch (type) {
    case LinkHint.DynamicTerm:
    case LinkHint.DynamicText:
    case LinkHint.DynamicPath:
    case LinkHint.StaticPath:
      card.throwError(card.generateInvalidNestCaseError(load, type))
      break
    case LinkHint.StaticText: {
      if (index === 0) {
        card.load_deckCard_deck_link(load)
      } else {
        throw new Error('Unhandled text.')
      }
      break
    }
    case LinkHint.StaticTerm:
      if (index > 0) {
        card.load_deckCard_deck_nestedTerm(load)
      } else {
        throw new Error('Unhandled term.')
      }
      break
    default:
      card.throwError(card.generateUnhandledNestCaseError(load, type))
  }
}

export function load_deckCard_deck_nestedTerm(load: MeshLoad): void {
  const term = card.resolveTermString(load)
  switch (term) {
    case 'bear': {
      card.load_deckCard_deck_bear(load)
      break
    }
    case 'test': {
      card.load_deckCard_deck_test(load)
      break
    }
    case 'mint': {
      card.load_deckCard_deck_mint(load)
      break
    }
    default: {
      card.throwError(card.generateUnknownTermError(load))
    }
  }
}

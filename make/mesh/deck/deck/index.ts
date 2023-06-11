export function load_deckCard_deck(load: code.MeshLoad): void {
  const red = code.pushRed(load, code.createRedGather(load, 'deck'))
  const blue = code.attachBlue(load, 'deck', {
    face: [] as unknown as code.BlueArrayType<code.BluePackageUserType>,
    term: [] as unknown as code.BlueArrayType<code.BluePackageLicenseType>,
    type: Mesh.Package,
  })

  const colorInput = code.withColors(load, { blue, red })

  code.assumeNest(load).forEach((nest, index) => {
    code.addTask(load.base, () => {
      code.load_deckCard_deck_nestedChildren(
        code.withLink(colorInput, nest, index),
      )
    })
  })
}

export function load_deckCard_deck_nestedChildren(
  load: code.MeshLoad,
): void {
  const type = code.getLinkHint(load)
  const index = code.assumeLinkIndex(load)
  switch (type) {
    case LinkHint.DynamicTerm:
    case LinkHint.DynamicText:
    case LinkHint.DynamicPath:
    case LinkHint.StaticPath:
      code.throwError(code.generateInvalidNestCaseError(load, type))
      break
    case LinkHint.StaticText: {
      if (index === 0) {
        code.load_deckCard_deck_link(load)
      } else {
        throw new Error('Unhandled text.')
      }
      break
    }
    case LinkHint.StaticTerm:
      if (index > 0) {
        code.load_deckCard_deck_nestedTerm(load)
      } else {
        throw new Error('Unhandled term.')
      }
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(load, type))
  }
}

export function load_deckCard_deck_nestedTerm(
  load: code.MeshLoad,
): void {
  const term = code.resolveTermString(load)
  switch (term) {
    case 'bear': {
      code.load_deckCard_deck_bear(load)
      break
    }
    case 'test': {
      code.load_deckCard_deck_test(load)
      break
    }
    case 'mint': {
      code.load_deckCard_deck_mint(load)
      break
    }
    default: {
      code.throwError(code.generateUnknownTermError(load))
    }
  }
}

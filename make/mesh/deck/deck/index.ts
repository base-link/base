import { LinkHint, Mesh, code } from '~'
import type { SiteProcessInputType } from '~'

export * from './bear/index.js'
export * from './face/index.js'
export * from './link/index.js'
export * from './mint/index.js'
export * from './term/index.js'
export * from './test/index.js'

export function process_deckCard_deck(
  input: SiteProcessInputType,
): void {
  const red = code.pushRed(input, code.createRedGather(input, 'deck'))
  const blue = code.attachBlue(input, 'deck', {
    face: [],
    term: [],
    type: Mesh.Package,
  })

  const colorInput = code.withColors(input, { blue, red })

  code.assumeNest(input).forEach((nest, index) => {
    code.addTask(input.base, () => {
      code.process_deckCard_deck_nestedChildren(
        code.withLink(colorInput, nest, index),
      )
    })
  })
}

export function process_deckCard_deck_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  const index = code.assumeLinkIndex(input)
  switch (type) {
    case LinkHint.DynamicTerm:
    case LinkHint.DynamicText:
    case LinkHint.DynamicPath:
    case LinkHint.StaticPath:
      code.throwError(code.generateInvalidNestCaseError(input, type))
      break
    case LinkHint.StaticText: {
      if (index === 0) {
        code.process_deckCard_deck_link(input)
      } else {
        throw new Error('Unhandled text.')
      }
      break
    }
    case LinkHint.StaticTerm:
      if (index > 0) {
        code.process_deckCard_deck_nestedTerm(input)
      } else {
        throw new Error('Unhandled term.')
      }
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

export function process_deckCard_deck_nestedTerm(
  input: SiteProcessInputType,
): void {
  const term = code.resolveTermString(input)
  switch (term) {
    case 'bear': {
      code.process_deckCard_deck_bear(input)
      break
    }
    case 'test': {
      code.process_deckCard_deck_test(input)
      break
    }
    case 'mint': {
      code.process_deckCard_deck_mint(input)
      break
    }
    default: {
      code.throwError(code.generateUnknownTermError(input))
    }
  }
}

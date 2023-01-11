import { Link, LinkHint, Mesh, code } from '~'
import type { SiteProcessInputType } from '~'

export function process_deckCard_deck_bear(
  input: SiteProcessInputType,
): void {
  code.assumeNest(input).forEach((nest, index) => {
    code.addTask(input.base, () => {
      code.process_deckCard_deck_bear_nestedChildren(
        code.withLink(input, nest, index),
      )
    })
  })
}

export function process_deckCard_deck_bear_nestedChildren(
  input: SiteProcessInputType,
): void {
  const index = code.assumeLinkIndex(input)
  if (index === 0) {
    const type = code.getLinkHint(input)
    switch (type) {
      case LinkHint.StaticText: {
        const string = code.assumeText(input)
        const path = code.resolveModulePath(input, string)
        const blueString = code.createBlueString(path)

        code.pushRed(
          input,
          code.createRedValue(input, 'bear', blueString),
        )
        code.attachBlue(input, 'bear', blueString)
        break
      }
      case LinkHint.DynamicText: {
        const textNode = code.assumeLink(input, Link.Text)

        code.pushRed(
          input,
          code.createRedValue(input, 'bear', textNode),
        )

        code.attachBlue(
          input,
          'bear',
          code.createBlueText(input, textNode),
        )

        code.bindText(input, () => {
          const string = code.assumeText(input)
          const path = code.resolveModulePath(input, string)
          code.attachBlue(input, 'bear', code.createBlueString(path))
        })
      }
      default:
        code.throwError(
          code.generateUnhandledNestCaseError(input, type),
        )
    }
  } else {
    throw new Error('Too many inputs.')
  }
}

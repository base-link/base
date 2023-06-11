import { Link, LinkHint, code } from '~'
import type { SiteProcessInputType } from '~'

export function load_deckCard_deck_test(
  input: SiteProcessInputType,
): void {
  code.assumeNest(input).forEach((nest, index) => {
    code.addTask(input.base, () => {
      code.load_deckCard_deck_test_nestedChildren(
        code.withLink(input, nest, index),
      )
    })
  })
}

export function load_deckCard_deck_test_nestedChildren(
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
          code.createRedValue(input, 'test', blueString),
        )
        code.attachBlue(input, 'test', blueString)

        code.addTask(input.base, () => {
          code.handle_codeCard(input.base, path)
        })
        break
      }
      case LinkHint.DynamicText: {
        const textNode = code.assumeLink(input, Link.Text)

        code.pushRed(
          input,
          code.createRedValue(input, 'test', textNode),
        )

        code.attachBlue(
          input,
          'test',
          code.createBlueText(input, textNode),
        )

        code.bindText(input, () => {
          const string = code.assumeText(input)
          const path = code.resolveModulePath(input, string)
          code.attachBlue(input, 'test', code.createBlueString(path))
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

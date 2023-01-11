import { Link, code } from '~'
import type { SiteProcessInputType } from '~'

export function finalize_deckCard_deck_test(
  input: SiteProcessInputType,
): void {
  const text = code.resolveText(input)
  code.assertString(text)

  const path = code.resolveModulePath(input, text)
  code.assertString(path, 'path')

  code.gatherIntoMeshParent(
    input,
    code.createStringConstant('test', path),
  )
}

export function process_deckCard_deck_test(
  input: SiteProcessInputType,
): void {
  code.assertNestChildrenLength(input, 1)

  const nest = code.assumeLink(input, Link.Tree).nest[0]

  code.processTextNest(
    code.withLink(input, {
      index: 0,
      nest,
    }),
    code.finalize_deckCard_deck_test,
  )
}

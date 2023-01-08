import { Link, Mesh, code } from '~'
import type { SiteProcessInputType } from '~'

export function finalize_deckCard_deck_bear(
  input: SiteProcessInputType,
): void {
  const text = code.resolveText(input)
  code.assertString(text)
  const path = code.resolveModulePath(input, text)
  code.assertString(path, 'path')
  code.pushIntoParentObject(
    input,
    code.createStringConstant('export', path),
  )
}

export function process_deckCard_deck_bear(
  input: SiteProcessInputType,
): void {
  code.assertNestChildrenLength(input, 1)

  const nest = code.assumeLink(input, Link.Tree).nest[0]

  code.processTextNest(
    code.withEnvironment(input, { nest }),
    code.finalize_deckCard_deck_bear,
  )
}

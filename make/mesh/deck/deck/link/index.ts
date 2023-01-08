import { Mesh, MeshValueType, code } from '~'
import type { MeshType, SiteProcessInputType } from '~'

export function assertStringPattern(
  input: SiteProcessInputType,
  string: string,
  pattern: RegExp,
): void {
  if (!string.match(pattern)) {
    code.throwError(code.generateInvalidPatternError(input, pattern))
  }
}

export function createConstant(
  name: string,
  value: MeshValueType,
): MeshType<Mesh.Constant> {
  return {
    complete: true,
    hidden: false,
    like: Mesh.Constant,
    name,
    value,
  }
}

export function process_deckCard_deck_link(
  input: SiteProcessInputType,
) {
  const text = code.resolveText(input)
  code.assertString(text)

  code.assertStringPattern(input, text, /^@[a-z0-9]+\/[a-z0-9]+$/)

  code.pushIntoParentObject(
    input,
    code.createConstant('link', {
      complete: true,
      like: Mesh.String,
      string: text,
    }),
  )
}

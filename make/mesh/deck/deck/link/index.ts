import { Mesh, code } from '~'
import type {
  MeshConstant_FullType,
  MeshInputType,
  MeshType,
  MeshValue_FullType,
} from '~'

export function assertStringPattern(
  input: MeshInputType,
  string: string,
  pattern: RegExp,
): void {
  if (!string.match(pattern)) {
    code.throwError(
      code.generateInvalidPatternError(input, pattern),
    )
  }
}

export function createConstant(
  name: string,
  value: MeshValue_FullType | Array<MeshConstant_FullType>,
): MeshType<Mesh.Constant> {
  return {
    complete: true,
    hidden: false,
    like: Mesh.Constant,
    name,
    partial: false,
    value,
  }
}

export function process_deckCard_deck_link(
  input: MeshInputType,
) {
  const text = code.resolveText(input)
  code.assertString(text)

  code.assertStringPattern(
    input,
    text,
    /^@[a-z0-9]+\/[a-z0-9]+$/,
  )

  const deck = code.assumeBranchAsMeshPartialType(
    input,
    Mesh.Package,
  )

  deck.children.push(
    code.createConstant('link', {
      complete: true,
      like: Mesh.String,
      partial: false,
      string: text,
    }),
  )
}

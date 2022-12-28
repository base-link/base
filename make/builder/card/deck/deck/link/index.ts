import { AST, api } from '~'
import type {
  APIInputType,
  ASTConstant_FullType,
  ASTType,
  ASTValue_FullType,
} from '~'

export function assertStringPattern(
  input: APIInputType,
  string: string,
  pattern: RegExp,
): void {
  if (!string.match(pattern)) {
    api.throwError(
      api.generateInvalidPatternError(input, pattern),
    )
  }
}

export function createConstant(
  name: string,
  value: ASTValue_FullType | Array<ASTConstant_FullType>,
): ASTType<AST.Constant> {
  return {
    complete: true,
    like: AST.Constant,
    name,
    partial: false,
    value,
  }
}

export function process_deckCard_deck_link(
  input: APIInputType,
) {
  const text = api.resolveText(input)
  api.assertString(text)

  api.assertStringPattern(
    input,
    text,
    /^@[a-z0-9]+\/[a-z0-9]+$/,
  )

  const deck = api.assumeInputObjectAsASTPartialType(
    input,
    AST.Package,
  )

  deck.children.push(
    api.createConstant('link', {
      complete: true,
      like: AST.String,
      partial: false,
      string: text,
    }),
  )
}

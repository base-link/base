import { Lexer } from '~'
import type { LexerResultType, LexerTokenType } from '~'

export function normalizeLinkTextAST(
  input: LexerResultType,
): LexerResultType {
  const result: Array<LexerTokenType<Lexer>> = []

  let nesting = 0
  let previousLineNesting = 0

  for (const token of input.token) {
    switch (token.like) {
      case Lexer.CloseEvaluation:
        result.push(token)
        break
      case Lexer.CloseInterpolation:
        result.push(token)
        break
      case Lexer.CloseParenthesis:
        result.push(token)
        nesting--
        break
      case Lexer.CloseText:
        result.push(token)
        break
      case Lexer.Comma:
        break
      case Lexer.Comment:
        result.push(token)
        break
      case Lexer.Decimal:
        result.push(token)
        break
      case Lexer.Hashtag:
        result.push(token)
        break
      case Lexer.Line:
        nesting = 0
        break
      case Lexer.OpenEvaluation:
        break
      case Lexer.OpenIndentation:
        nesting++
        break
      case Lexer.OpenInterpolation:
        break
      case Lexer.OpenNesting:
        nesting++
        break
      case Lexer.OpenParenthesis:
        break
      case Lexer.OpenText:
        break
      case Lexer.Path:
        break
      case Lexer.SignedInteger:
        break
      case Lexer.String:
        break
      case Lexer.TermPath:
        break
      case Lexer.UnsignedInteger:
        break
    }
    i++
  }

  return {
    ...input,
    token: result,
  }
}

import { api } from '~'

export enum Lexer {
  CloseEvaluation = 'lexer-close-evaluation',
  CloseInterpolation = 'lexer-close-interpolation',
  CloseParenthesis = 'lexer-close-parenthesis',
  CloseText = 'lexer-close-text',
  Comma = 'lexer-comma',
  Comment = 'lexer-comment',
  Decimal = 'lexer-decimal',
  Hashtag = 'lexer-hashtag',
  Line = 'lexer-line',
  OpenEvaluation = 'lexer-open-evaluation',
  OpenIndentation = 'lexer-open-indentation',
  OpenInterpolation = 'lexer-open-interpolation',
  OpenNesting = 'lexer-open-nesting',
  OpenParenthesis = 'lexer-open-parenthesis',
  OpenText = 'lexer-open-text',
  Path = 'lexer-path',
  SignedInteger = 'lexer-signed-integer',
  String = 'lexer-string',
  TermFragment = 'lexer-term-fragment',
  UnsignedInteger = 'lexer-unsigned-integer',
}

// eslint-disable-next-line sort-exports/sort-exports
export const LEXER_TYPE = [
  Lexer.CloseEvaluation,
  Lexer.CloseInterpolation,
  Lexer.CloseParenthesis,
  Lexer.CloseText,
  Lexer.Comma,
  Lexer.Comment,
  Lexer.Decimal,
  Lexer.Hashtag,
  Lexer.Line,
  Lexer.OpenEvaluation,
  Lexer.OpenIndentation,
  Lexer.OpenInterpolation,
  Lexer.OpenNesting,
  Lexer.OpenParenthesis,
  Lexer.OpenText,
  Lexer.Path,
  Lexer.SignedInteger,
  Lexer.String,
  Lexer.TermFragment,
  Lexer.UnsignedInteger,
]

// eslint-disable-next-line sort-exports/sort-exports
export const LEXER_PATTERN_LIST = [
  Lexer.CloseEvaluation,
  Lexer.CloseInterpolation,
  Lexer.CloseParenthesis,
  Lexer.CloseText,
  Lexer.Comma,
  Lexer.Comment,
  Lexer.Decimal,
  Lexer.Hashtag,
  Lexer.OpenEvaluation,
  Lexer.OpenIndentation,
  Lexer.OpenInterpolation,
  Lexer.OpenNesting,
  Lexer.OpenParenthesis,
  Lexer.OpenText,
  Lexer.Path,
  Lexer.SignedInteger,
  Lexer.TermFragment,
  Lexer.UnsignedInteger,
]

// eslint-disable-next-line sort-exports/sort-exports
export const LEXER_STRING_PATTERN_LIST = [
  Lexer.CloseInterpolation,
  Lexer.CloseText,
  Lexer.String,
]

export type LexerCloseEvaluationTokenType =
  LexerTokenBaseType & {
    like: Lexer.CloseEvaluation
  }

export type LexerInputType = {
  path: string
  text: string
}

type LexerLineTokenType = LexerTokenBaseType & {
  like: Lexer.Line
}

type LexerOpenIndentationTokenType = LexerTokenBaseType & {
  like: Lexer.OpenIndentation
}

type LexerDecimalTokenType = LexerTokenBaseType & {
  like: Lexer.Decimal
}

type LexerSignedIntegerTokenType = LexerTokenBaseType & {
  like: Lexer.SignedInteger
}

type LexerUnignedIntegerTokenType = LexerTokenBaseType & {
  like: Lexer.UnsignedInteger
}

type LexerOpenNestingTokenType = LexerTokenBaseType & {
  like: Lexer.OpenNesting
}

type LexerOpenParenthesisTokenType = LexerTokenBaseType & {
  like: Lexer.OpenParenthesis
}

type LexerCloseParenthesisTokenType = LexerTokenBaseType & {
  like: Lexer.CloseParenthesis
}

type LexerOpenTextTokenType = LexerTokenBaseType & {
  like: Lexer.OpenText
}

type LexerCloseTextTokenType = LexerTokenBaseType & {
  like: Lexer.CloseText
}

type LexerOpenInterpolationTokenType = LexerTokenBaseType & {
  like: Lexer.OpenInterpolation
}

type LexerCloseInterpolationTokenType = LexerTokenBaseType & {
  like: Lexer.CloseInterpolation
}

export type LexerLineRangeType = {
  character: number
  line: number
}

type LexerOpenNestTokenType = LexerTokenBaseType & {
  like: Lexer.OpenEvaluation
}

type LexerCloseNestTokenType = LexerTokenBaseType & {
  like: Lexer.CloseEvaluation
}

type LexerCommaTokenType = LexerTokenBaseType & {
  like: Lexer.Comma
}

type LexerHashtagTokenType = LexerTokenBaseType & {
  like: Lexer.Hashtag
}

type LexerCommentTokenType = LexerTokenBaseType & {
  like: Lexer.Comment
}

export type LexerOpenEvaluationTokenType =
  LexerTokenBaseType & {
    like: Lexer.OpenEvaluation
  }

export type LexerPathTokenType = LexerTokenBaseType & {
  like: Lexer.Path
}

export type LexerPatternConfigType = {
  pattern: RegExp
}

export type LexerRangeType = {
  end: number
  start: number
}

export type LexerResultType = LexerSplitInputType & {
  tokenList: Array<LexerTokenType<Lexer>>
}

export type LexerSplitInputType = LexerInputType & {
  textInLines: Array<string>
}

export enum LexerState {
  Text = 'text',
  Tree = 'tree',
}

export type LexerStringTokenType = LexerTokenBaseType & {
  like: Lexer.String
}

export type LexerTermFragmentTokenType = LexerTokenBaseType & {
  like: Lexer.TermFragment
}

export type LexerTokenBaseType = {
  end: LexerLineRangeType
  offset: LexerRangeType
  start: LexerLineRangeType
  text: string
}

const PATTERN: Record<Lexer, LexerPatternConfigType> = {
  [Lexer.CloseEvaluation]: {
    pattern: /^ *\] */,
  },
  [Lexer.CloseInterpolation]: {
    pattern: /^\}+/,
  },
  [Lexer.CloseParenthesis]: {
    pattern: /^\)/,
  },
  [Lexer.CloseText]: {
    pattern: /^>/,
  },
  [Lexer.Comma]: {
    pattern: /^, +/,
  },
  [Lexer.Comment]: {
    pattern: /^# [^\n]+/,
  },
  [Lexer.Decimal]: {
    pattern: /^-?\d+\.\d+/,
  },
  [Lexer.Hashtag]: {
    pattern: /^#\w+/,
  },
  [Lexer.Line]: {
    pattern: /^\n/,
  },
  [Lexer.OpenEvaluation]: {
    pattern: /^ *\[ */,
  },
  [Lexer.OpenIndentation]: {
    pattern: /^  /,
  },
  [Lexer.OpenInterpolation]: {
    pattern: /^\{+/,
  },
  [Lexer.OpenNesting]: {
    pattern: /^ /,
  },
  [Lexer.OpenParenthesis]: {
    pattern: /^\(/,
  },
  [Lexer.OpenText]: {
    pattern: /^</,
  },
  [Lexer.Path]: {
    pattern:
      /^(?:(?:@[^\s\/]+(?:\/[^\s\/]*)*)|(?:\.{1,2}(?:\/[^\s\/]*)*)|(?:\/[^\s\/]+)+)/,
  },
  [Lexer.SignedInteger]: {
    pattern: /^-\d+(?=\b)/,
  },
  [Lexer.TermFragment]: {
    pattern:
      /^-?(?:[*~]?[a-z][a-z0-9]*(?:-[a-z0-9]+)*\??)(?:\/[a-z][a-z0-9]*(?:-[a-z0-9]+)*\??)*-?/,
  },
  [Lexer.UnsignedInteger]: {
    pattern: /^\d+(?=\b)/,
  },
  // eslint-disable-next-line sort-keys/sort-keys-fix
  [Lexer.String]: {
    pattern: /^(?:\\[<>\{\}])+|[^\{>\\]+/,
  },
}

export type LexerTokenMappingType = {
  'lexer-close-evaluation': LexerCloseEvaluationTokenType
  'lexer-close-interpolation': LexerCloseInterpolationTokenType
  'lexer-close-parenthesis': LexerCloseParenthesisTokenType
  'lexer-close-text': LexerCloseTextTokenType
  'lexer-comma': LexerCommaTokenType
  'lexer-comment': LexerCommentTokenType
  'lexer-decimal': LexerDecimalTokenType
  'lexer-hashtag': LexerHashtagTokenType
  'lexer-line': LexerLineTokenType
  'lexer-open-evaluation': LexerOpenEvaluationTokenType
  'lexer-open-indentation': LexerOpenIndentationTokenType
  'lexer-open-interpolation': LexerOpenInterpolationTokenType
  'lexer-open-nesting': LexerOpenNestingTokenType
  'lexer-open-parenthesis': LexerOpenParenthesisTokenType
  'lexer-open-text': LexerOpenTextTokenType
  'lexer-path': LexerPathTokenType
  'lexer-signed-integer': LexerSignedIntegerTokenType
  'lexer-string': LexerStringTokenType
  'lexer-term-fragment': LexerTermFragmentTokenType
  'lexer-unsigned-integer': LexerUnignedIntegerTokenType
}

export type LexerTokenType<T extends Lexer> =
  LexerTokenMappingType[T]

export function tokenizeLinkText(
  input: LexerInputType,
): LexerResultType {
  const tokenList: Array<LexerTokenType<Lexer>> = []

  let source: LexerSplitInputType = {
    ...input,
    textInLines: input.text.split('\n'),
  }

  let typeStack = [LexerState.Tree]

  let line = 0
  let character = 0
  let offset = 0

  let i = 0
  lineLoop: for (let textLine of source.textInLines) {
    processLoop: while (textLine) {
      const state: LexerState =
        typeStack[typeStack.length - 1] || LexerState.Tree

      const patternList =
        state === LexerState.Tree
          ? LEXER_PATTERN_LIST
          : LEXER_STRING_PATTERN_LIST

      patternLoop: for (const type of patternList) {
        const config = PATTERN[type as Lexer]
        if (config && config.pattern instanceof RegExp) {
          const match = textLine.match(config.pattern)
          if (match) {
            const matchedLength = match[0].length
            const matchedText = textLine.slice(0, matchedLength)
            const token: LexerTokenType<Lexer> = {
              end: {
                character: character + matchedLength,
                line: line,
              },
              like: type as Lexer,
              offset: {
                end: offset + matchedLength,
                start: offset,
              },
              start: {
                character: character,
                line: line,
              },
              text: matchedText,
            }
            tokenList.push(token)

            textLine = textLine.slice(matchedLength)
            offset += matchedLength

            switch (type) {
              case Lexer.OpenInterpolation: {
                typeStack.push(LexerState.Tree)
                break
              }
              case Lexer.CloseInterpolation: {
                typeStack.pop()
                break
              }
              case Lexer.OpenText: {
                typeStack.push(LexerState.Text)
                break
              }
              case Lexer.CloseText: {
                typeStack.pop()
                break
              }
            }

            break patternLoop
          }
        }
      }
    }

    if (textLine.length) {
      api.throwError(
        api.generateSyntaxTokenError(
          source,
          tokenList[tokenList.length - 1],
        ),
      )
    }

    if (i < source.textInLines.length - 2) {
      const token: LexerTokenType<Lexer.Line> = {
        end: {
          character: character + 1,
          line: line,
        },
        like: Lexer.Line,
        offset: {
          end: offset + 1,
          start: offset,
        },
        start: {
          character: character,
          line: line,
        },
        text: '\n',
      }

      line++
      character = 0

      tokenList.push(token)
    }
  }

  const token: LexerTokenType<Lexer.Line> = {
    end: {
      character: character + 1,
      line: line,
    },
    like: Lexer.Line,
    offset: {
      end: offset + 1,
      start: offset,
    },
    start: {
      character: character,
      line: line,
    },
    text: '\n',
  }

  tokenList.push(token)

  return {
    ...source,
    tokenList,
  }
}

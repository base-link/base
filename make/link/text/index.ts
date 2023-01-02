import { code } from '~'

export enum Text {
  CloseEvaluation = 'text-close-evaluation',
  CloseInterpolation = 'text-close-interpolation',
  CloseParenthesis = 'text-close-parenthesis',
  ClosePath = 'text-close-path',
  CloseText = 'text-close-text',
  Comma = 'text-comma',
  Comment = 'text-comment',
  Decimal = 'text-decimal',
  Hashtag = 'text-hashtag',
  Line = 'text-line',
  OpenEvaluation = 'text-open-evaluation',
  OpenIndentation = 'text-open-indentation',
  OpenInterpolation = 'text-open-interpolation',
  OpenNesting = 'text-open-nesting',
  OpenParenthesis = 'text-open-parenthesis',
  OpenPath = 'text-open-path',
  OpenText = 'text-open-text',
  Path = 'text-path',
  SignedInteger = 'text-signed-integer',
  String = 'text-string',
  TermFragment = 'text-term-fragment',
  UnsignedInteger = 'text-unsigned-integer',
}

export type TextEditorRangeType = {
  end: number
  start: number
}

export type TextRangeMetadatType = {
  character: TextEditorRangeType
  line: TextEditorRangeType
  offset: TextEditorRangeType
}

// eslint-disable-next-line sort-exports/sort-exports
export const TEXT_PATH_PATTERN_LIST = [
  Text.OpenInterpolation,
  Text.CloseInterpolation,
  Text.Path,
  Text.ClosePath,
]

// eslint-disable-next-line sort-exports/sort-exports
export const TEXT_STRING_PATTERN_LIST = [
  Text.OpenInterpolation,
  Text.CloseInterpolation,
  Text.CloseText,
  Text.String,
]

// eslint-disable-next-line sort-exports/sort-exports
export const TEXT_TYPE = [
  Text.CloseEvaluation,
  Text.CloseInterpolation,
  Text.CloseParenthesis,
  Text.CloseText,
  Text.Comma,
  Text.Comment,
  Text.Decimal,
  Text.Hashtag,
  Text.Line,
  Text.OpenEvaluation,
  Text.OpenIndentation,
  Text.OpenInterpolation,
  Text.OpenNesting,
  Text.OpenParenthesis,
  Text.OpenText,
  Text.OpenPath,
  Text.ClosePath,
  Text.Path,
  Text.SignedInteger,
  Text.String,
  Text.TermFragment,
  Text.UnsignedInteger,
]

// eslint-disable-next-line sort-exports/sort-exports
export const TEXT_PATTERN_LIST = [
  Text.CloseEvaluation,
  Text.CloseInterpolation,
  Text.CloseParenthesis,
  Text.CloseText,
  Text.Comma,
  Text.Comment,
  Text.Decimal,
  Text.Hashtag,
  Text.OpenEvaluation,
  Text.OpenIndentation,
  Text.OpenInterpolation,
  Text.OpenNesting,
  Text.OpenParenthesis,
  Text.OpenText,
  Text.OpenPath,
  Text.SignedInteger,
  Text.TermFragment,
  Text.UnsignedInteger,
]

export type TextCloseEvaluationTokenType = TextTokenBaseType & {
  like: Text.CloseEvaluation
}

export type TextClosePathTokenType = TextTokenBaseType & {
  like: Text.ClosePath
}

export type TextInputType = {
  path: string
  text: string
}

export type TextLineRangeType = {
  character: number
  line: number
}

type TextLineTokenType = TextTokenBaseType & {
  like: Text.Line
}

type TextOpenIndentationTokenType = TextTokenBaseType & {
  like: Text.OpenIndentation
}

type TextDecimalTokenType = TextTokenBaseType & {
  like: Text.Decimal
}

type TextSignedIntegerTokenType = TextTokenBaseType & {
  like: Text.SignedInteger
}

type TextUnsignedIntegerTokenType = TextTokenBaseType & {
  like: Text.UnsignedInteger
}

type TextOpenNestingTokenType = TextTokenBaseType & {
  like: Text.OpenNesting
}

type TextOpenParenthesisTokenType = TextTokenBaseType & {
  like: Text.OpenParenthesis
}

type TextCloseParenthesisTokenType = TextTokenBaseType & {
  like: Text.CloseParenthesis
}

type TextOpenTextTokenType = TextTokenBaseType & {
  like: Text.OpenText
}

type TextCloseTextTokenType = TextTokenBaseType & {
  like: Text.CloseText
}

type TextOpenInterpolationTokenType = TextTokenBaseType & {
  like: Text.OpenInterpolation
}

type TextCloseInterpolationTokenType = TextTokenBaseType & {
  like: Text.CloseInterpolation
}

export type TextOpenEvaluationTokenType = TextTokenBaseType & {
  like: Text.OpenEvaluation
}

type TextCommaTokenType = TextTokenBaseType & {
  like: Text.Comma
}

type TextHashtagTokenType = TextTokenBaseType & {
  like: Text.Hashtag
}

type TextCommentTokenType = TextTokenBaseType & {
  like: Text.Comment
}

export type TextOpenPathTokenType = TextTokenBaseType & {
  like: Text.OpenPath
}

export type TextPathTokenType = TextTokenBaseType & {
  like: Text.Path
}

export type TextPatternConfigType = {
  pattern: RegExp
  skip?: boolean
}

export type TextRangeType = {
  end: number
  start: number
}

export type TextResultType = TextSplitInputType & {
  tokenList: Array<TextTokenType<Text>>
}

export type TextSplitInputType = TextInputType & {
  textByLine: Array<string>
}

export enum TextState {
  Path = 'path',
  Text = 'text',
  Tree = 'tree',
}

export type TextStringTokenType = TextTokenBaseType & {
  like: Text.String
}

export type TextTermFragmentTokenType = TextTokenBaseType & {
  like: Text.TermFragment
}

export type TextTokenBaseType = {
  range: TextRangeMetadatType
  text: string
}

export type TextTokenMappingType = {
  'text-close-evaluation': TextCloseEvaluationTokenType
  'text-close-interpolation': TextCloseInterpolationTokenType
  'text-close-parenthesis': TextCloseParenthesisTokenType
  'text-close-path': TextClosePathTokenType
  'text-close-text': TextCloseTextTokenType
  'text-comma': TextCommaTokenType
  'text-comment': TextCommentTokenType
  'text-decimal': TextDecimalTokenType
  'text-hashtag': TextHashtagTokenType
  'text-line': TextLineTokenType
  'text-open-evaluation': TextOpenEvaluationTokenType
  'text-open-indentation': TextOpenIndentationTokenType
  'text-open-interpolation': TextOpenInterpolationTokenType
  'text-open-nesting': TextOpenNestingTokenType
  'text-open-parenthesis': TextOpenParenthesisTokenType
  'text-open-path': TextOpenPathTokenType
  'text-open-text': TextOpenTextTokenType
  'text-path': TextPathTokenType
  'text-signed-integer': TextSignedIntegerTokenType
  'text-string': TextStringTokenType
  'text-term-fragment': TextTermFragmentTokenType
  'text-unsigned-integer': TextUnsignedIntegerTokenType
}

const PATTERN: Record<Text, TextPatternConfigType> = {
  [Text.CloseEvaluation]: {
    pattern: /^ *\] */,
  },
  [Text.CloseInterpolation]: {
    pattern: /^\}/,
  },
  [Text.CloseParenthesis]: {
    pattern: /^\)/,
  },
  [Text.CloseText]: {
    pattern: /^>/,
  },
  [Text.Comma]: {
    pattern: /^, /,
  },
  [Text.Comment]: {
    pattern: /^# [^\n]+/,
  },
  [Text.Decimal]: {
    pattern: /^-?\d+\.\d+/,
  },
  [Text.Hashtag]: {
    pattern: /^#\w+/,
  },
  [Text.Line]: {
    pattern: /^\n/,
  },
  [Text.OpenEvaluation]: {
    pattern: /^ *\[ */,
  },
  [Text.OpenIndentation]: {
    pattern: /^  /,
  },
  [Text.OpenInterpolation]: {
    pattern: /^\{/,
  },
  [Text.OpenNesting]: {
    pattern: /^ /,
  },
  [Text.OpenParenthesis]: {
    pattern: /^\(/,
  },
  [Text.OpenText]: {
    pattern: /^</,
  },
  [Text.OpenPath]: {
    pattern: /^(?:(?:@[\w:\-\.]+\/)|(?:\.{1,2}\/)|(?:\/))/,
  },
  [Text.Path]: {
    pattern: /^[\w:\-\.]+(\/[\w:\-\.]+)*/,
  },
  [Text.ClosePath]: {
    pattern: /^[\n, ]/,
    skip: true,
  },
  [Text.SignedInteger]: {
    pattern: /^-\d+(?=\b)/,
  },
  [Text.TermFragment]: {
    pattern:
      /^-?(?:[*~]?[a-z][a-z0-9]*(?:-[a-z0-9]+)*\??)(?:\/[a-z][a-z0-9]*(?:-[a-z0-9]+)*\??)*-?/,
  },
  [Text.UnsignedInteger]: {
    pattern: /^\d+(?=\b)/,
  },
  // eslint-disable-next-line sort-keys/sort-keys-fix
  [Text.String]: {
    pattern: /^(?:\\[<>\{\}])+|[^\{>\\]+/,
  },
}

export type TextTokenType<T extends Text> =
  TextTokenMappingType[T]

export type TextType =
  | TextCloseEvaluationTokenType
  | TextLineTokenType
  | TextOpenIndentationTokenType
  | TextDecimalTokenType
  | TextSignedIntegerTokenType
  | TextUnsignedIntegerTokenType
  | TextOpenNestingTokenType
  | TextOpenParenthesisTokenType
  | TextCloseParenthesisTokenType
  | TextOpenTextTokenType
  | TextCloseTextTokenType
  | TextOpenInterpolationTokenType
  | TextCloseInterpolationTokenType
  | TextCommaTokenType
  | TextHashtagTokenType
  | TextCommentTokenType
  | TextOpenEvaluationTokenType
  | TextStringTokenType
  | TextTermFragmentTokenType
  | TextOpenPathTokenType
  | TextClosePathTokenType
  | TextPathTokenType

export function tokenizeLinkText(
  input: TextInputType,
): TextResultType {
  const tokenList: Array<TextTokenType<Text>> = []

  let source: TextSplitInputType = {
    ...input,
    textByLine: input.text.split('\n'),
  }

  let typeStack = [TextState.Tree]

  let line = 0
  let character = 0
  let offset = 0

  let i = 0
  lineLoop: for (let textLine of source.textByLine) {
    processLoop: while (textLine) {
      const state: TextState =
        typeStack[typeStack.length - 1] || TextState.Tree

      let patternList = TEXT_PATTERN_LIST

      switch (state) {
        case TextState.Tree:
          patternList = TEXT_PATTERN_LIST
          break
        case TextState.Text:
          patternList = TEXT_STRING_PATTERN_LIST
          break
        case TextState.Path:
          patternList = TEXT_PATH_PATTERN_LIST
          break
        default:
          patternList = TEXT_PATTERN_LIST
          break
      }

      patternLoop: for (const type of patternList) {
        const config = PATTERN[type as Text]
        if (config && config.pattern instanceof RegExp) {
          const match = textLine.match(config.pattern)

          if (match) {
            if (!config.skip) {
              const matchedLength = match[0].length
              const matchedText = textLine.slice(
                0,
                matchedLength,
              )
              const token: TextTokenType<Text> = {
                like: type as Text,
                range: {
                  character: {
                    end: character + matchedLength,
                    start: character,
                  },
                  line: {
                    end: line,
                    start: line,
                  },
                  offset: {
                    end: offset + matchedLength,
                    start: offset,
                  },
                },
                text: matchedText,
              }
              tokenList.push(token)

              textLine = textLine.slice(matchedLength)
              offset += matchedLength
              character += matchedLength
            }

            switch (type) {
              case Text.OpenInterpolation: {
                typeStack.push(TextState.Tree)
                break
              }
              case Text.CloseInterpolation: {
                typeStack.pop()
                break
              }
              case Text.OpenText: {
                typeStack.push(TextState.Text)
                break
              }
              case Text.CloseText: {
                typeStack.pop()
                break
              }
              case Text.OpenPath: {
                typeStack.push(TextState.Path)
                break
              }
              case Text.ClosePath: {
                typeStack.pop()
                break
              }
              default:
                break
            }

            break patternLoop
          }
        }
      }
    }

    if (textLine.length) {
      code.throwError(
        code.generateSyntaxTokenError(
          source,
          tokenList[tokenList.length - 1],
        ),
      )
    }

    if (i < source.textByLine.length - 2) {
      const state = typeStack[typeStack.length - 1]
      const token: TextTokenType<Text.Line | Text.String> = {
        like: state == TextState.Text ? Text.String : Text.Line,
        range: createBasicRange(line, character, offset, 1),
        text: '\n',
      }

      if (state === TextState.Path) {
        const close = {
          like: Text.ClosePath,
          range: createBasicRange(line, character, offset),
          text: '',
        }
        tokenList.push(close)
      }

      line++
      character = 0

      tokenList.push(token)
    }
  }

  const token: TextTokenType<Text.Line> = {
    like: Text.Line,
    range: createBasicRange(line, character, offset, 1),
    text: '\n',
  }

  tokenList.push(token)

  return {
    ...source,
    tokenList,
  }
}

function createBasicRange(
  line: number,
  character: number,
  offset: number,
  length = 0,
) {
  return {
    character: {
      end: character + length,
      start: character,
    },
    line: {
      end: line,
      start: line,
    },
    offset: {
      end: offset + length,
      start: offset,
    },
  }
}

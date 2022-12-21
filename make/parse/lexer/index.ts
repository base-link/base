type LexerBasicTokenLikeType =
  | 'line'
  | 'open-indentation'
  | 'close-indentation'
  | 'term-open'
  | 'term-close'
  | 'end-slot'

type LexerDataTokenLikeType =
  | 'comb'
  | 'mark'
  | 'open-parenthesis'
  | 'close-parenthesis'
  | 'open-text'
  | 'close-text'
  | 'open-interpolation'
  | 'close-interpolation'
  | 'term-part'
  | 'term-part-separator'
  | 'nest-separator'
  | 'open-nest'
  | 'close-nest'
  | 'text'
  | 'slot'
  | 'code'
  | 'comment'

type LexerPatternLikeType =
  | LexerBasicTokenLikeType
  | LexerDataTokenLikeType

export const LEXER_DATA_TOKEN_TYPE = [
  'comb',
  'mark',
  'open-parenthesis',
  'close-parenthesis',
  'open-text',
  'close-text',
  'open-interpolation',
  'close-interpolation',
  'term-part',
  'term-part-separator',
  'nest-separator',
  'open-nest',
  'close-nest',
  'text',
  'slot',
  'code',
  'comment',
]

type LexerPatternAType = [RegExp, LexerPatternLikeType]

type LexerPatternBType = [RegExp, LexerPatternLikeType, boolean]

type LexerPatternCType = [
  RegExp,
  LexerPatternLikeType,
  boolean | null,
  boolean,
]

type LexerPatternDType = [
  RegExp,
  LexerPatternLikeType,
  boolean,
  boolean | null,
  (t: string) => string,
]

type LexerPatternType =
  | LexerPatternAType
  | LexerPatternBType
  | LexerPatternCType
  | LexerPatternDType

type LexerLineTokenType = {
  like: 'line'
}

type LexerOpenIndentationTokenType = {
  like: 'open-indentation'
}

type LexerCloseIndentationTokenType = {
  like: 'close-indentation'
}

type LexerTermOpenTokenType = {
  like: 'term-open'
}

type LexerTermCloseTokenType = {
  like: 'term-close'
}

type LexerEndSlotTokenType = {
  like: 'end-slot'
}

type LexerCombTokenType = LexerDataTokenType & {
  like: 'comb'
}

type LexerMarkTokenType = LexerDataTokenType & {
  like: 'mark'
}

type LexerOpenParenthesisTokenType = LexerDataTokenType & {
  like: 'open-parenthesis'
}

type LexerCloseParenthesisTokenType = LexerDataTokenType & {
  like: 'close-parenthesis'
}

type LexerOpenTextTokenType = LexerDataTokenType & {
  like: 'open-text'
}

type LexerCloseTextTokenType = LexerDataTokenType & {
  like: 'close-text'
}

type LexerOpenInterpolationTokenType = LexerDataTokenType & {
  like: 'open-interpolation'
}

type LexerCloseInterpolationTokenType = LexerDataTokenType & {
  like: 'close-interpolation'
}

type LexerTermPartTokenType = LexerDataTokenType & {
  like: 'term-part'
}

type LexerTermPartSeparatorTokenType = LexerDataTokenType & {
  like: 'term-part-separator'
}

type LexerNestSeparatorTokenType = LexerDataTokenType & {
  like: 'nest-separator'
}

type LexerOpenNestTokenType = LexerDataTokenType & {
  like: 'open-nest'
}

type LexerCloseNestTokenType = LexerDataTokenType & {
  like: 'close-nest'
}

type LexerTextTokenType = LexerDataTokenType & {
  like: 'text'
}

type LexerSlotTokenType = LexerDataTokenType & {
  like: 'slot'
}

type LexerCodeTokenType = LexerDataTokenType & {
  like: 'code'
}

type LexerCommentTokenType = LexerDataTokenType & {
  like: 'comment'
}

export type LexerDataTokenType = {
  end: number
  like: LexerDataTokenLikeType
  lineCharacterNumberEnd: number
  lineCharacterNumberStart: number
  lineNumber: number
  start: number
  text: string
}

export type LexerTokenType =
  | LexerCombTokenType
  | LexerMarkTokenType
  | LexerOpenParenthesisTokenType
  | LexerCloseParenthesisTokenType
  | LexerOpenTextTokenType
  | LexerCloseTextTokenType
  | LexerOpenInterpolationTokenType
  | LexerCloseInterpolationTokenType
  | LexerTermPartTokenType
  | LexerTermPartSeparatorTokenType
  | LexerNestSeparatorTokenType
  | LexerOpenNestTokenType
  | LexerCloseNestTokenType
  | LexerTextTokenType
  | LexerSlotTokenType
  | LexerCodeTokenType
  | LexerCommentTokenType
  | LexerLineTokenType
  | LexerOpenIndentationTokenType
  | LexerCloseIndentationTokenType
  | LexerTermOpenTokenType
  | LexerTermCloseTokenType
  | LexerEndSlotTokenType

const termPatterns: Array<LexerPatternType> = [
  [/^-?\d+\.\d+/, 'comb', true],
  [/^-?\d+(?=[\s\n,\/\)\}])/, 'mark', true],
  [/^\(/, 'open-parenthesis'],
  [/^ /, 'open-parenthesis', null, true],
  [/^\)/, 'close-parenthesis'],
  [/^</, 'open-text'],
  [/^>/, 'close-text'],
  [/^\{+/, 'open-interpolation', true],
  [/^\}+/, 'close-interpolation', true],
  [/^[a-z\-0-9]+/, 'term-part', true],
  [/^-/, 'term-part-separator', true],
  [/^\//, 'nest-separator', true],
  [/^\[/, 'open-nest'],
  [/^\]/, 'close-nest'],
  [/^[@\/\.][^\s]*/, 'text', true],
  [/^, /, 'slot'],
  [/^#\w+/, 'code', true],
  [/^# .+/, 'comment'],
]

const stringPatterns: Array<LexerPatternType> = [
  [/^\{+/, 'open-interpolation', true],
  [
    /^(?:\\[<>\{\}])+/,
    'text',
    true,
    null,
    (t: string) => t.replace(/\\/g, ''),
  ],
  [/^[^\{>\\]+/, 'text', true],
  [/^>/, 'close-text'],
]

function lex(text: string): Array<LexerTokenType> {
  let str = text
  const tokens: Array<LexerTokenType> = []

  const indents = [0]
  let nesting = 0
  let matched = false
  const typeStack: Array<string> = ['tree']

  let lineNumber = 0
  let lineCharacterNumber = 0

  let offset = 0

  while (str.length) {
    const type = typeStack[typeStack.length - 1]

    if (str.startsWith('\n') && type === 'tree') {
      str = str.slice(1)
      lineNumber += 1
      lineCharacterNumber = 0
      offset += 1
      while (true) {
        const match = str.match(/^ *\n/)
        if (match != null) {
          str = str.slice(match[0].length)
          offset += match[0].length
          lineNumber += 1
          lineCharacterNumber = 0
        } else {
          break
        }
      }
      if (str.match(/^ *$/)) {
        while (nesting > 1) {
          tokens.push({
            like: 'close-indentation',
          })
          nesting--
        }
        while (indents.length) {
          tokens.push({
            like: 'close-indentation',
          })
          indents.pop()
        }
        break
      }
      if (!matched) {
        continue
      }
      const match = str.match(/^ +/)
      const newIndent = match ? match[0].length : 0
      if (match) {
        offset += match[0].length
        lineCharacterNumber += match[0].length
        str = str.slice(match[0].length)
      }
      if (newIndent % 2 != 0) {
        throw new Error('Indentation error')
      }
      const oldIndent = indents[indents.length - 1]

      if (oldIndent != null) {
        if (newIndent === oldIndent) {
          while (nesting) {
            tokens.push({
              like: 'close-indentation',
            })
            nesting--
          }
          // foo bar
          //   foo bar
          //   foo bar
          tokens.push({
            like: 'line',
          })
        } else if (newIndent > oldIndent) {
          while (nesting > 1) {
            tokens.push({
              like: 'close-indentation',
            })
            nesting--
          }

          if (newIndent - oldIndent != 2) {
            throw new Error('Indentation error')
          }
          // foo bar
          //   foo bar baz
          //     foo bar
          tokens.push({
            like: 'line',
          })
          indents.push(newIndent)
          nesting = 0
        } else {
          if (Math.abs(newIndent - oldIndent) % 2 != 0) {
            throw new Error('Indentation error')
          }
          while (nesting) {
            tokens.push({
              like: 'close-indentation',
            })
            nesting--
          }
          let diff = (oldIndent - newIndent) / 2
          while (diff) {
            tokens.push({
              like: 'close-indentation',
            })
            diff--
            indents.pop()
          }
          tokens.push({
            like: 'line',
          })
          // indents.push(newIndent)
        }
      }
    } else {
      const patterns =
        type === 'text' ? stringPatterns : termPatterns
      x: for (const pattern of patterns) {
        const match = str.match(pattern[0])
        if (match) {
          matched = true
          const text = match[0]
          const start = offset
          const end = start + text.length

          const attrs = {
            end,
            like: pattern[1],
            lineCharacterNumberEnd:
              lineCharacterNumber + text.length,
            lineCharacterNumberStart: lineCharacterNumber,
            lineNumber,
            start,
            text: '',
          }
          if (pattern[1] === 'open-text') {
            typeStack.push('text')
          }
          if (pattern[1] === 'close-text') {
            typeStack.pop()
          } else if (pattern[1] === 'open-interpolation') {
            typeStack.push('tree')
          } else if (pattern[1] === 'close-interpolation') {
            typeStack.pop()
          }
          if (pattern[3]) {
            nesting++
          }

          if (pattern[2]) {
            attrs.text = pattern[4] ? pattern[4](text) : text
          }

          tokens.push(attrs)
          str = str.slice(text.length)
          offset += text.length
          lineCharacterNumber += text.length
          break x
        }
      }
    }
  }
  while (nesting > 1) {
    tokens.push({
      like: 'close-indentation',
    })
    nesting--
  }
  while (indents.length) {
    tokens.push({
      like: 'close-indentation',
    })
    indents.pop()
  }

  return normalize(tokens)
}

function normalize(
  list: Array<LexerTokenType>,
): Array<LexerTokenType> {
  const out: Array<LexerTokenType> = [
    { like: 'open-indentation' },
  ]
  let i = 0
  while (i < list.length) {
    const token = list[i++]

    if (token) {
      switch (token.like) {
        case `open-parenthesis`:
        case `open-indentation`: {
          out.push(token)
          break
        }
        case `close-parenthesis`:
        case `close-indentation`: {
          out.push(token)
          break
        }
        case `term-part`: {
          const last = list[i - 2]
          switch (last && last.like) {
            case 'term-part':
            case 'term-part-separator':
            case 'close-interpolation':
              break
            default:
              out.push({
                like: 'term-open',
              })
              break
          }
          out.push(token)
          const next = list[i]
          if (next) {
            switch (next.like) {
              case 'term-part':
              case 'term-part-separator':
              case 'open-interpolation':
                break
              default:
                out.push({
                  like: 'term-close',
                })
                break
            }
          }
          break
        }
        case 'term-part-separator': {
          const typedToken = token as LexerDataTokenType
          const last = out[out.length - 1] as LexerDataTokenType
          if (last.like === 'term-part') {
            last.text += typedToken.text
            last.end = typedToken.end
            last.lineCharacterNumberEnd =
              typedToken.lineCharacterNumberEnd
          } else {
            out.push({
              end: typedToken.end,
              like: 'term-part',
              lineCharacterNumberEnd:
                typedToken.lineCharacterNumberEnd,
              lineCharacterNumberStart:
                typedToken.lineCharacterNumberStart,
              lineNumber: typedToken.lineNumber,
              start: typedToken.start,
              text: typedToken.text,
            })
          }
          break
        }
        case `nest-separator`: {
          out.push(token)
          break
        }
        case `open-nest`: {
          out.push(token)
          break
        }
        case `close-nest`: {
          out.push(token)
          break
        }
        case `open-text`: {
          out.push(token)
          break
        }
        case `close-text`: {
          out.push(token)
          break
        }
        case `open-interpolation`: {
          const last = list[i - 2]
          if (last) {
            switch (last.like) {
              case 'line':
              case 'open-parenthesis':
              case 'open-indentation': {
                out.push({
                  like: 'term-open',
                })
                break
              }
            }
          }
          out.push(token)
          break
        }
        case `close-interpolation`: {
          const last = list[i - 2]

          if (last) {
            switch (last.like) {
              case 'close-text':
              case 'mark':
              case 'comb':
                out.push({
                  like: 'close-indentation',
                })
                break
            }
          }

          out.push(token)

          const next = list[i]

          if (next) {
            switch (next.like) {
              case 'slot':
              case 'line':
              case 'open-parenthesis':
              case 'close-parenthesis':
              case 'open-indentation':
              case 'close-indentation':
                out.push({
                  like: 'term-close',
                })
                break
            }
          }
          break
        }
        case `text`: {
          out.push(token)
          break
        }
        case `slot`: {
          out.push(token)
          break
        }
        case `line`: {
          // out.push({
          //   like: 'close-parenthesis'
          // })
          out.push({
            like: 'end-slot',
          })
          break
        }
        case `mark`: {
          out.push(token)
          break
        }
        case `code`: {
          out.push(token)
          break
        }
        case `comb`: {
          out.push(token)
          break
        }
      }
    }
  }
  out.push({ like: 'close-indentation' })
  return out
}

export default lex

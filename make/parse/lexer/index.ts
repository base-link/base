
type FormTokenType = {
  form: string
}

type DataTokenType = FormTokenType & {
  text: string
  start: number
  end: number
  lineNumber: number
  lineCharacterNumberStart: number
  lineCharacterNumberEnd: number
}

export type TokenType = FormTokenType | DataTokenType

module.exports = lex

type PatternAType = [RegExp, string]

type PatternBType = [RegExp, string, boolean]

type PatternCType = [RegExp, string, boolean | null, boolean]

type PatternDType = [
  RegExp,
  string,
  boolean,
  boolean | null,
  (t: string) => string,
]

type PatternType =
  | PatternAType
  | PatternBType
  | PatternCType
  | PatternDType

const termPatterns: Array<PatternType> = [
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

const stringPatterns: Array<PatternType> = [
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

function lex(text: string): Array<TokenType> {
  let str = text
  const tokens: Array<TokenType> = []

  const indents = [0]
  let nesting = 0
  let matched = false
  let isString = false
  const typeStack = ['tree']

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
            form: 'close-parenthesis',
          })
          nesting--
        }
        while (indents.length) {
          tokens.push({
            form: 'close-parenthesis',
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
      if (newIndent === oldIndent) {
        while (nesting) {
          tokens.push({
            form: 'close-parenthesis',
          })
          nesting--
        }
        // foo bar
        //   foo bar
        //   foo bar
        tokens.push({
          form: 'line',
        })
      } else if (newIndent > oldIndent) {
        while (nesting > 1) {
          tokens.push({
            form: 'close-parenthesis',
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
          form: 'line',
        })
        indents.push(newIndent)
        nesting = 0
      } else {
        if (Math.abs(newIndent - oldIndent) % 2 != 0) {
          throw new Error('Indentation error')
        }
        while (nesting) {
          tokens.push({
            form: 'close-parenthesis',
          })
          nesting--
        }
        let diff = (oldIndent - newIndent) / 2
        while (diff) {
          tokens.push({
            form: 'close-parenthesis',
          })
          diff--
          indents.pop()
        }
        tokens.push({
          form: 'line',
        })
        // indents.push(newIndent)
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
            form: pattern[1],
            text: '',
            start,
            end,
            lineNumber,
            lineCharacterNumberStart: lineCharacterNumber,
            lineCharacterNumberEnd:
              lineCharacterNumber + text.length,
          }
          if (pattern[1] === 'open-text') {
            typeStack.push('text')
          }
          if (pattern[1] === 'close-text') {
            isString = false
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
      form: 'close-parenthesis',
    })
    nesting--
  }
  while (indents.length) {
    tokens.push({
      form: 'close-parenthesis',
    })
    indents.pop()
  }

  return normalize(tokens)
}

function normalize(list: Array<TokenType>): Array<TokenType> {
  const out: Array<TokenType> = [{ form: 'open-parenthesis' }]
  let i = 0
  while (i < list.length) {
    const token = list[i++]
    switch (token.form) {
      case `open-parenthesis`: {
        out.push(token)
        break
      }
      case `close-parenthesis`: {
        out.push(token)
        break
      }
      case `term-part`: {
        const last = list[i - 2]
        switch (last.form) {
          case 'term-part':
          case 'term-part-separator':
          case 'close-interpolation':
            break
          default:
            out.push({
              form: 'term-open',
            })
            break
        }
        out.push(token)
        const next = list[i]
        switch (next.form) {
          case 'term-part':
          case 'term-part-separator':
          case 'open-interpolation':
            break
          default:
            out.push({
              form: 'term-close',
            })
            break
        }
        break
      }
      case 'term-part-separator': {
        const typedToken = token as DataTokenType
        const last = out[out.length - 1] as DataTokenType
        if (last.form === 'term-part') {
          last.text += typedToken.text
          last.end = typedToken.end
          last.lineCharacterNumberEnd =
            typedToken.lineCharacterNumberEnd
        } else {
          out.push({
            form: 'term-part',
            text: typedToken.text,
            start: typedToken.start,
            end: typedToken.end,
            lineNumber: typedToken.lineNumber,
            lineCharacterNumberStart:
              typedToken.lineCharacterNumberStart,
            lineCharacterNumberEnd:
              typedToken.lineCharacterNumberEnd,
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
        switch (last.form) {
          case 'line':
          case 'open-parenthesis': {
            out.push({
              form: 'term-open',
            })
            break
          }
        }
        out.push(token)
        break
      }
      case `close-interpolation`: {
        const last = list[i - 2]

        switch (last.form) {
          case 'close-text':
          case 'mark':
          case 'comb':
            out.push({
              form: 'close-parenthesis',
            })
            break
        }

        out.push(token)

        const next = list[i]

        switch (next.form) {
          case 'slot':
          case 'line':
          case 'open-parenthesis':
          case 'close-parenthesis':
            out.push({
              form: 'term-close',
            })
            break
        }
        break
      }
      case `text`: {
        out.push(token)
        break
      }
      case `slot`: {
        out.push({
          form: 'slot',
        })
        break
      }
      case `line`: {
      // out.push({
      //   form: 'close-parenthesis'
      // })
        out.push({
          form: 'slot',
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
  out.push({ form: 'close-parenthesis' })
  return out
}

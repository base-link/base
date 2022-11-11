
module.exports = lex

const termPatterns = [
  [/^-?\d+\.\d+/, 'comb', true],
  [/^-?\d+(?=[\s\n,\/\)\}])/, 'mark', true],
  [/^\(/, 'open-parenthesis'],
  [/^ /, 'open-parenthesis', null, true],
  [/^\)/, 'close-parenthesis'],
  [/^</, 'open-text'],
  [/^>/, 'close-text'],
  [/^\{/, 'open-interpolation'],
  [/^\}/, 'close-interpolation'],
  [/^[a-z\-0-9]+/, 'term-part', true],
  [/^-/, 'term-part-separator', true],
  [/^\//, 'nest-separator', true],
  [/^\[/, 'open-nest'],
  [/^\]/, 'close-nest'],
  [/^[@\/\.][^\s]*/, 'text', true],
  [/^, /, 'slot'],
  [/^#\w+/, 'code', true],
]

const stringPatterns = [
  [/^\{/, 'open-interpolation'],
  [/^(?:\\[<>\{\}])+/, 'text', true, null, t => t.replace(/\\/g, '')],
  [/^[^\{>\\]+/, 'text', true],
  [/^>/, 'close-text'],
]

function lex(text) {
  let str = text
  const tokens = []

  let indents = [0]
  let nesting = 0
  let matched = false
  let isString = false
  let typeStack = ['tree']

  let offset = 0

  while (str.length) {
    let type = typeStack[typeStack.length - 1]

    if (str[0] == '\n' && type === 'tree') {
      str = str.substr(1)
      offset += 1
      while (true) {
        let match = str.match(/^ *\n/)
        if (match) {
          str = str.substr(match[0].length)
          offset += match[0].length
        } else {
          break
        }
      }
      if (str.match(/^ *$/)) {
        while (nesting > 1) {
          tokens.push({
            form: 'close-parenthesis'
          })
          nesting--
        }
        while (indents.length) {
          tokens.push({
            form: 'close-parenthesis'
          })
          indents.pop()
        }
        break
      }
      if (!matched) {
        continue
      }
      let match = str.match(/^ +/)
      let newIndent = match ? match[0].length : 0
      if (match) {
        offset += match[0].length
        str = str.substr(match[0].length)
      }
      if (newIndent % 2 != 0) throw new Error('Indentation error')
      let oldIndent = indents[indents.length - 1]
      if (newIndent === oldIndent) {
        while (nesting) {
          tokens.push({
            form: 'close-parenthesis'
          })
          nesting--
        }
        // foo bar
        //   foo bar
        //   foo bar
        tokens.push({
          form: 'line'
        })
      } else if (newIndent > oldIndent) {
        while (nesting > 1) {
          tokens.push({
            form: 'close-parenthesis'
          })
          nesting--
        }
        if (newIndent - oldIndent != 2) throw new Error('Indentation error')
        // foo bar
        //   foo bar baz
        //     foo bar
        tokens.push({
          form: 'line'
        })
        indents.push(newIndent)
        nesting = 0
      } else {
        if (Math.abs(newIndent - oldIndent) % 2 != 0) throw new Error('Indentation error')
        while (nesting) {
          tokens.push({
            form: 'close-parenthesis'
          })
          nesting--
        }
        let diff = (oldIndent - newIndent) / 2
        while (diff) {
          tokens.push({
            form: 'close-parenthesis'
          })
          diff--
          indents.pop()
        }
        tokens.push({
          form: 'line'
        })
        // indents.push(newIndent)
      }
    } else {
      let patterns = type === 'text' ? stringPatterns : termPatterns
      x:
      for (let pattern of patterns) {
        let match = str.match(pattern[0])
        if (match) {
          matched = true
          let text = match[0]
          const start = offset
          const end = start + text.length

          let attrs = {
            form: pattern[1],
            start,
            end
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
          str = str.substr(text.length)
          offset += text.length
          break x
        }
      }
    }
  }
  while (nesting > 1) {
    tokens.push({
      form: 'close-parenthesis'
    })
    nesting--
  }
  while (indents.length) {
    tokens.push({
      form: 'close-parenthesis'
    })
    indents.pop()
  }
  return normalize(tokens)
}

function normalize(list) {
  const out = [{ form: 'open-parenthesis' }]
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
        if (last) {
          switch (last.form) {
            case 'term-part':
            case 'term-part-separator':
            case 'close-interpolation':
              break
            default:
              out.push({
                form: 'term-open'
              })
              break
          }
        } else {
          out.push({
            form: 'term-open'
          })
        }
        out.push(token)
        const next = list[i]
        if (next) {
          switch (next.form) {
            case 'term-part':
            case 'term-part-separator':
            case 'open-interpolation':
              break
            default:
              out.push({
                form: 'term-close'
              })
              break
          }
        }
        break
      }
      case `term-part-separator`: {
        const last = out[out.length - 1]
        if (last.form === 'term-part') {
          last.text += token.text
          last.end = token.end
        } else {
          out.push({
            form: 'term-part',
            text: token.text,
            start: token.start,
            end: token.end
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
          switch (last.form) {
            case 'line':
            case 'open-parenthesis': {
              out.push({
                form: 'term-open'
              })
              break
            }
          }
        } else {
          out.push({
            form: 'term-open'
          })
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
              form: 'close-parenthesis'
            })
            break
        }

        out.push(token)

        const next = list[i]

        if (next) {
          switch (next.form) {
            case 'slot':
            case 'line':
            case 'open-parenthesis':
            case 'close-parenthesis':
              out.push({
                form: 'term-close'
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
        out.push({
          form: 'slot'
        })
        break
      }
      case `line`: {
        // out.push({
        //   form: 'close-parenthesis'
        // })
        out.push({
          form: 'slot'
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

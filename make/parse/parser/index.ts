
import { TokenType } from '../lexer'

type TermType = {
  like: string
  link: Array<CordType>
}

type CordType = {
  like: string
  cord: string
}

type NestType = {
  like: string
  line: Array<TermType>
  nest: Array<NestType>
}

type ParseTokenType = TermType | CordType | NestType

module.exports = parse

function parse(list: Array<TokenType>) {
  const start = {
    like: 'nest',
    line: [
      {
        like: 'term',
        link: [
          {
            like: 'cord',
            cord: 'file'
          }
        ]
      }
    ],
    nest: []
  }
  const stack: Array<ParseTokenType> = [ start ]
  let i = 0

  while (i < list.length) {
    const token = list[i++]
    // console.log(token.like, stack)
    switch (token.form) {
      case `term-open`: {
        const node = stack[stack.length - 1]
        const term = {
          like: 'term',
          link: []
        }
        node.line.push(term)
        stack.push(term)
        break
      }
      case `term-close`: {
        stack.pop()
        break
      }
      case `open-parenthesis`: {
        const node = stack[stack.length - 1]
        const nest = {
          like: 'nest',
          line: [],
          nest: []
        }
        node.nest.push(nest)
        stack.push(nest)
        break
      }
      case `close-parenthesis`: {
        stack.pop()
        break
      }
      case `slot`: {
        stack.pop()
        const node = stack[stack.length - 1]

        const nest = {
          like: 'nest',
          line: [],
          nest: []
        }
        node.nest.push(nest)
        stack.push(nest)
        break
      }
      case `term-part`: {
        const term = stack[stack.length - 1]
        const last = term.link[term.link.length - 1]
        if (last && last.like === 'cord') {
          last.cord += token.text
          last.end = token.end
        } else {
          term.link.push({
            like: 'cord',
            cord: token.text,
            start: token.start,
            end: token.end,
            lineNumberStart: token.lineNumberStart,
            lineNumberEnd: token.lineNumberEnd,
          })
        }
        break
      }
      case `nest-separator`: {
        break
      }
      case `open-nest`: {
        const node = stack[stack.length - 1]
        const nest = {
          like: 'nest',
          line: [],
          nest: []
        }
        node.line.push(nest)
        stack.push(nest)
        break
      }
      case `close-nest`: {
        stack.pop()
        break
      }
      case `open-text`: {
        const node = stack[stack.length - 1]
        const text = {
          like: 'text',
          link: []
        }
        node.line.push(text)
        stack.push(text)
        break
      }
      case `close-text`: {
        stack.pop()
        break
      }
      case `open-interpolation`: {
        const text = stack[stack.length - 1]
        const nest = {
          like: 'nest',
          line: [],
          nest: [],
          size: token.text.length
        }
        text.link.push(nest)
        stack.push(nest)
        break
      }
      case `close-interpolation`: {
        stack.pop()
        break
      }
      case `text`: {
        const text = stack[stack.length - 1]
        if (text.like === 'text') {
          const last = text.link[text.link.length - 1]
          if (last && last.like === 'cord') {
            last.cord += token.text
            last.end = token.end
          } else {
            text.link.push({
              like: `cord`,
              cord: token.text,
              start: token.start,
              end: token.end,
              lineNumberStart: token.lineNumberStart,
              lineNumberEnd: token.lineNumberEnd,
            })
          }
        } else {
          const node = stack[stack.length - 1]
          const text = {
            like: 'text',
            link: [
              {
                like: `cord`,
                cord: token.text,
                start: token.start,
                end: token.end,
                lineNumberStart: token.lineNumberStart,
                lineNumberEnd: token.lineNumberEnd,
              }
            ]
          }
          node.line.push(text)
          // stack.push(text)
        }
        break
      }
      case `line`: {
        stack.pop()
        break
      }
      case `mark`: {
        const nest = stack[stack.length - 1]
        const mark = {
          like: `mark`,
          mark: parseInt(token.text, 10),
          start: token.start,
          end: token.end,
          lineNumberStart: token.lineNumberStart,
          lineNumberEnd: token.lineNumberEnd,
        }
        nest.line.push(mark)
        break
      }
      case `code`: {
        const node = stack[stack.length - 1]
        token.text.match(/#(\w)(\w+)/)
        let like = RegExp.$1
        let val = RegExp.$2
        if (!like.match(/[ubohx]/)) {
          throw new Error(like)
        }
        const code = {
          like: 'code',
          base: like,
          code: val,//String.fromCharCode(parseInt(val, 16))
          start: token.start,
          end: token.end,
          lineNumberStart: token.lineNumberStart,
          lineNumberEnd: token.lineNumberEnd,
        }
        node.line.push(code)
        break
      }
      case `comb`: {
        const node = stack[stack.length - 1]
        const comb = {
          like: `comb`,
          fill: parseFloat(token.text),
          start: token.start,
          end: token.end,
          lineNumberStart: token.lineNumberStart,
          lineNumberEnd: token.lineNumberEnd,
        }
        node.line.push(comb)
        break
      }
    }
  }
  return start
}

import {
  LexerTokenType,
  LexerDataTokenType,
  LEXER_DATA_TOKEN_TYPE,
} from '../lexer'

type ParserTokenNodeType = {
  start: number
  end: number
  lineNumber: number
  lineCharacterNumberStart: number
  lineCharacterNumberEnd: number
}

type ParserTermNodeType = {
  like: 'term'
  link: Array<ParserCordNodeType | ParserTermNodeType>
}

type ParserTextNodeType = {
  like: 'text'
  link: Array<ParserCordNodeType | ParserSlotNodeType>
}

type ParserCordNodeType = ParserTokenNodeType & {
  like: 'cord'
  cord: string
}

type ParserCombNodeType = ParserTokenNodeType & {
  like: 'comb'
  comb: number
}

type ParserNestNodeType = {
  like: 'nest'
  line: Array<
    | ParserTermNodeType
    | ParserNestNodeType
    | ParserTextNodeType
    | ParserMarkNodeType
    | ParserCodeNodeType
    | ParserCombNodeType
  >
  nest: Array<ParserNestNodeType>
}

type ParserMarkNodeType = ParserTokenNodeType & {
  like: 'mark'
  mark: number
}

type ParserCodeNodeType = ParserTokenNodeType & {
  like: 'code'
  base: string
  code: string
}

type ParserSlotNodeType = {
  like: 'slot'
  size: number
  nest: ParserNestNodeType
}

type ParseNodeType =
  | ParserTermNodeType
  | ParserCordNodeType
  | ParserNestNodeType
  | ParserMarkNodeType
  | ParserTextNodeType
  | ParserSlotNodeType
  | ParserCombNodeType
  | ParserCodeNodeType

module.exports = parse

function parse(list: Array<LexerTokenType>) {
  const start: ParserNestNodeType = {
    like: 'nest',
    line: [
      {
        like: 'term',
        link: [
          {
            like: 'cord',
            cord: 'file',
            start: 0,
            end: 0,
            lineNumber: 0,
            lineCharacterNumberStart: 0,
            lineCharacterNumberEnd: 0,
          },
        ],
      },
    ],
    nest: [],
  }

  const stack: Array<ParseNodeType> = [start]
  let i = 0

  while (i < list.length) {
    const token = list[i++]
    // console.log(token.like, stack)
    switch (token.like) {
      case `term-open`: {
        const node = stack[stack.length - 1]
        const term: ParserTermNodeType = {
          like: 'term',
          link: [],
        }

        if (node.like === 'nest') {
          node.line.push(term)
        } else {
          throw new Error('Oops')
        }

        stack.push(term)
        break
      }
      case `term-close`: {
        stack.pop()
        break
      }
      case `open-parenthesis`:
      case `open-indentation`: {
        const node = stack[stack.length - 1]
        const nest: ParserNestNodeType = {
          like: 'nest',
          line: [],
          nest: [],
        }

        if (node.like === 'nest') {
          node.nest.push(nest)
        } else {
          throw new Error('Oops')
        }

        stack.push(nest)
        break
      }
      case `close-parenthesis`:
      case `close-indentation`: {
        stack.pop()
        break
      }
      case `slot`:
      case `end-slot`: {
        stack.pop()
        const node = stack[stack.length - 1]

        const nest: ParserNestNodeType = {
          like: 'nest',
          line: [],
          nest: [],
        }

        if (node.like === 'nest') {
          node.nest.push(nest)
        } else {
          throw new Error('Oops')
        }

        stack.push(nest)
        break
      }
      case `term-part`: {
        const term = stack[stack.length - 1]

        if (term.like === 'term') {
          const last = term.link[term.link.length - 1]
          if (last.like === 'cord' && isDataTokenType(token)) {
            last.cord += token.text
            last.end = token.end
          } else {
            term.link.push({
              like: 'cord',
              cord: token.text,
              start: token.start,
              end: token.end,
              lineNumber: token.lineNumber,
              lineCharacterNumberStart:
                token.lineCharacterNumberStart,
              lineCharacterNumberEnd:
                token.lineCharacterNumberEnd,
            })
          }
        }
        break
      }
      case `nest-separator`: {
        break
      }
      case `open-nest`: {
        const node = stack[stack.length - 1]
        const nest: ParserNestNodeType = {
          like: 'nest',
          line: [],
          nest: [],
        }

        if (node.like === 'nest') {
          node.line.push(nest)
        } else {
          throw new Error('Oops')
        }

        stack.push(nest)
        break
      }
      case `close-nest`: {
        stack.pop()
        break
      }
      case `open-text`: {
        const node = stack[stack.length - 1]
        const text: ParserTextNodeType = {
          like: 'text',
          link: [],
        }

        if (node.like === 'nest') {
          node.line.push(text)
        } else {
          throw new Error('Oops')
        }

        stack.push(text)
        break
      }
      case `close-text`: {
        stack.pop()
        break
      }
      case `open-interpolation`: {
        const text = stack[stack.length - 1]
        const nest: ParserNestNodeType = {
          like: 'nest',
          line: [],
          nest: [],
        }
        const slot: ParserSlotNodeType = {
          like: 'slot',
          size: token.text.length,
          nest,
        }

        if (text.like === 'text') {
          text.link.push(slot)
        } else {
          throw new Error('Oops')
        }

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
          if (last.like === 'cord') {
            last.cord += token.text
            last.end = token.end
          } else {
            text.link.push({
              like: `cord`,
              cord: token.text,
              start: token.start,
              end: token.end,
              lineNumber: token.lineNumber,
              lineCharacterNumberStart:
                token.lineCharacterNumberStart,
              lineCharacterNumberEnd:
                token.lineCharacterNumberEnd,
            })
          }
        } else {
          const node = stack[stack.length - 1]
          const text: ParserTextNodeType = {
            like: 'text',
            link: [
              {
                like: `cord`,
                cord: token.text,
                start: token.start,
                end: token.end,
                lineNumber: token.lineNumber,
                lineCharacterNumberStart:
                  token.lineCharacterNumberStart,
                lineCharacterNumberEnd:
                  token.lineCharacterNumberEnd,
              },
            ],
          }

          if (node.like === 'nest') {
            node.line.push(text)
          }
        }
        break
      }
      case `line`: {
        stack.pop()
        break
      }
      case `mark`: {
        const nest = stack[stack.length - 1]
        const mark: ParserMarkNodeType = {
          like: `mark`,
          mark: parseInt(token.text, 10),
          start: token.start,
          end: token.end,
          lineNumber: token.lineNumber,
          lineCharacterNumberStart:
            token.lineCharacterNumberStart,
          lineCharacterNumberEnd: token.lineCharacterNumberEnd,
        }

        if (nest.like === 'nest') {
          nest.line.push(mark)
        } else {
          throw new Error('Oops')
        }

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

        const code: ParserCodeNodeType = {
          like: 'code',
          base: like,
          code: val, //String.fromCharCode(parseInt(val, 16))
          start: token.start,
          end: token.end,
          lineNumber: token.lineNumber,
          lineCharacterNumberStart:
            token.lineCharacterNumberStart,
          lineCharacterNumberEnd: token.lineCharacterNumberEnd,
        }

        if (node.like === 'nest') {
          node.line.push(code)
        } else {
          throw new Error('Oops')
        }

        break
      }
      case `comb`: {
        const node = stack[stack.length - 1]
        const comb: ParserCombNodeType = {
          like: `comb`,
          comb: parseFloat(token.text),
          start: token.start,
          end: token.end,
          lineNumber: token.lineNumber,
          lineCharacterNumberStart:
            token.lineCharacterNumberStart,
          lineCharacterNumberEnd: token.lineCharacterNumberEnd,
        }

        if (node.like === 'nest') {
          node.line.push(comb)
        } else {
          throw new Error('Oops')
        }

        break
      }
    }
  }

  return start
}

function isDataTokenType(
  x: LexerTokenType,
): x is LexerDataTokenType {
  return LEXER_DATA_TOKEN_TYPE.includes(x.like)
}

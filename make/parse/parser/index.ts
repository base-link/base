import {
  LEXER_DATA_TOKEN_TYPE,
  LexerDataTokenType,
  LexerTokenType,
} from '../lexer'

type ParserTokenNodeType = {
  end: number
  lineCharacterNumberEnd: number
  lineCharacterNumberStart: number
  lineNumber: number
  start: number
}

export type ParserCodeNodeType = ParserTokenNodeType & {
  base: string
  code: string
  like: 'code'
}

export type ParserCombNodeType = ParserTokenNodeType & {
  comb: number
  like: 'comb'
}

export type ParserCordNodeType = ParserTokenNodeType & {
  cord: string
  like: 'cord'
}

export type ParserMarkNodeType = ParserTokenNodeType & {
  like: 'mark'
  mark: number
}

export type ParserNestNodeType = {
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

export type ParserNodeType =
  | ParserTermNodeType
  | ParserCordNodeType
  | ParserNestNodeType
  | ParserMarkNodeType
  | ParserTextNodeType
  | ParserSlotNodeType
  | ParserCombNodeType
  | ParserCodeNodeType

export type ParserSlotNodeType = {
  like: 'slot'
  nest: ParserNestNodeType
  size: number
}

export type ParserTermNodeType = {
  like: 'term'
  link: Array<
    ParserCordNodeType | ParserTermNodeType | ParserSlotNodeType
  >
}

export type ParserTextNodeType = {
  like: 'text'
  link: Array<ParserCordNodeType | ParserSlotNodeType>
}

function parse(list: Array<LexerTokenType>) {
  const start: ParserNestNodeType = {
    like: 'nest',
    line: [
      {
        like: 'term',
        link: [
          {
            cord: 'file',
            end: 0,
            like: 'cord',
            lineCharacterNumberEnd: 0,
            lineCharacterNumberStart: 0,
            lineNumber: 0,
            start: 0,
          },
        ],
      },
    ],
    nest: [],
  }

  const stack: Array<ParserNodeType> = [start]
  let i = 0

  while (i < list.length) {
    const token = list[i++]

    if (token) {
      // console.log(token.like, stack)
      switch (token.like) {
        case `term-open`: {
          const node = stack[stack.length - 1]
          const term: ParserTermNodeType = {
            like: 'term',
            link: [],
          }

          if (node && node.like === 'nest') {
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

          if (node && node.like === 'nest') {
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

          if (node && node.like === 'nest') {
            node.nest.push(nest)
          } else {
            throw new Error('Oops')
          }

          stack.push(nest)
          break
        }
        case `term-part`: {
          const term = stack[stack.length - 1]

          if (term && term.like === 'term') {
            const last = term.link[term.link.length - 1]
            if (
              last &&
              last.like === 'cord' &&
              isDataTokenType(token)
            ) {
              last.cord += token.text
              last.end = token.end
            } else {
              term.link.push({
                cord: token.text,
                end: token.end,
                like: 'cord',
                lineCharacterNumberEnd:
                  token.lineCharacterNumberEnd,
                lineCharacterNumberStart:
                  token.lineCharacterNumberStart,
                lineNumber: token.lineNumber,
                start: token.start,
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

          if (node && node.like === 'nest') {
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

          if (node && node.like === 'nest') {
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
            nest,
            size: token.text.length,
          }

          if (text && text.like === 'text') {
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
          if (text && text.like === 'text') {
            const last = text.link[text.link.length - 1]
            if (last && last.like === 'cord') {
              last.cord += token.text
              last.end = token.end
            } else {
              text.link.push({
                cord: token.text,
                end: token.end,
                like: `cord`,
                lineCharacterNumberEnd:
                  token.lineCharacterNumberEnd,
                lineCharacterNumberStart:
                  token.lineCharacterNumberStart,
                lineNumber: token.lineNumber,
                start: token.start,
              })
            }
          } else {
            const node = stack[stack.length - 1]
            const text: ParserTextNodeType = {
              like: 'text',
              link: [
                {
                  cord: token.text,
                  end: token.end,
                  like: `cord`,
                  lineCharacterNumberEnd:
                    token.lineCharacterNumberEnd,
                  lineCharacterNumberStart:
                    token.lineCharacterNumberStart,
                  lineNumber: token.lineNumber,
                  start: token.start,
                },
              ],
            }

            if (node && node.like === 'nest') {
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
            end: token.end,
            like: `mark`,
            lineCharacterNumberEnd:
              token.lineCharacterNumberEnd,
            lineCharacterNumberStart:
              token.lineCharacterNumberStart,
            lineNumber: token.lineNumber,
            mark: parseInt(token.text, 10),
            start: token.start,
          }

          if (nest && nest.like === 'nest') {
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
            base: like,
            code: val, //String.fromCharCode(parseInt(val, 16))
            end: token.end,
            like: 'code',
            lineCharacterNumberEnd:
              token.lineCharacterNumberEnd,
            lineCharacterNumberStart:
              token.lineCharacterNumberStart,
            lineNumber: token.lineNumber,
            start: token.start,
          }

          if (node && node.like === 'nest') {
            node.line.push(code)
          } else {
            throw new Error('Oops')
          }

          break
        }
        case `comb`: {
          const node = stack[stack.length - 1]
          const comb: ParserCombNodeType = {
            comb: parseFloat(token.text),
            end: token.end,
            like: `comb`,
            lineCharacterNumberEnd:
              token.lineCharacterNumberEnd,
            lineCharacterNumberStart:
              token.lineCharacterNumberStart,
            lineNumber: token.lineNumber,
            start: token.start,
          }

          if (node && node.like === 'nest') {
            node.line.push(comb)
          } else {
            throw new Error('Oops')
          }

          break
        }
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

export default parse

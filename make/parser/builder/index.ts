import {
  LEXER_DATA_TOKEN_TYPE,
  LexerDataTokenType,
  LexerTokenType,
} from '../tokenizer'

export enum Tree {
  Code = 'tree-code',
  Comb = 'tree-comb',
  Cord = 'tree-cord',
  Mark = 'tree-mark',
  Nest = 'tree-nest',
  Slot = 'tree-slot',
  Term = 'tree-term',
  Text = 'tree-text',
}

type TreeMarkingType = {
  end: number
  lineCharacterNumberEnd: number
  lineCharacterNumberStart: number
  lineNumber: number
  start: number
}

export type TreeCodeType = TreeMarkingType & {
  base: string
  code: string
  like: Tree.Code
}

export type TreeCombType = TreeMarkingType & {
  comb: number
  like: Tree.Comb
}

export type TreeCordType = TreeMarkingType & {
  cord: string
  like: Tree.Cord
}

export type TreeMappingType = {
  'tree-code': TreeCodeType
  'tree-comb': TreeCombType
  'tree-cord': TreeCordType
  'tree-mark': TreeMarkType
  'tree-nest': TreeNestType
  'tree-slot': TreeSlotType
  'tree-term': TreeTermType
  'tree-text': TreeTextType
}

export type TreeMarkType = TreeMarkingType & {
  like: Tree.Mark
  mark: number
}

export type TreeNestType = {
  like: Tree.Nest
  line: Array<
    | TreeTermType
    | TreeNestType
    | TreeTextType
    | TreeMarkType
    | TreeCodeType
    | TreeCombType
    | TreeCordType
  >
  nest: Array<TreeNestType>
}

export type TreeNodeType =
  | TreeTermType
  | TreeCordType
  | TreeNestType
  | TreeMarkType
  | TreeTextType
  | TreeSlotType
  | TreeCombType
  | TreeCodeType

export type TreeSlotType = {
  like: Tree.Slot
  nest: TreeNestType
  size: number
}

export type TreeTermType = {
  like: Tree.Term
  link: Array<TreeCordType | TreeTermType | TreeSlotType>
}

export type TreeTextType = {
  like: Tree.Text
  link: Array<TreeCordType | TreeSlotType>
}

export type TreeType<T extends Tree> = TreeMappingType[T]

export function buildParseTree(list: Array<LexerTokenType>) {
  const start: TreeNestType = {
    like: Tree.Nest,
    line: [
      {
        like: Tree.Term,
        link: [
          {
            cord: 'file',
            end: 0,
            like: Tree.Cord,
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

  const stack: Array<TreeNodeType> = [start]
  let i = 0

  while (i < list.length) {
    const token = list[i++]

    if (token) {
      // console.log(token.like, stack)
      switch (token.like) {
        case `term-open`: {
          const node = stack[stack.length - 1]
          const term: TreeTermType = {
            like: Tree.Term,
            link: [],
          }

          if (node && node.like === Tree.Nest) {
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
          const nest: TreeNestType = {
            like: Tree.Nest,
            line: [],
            nest: [],
          }

          if (node && node.like === Tree.Nest) {
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

          const nest: TreeNestType = {
            like: Tree.Nest,
            line: [],
            nest: [],
          }

          if (node && node.like === Tree.Nest) {
            node.nest.push(nest)
          } else {
            throw new Error('Oops')
          }

          stack.push(nest)
          break
        }
        case `term-part`: {
          const term = stack[stack.length - 1]

          if (term && term.like === Tree.Term) {
            const last = term.link[term.link.length - 1]
            if (
              last &&
              last.like === Tree.Cord &&
              isDataTokenType(token)
            ) {
              last.cord += token.text
              last.end = token.end
            } else {
              term.link.push({
                cord: token.text,
                end: token.end,
                like: Tree.Cord,
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
          const nest: TreeNestType = {
            like: Tree.Nest,
            line: [],
            nest: [],
          }

          if (node && node.like === Tree.Nest) {
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
          const text: TreeTextType = {
            like: Tree.Text,
            link: [],
          }

          if (node && node.like === Tree.Nest) {
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
          const nest: TreeNestType = {
            like: Tree.Nest,
            line: [],
            nest: [],
          }
          const slot: TreeSlotType = {
            like: Tree.Slot,
            nest,
            size: token.text.length,
          }

          if (
            text &&
            (text.like === Tree.Text || text.like === Tree.Term)
          ) {
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
          if (text && text.like === Tree.Text) {
            const last = text.link[text.link.length - 1]
            if (last && last.like === Tree.Cord) {
              last.cord += token.text
              last.end = token.end
            } else {
              text.link.push({
                cord: token.text,
                end: token.end,
                like: Tree.Cord,
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
            const text: TreeTextType = {
              like: Tree.Text,
              link: [
                {
                  cord: token.text,
                  end: token.end,
                  like: Tree.Cord,
                  lineCharacterNumberEnd:
                    token.lineCharacterNumberEnd,
                  lineCharacterNumberStart:
                    token.lineCharacterNumberStart,
                  lineNumber: token.lineNumber,
                  start: token.start,
                },
              ],
            }

            if (node && node.like === Tree.Nest) {
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
          const mark: TreeMarkType = {
            end: token.end,
            like: Tree.Mark,
            lineCharacterNumberEnd:
              token.lineCharacterNumberEnd,
            lineCharacterNumberStart:
              token.lineCharacterNumberStart,
            lineNumber: token.lineNumber,
            mark: parseInt(token.text, 10),
            start: token.start,
          }

          if (nest && nest.like === Tree.Nest) {
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

          const code: TreeCodeType = {
            base: like,
            code: val, //String.fromCharCode(parseInt(val, 16))
            end: token.end,
            like: Tree.Code,
            lineCharacterNumberEnd:
              token.lineCharacterNumberEnd,
            lineCharacterNumberStart:
              token.lineCharacterNumberStart,
            lineNumber: token.lineNumber,
            start: token.start,
          }

          if (node && node.like === Tree.Nest) {
            node.line.push(code)
          } else {
            throw new Error('Oops')
          }

          break
        }
        case `comb`: {
          const node = stack[stack.length - 1]
          const comb: TreeCombType = {
            comb: parseFloat(token.text),
            end: token.end,
            like: Tree.Comb,
            lineCharacterNumberEnd:
              token.lineCharacterNumberEnd,
            lineCharacterNumberStart:
              token.lineCharacterNumberStart,
            lineNumber: token.lineNumber,
            start: token.start,
          }

          if (node && node.like === Tree.Nest) {
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

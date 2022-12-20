import lex from './lexer'
import parse from './parser'
import type {
  ParserNodeType,
  ParserTermNodeType,
  ParserTextNodeType,
  ParserCordNodeType,
  ParserCombNodeType,
  ParserNestNodeType,
  ParserMarkNodeType,
  ParserCodeNodeType,
  ParserSlotNodeType,
} from './parser'

function form(str: string): ParserNodeType {
  return parse(lex(str))
}

export type {
  ParserNodeType,
  ParserTermNodeType,
  ParserTextNodeType,
  ParserCordNodeType,
  ParserCombNodeType,
  ParserNestNodeType,
  ParserMarkNodeType,
  ParserCodeNodeType,
  ParserSlotNodeType,
}

export default form

import lex from './lexer'
import parse from './parser'
import type {
  ParseNodeType,
  ParserTermNodeType,
  ParserTextNodeType,
  ParserCordNodeType,
  ParserCombNodeType,
  ParserNestNodeType,
  ParserMarkNodeType,
  ParserCodeNodeType,
  ParserSlotNodeType,
} from './parser'

function form(str: string): ParseNodeType {
  return parse(lex(str))
}

export type {
  ParseNodeType,
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

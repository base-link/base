import lex from './lexer'
import parse from './parser'
import type { ParserNodeType } from './parser'

function form(str: string): ParserNodeType {
  return parse(lex(str))
}

export * from './parser'

export default form


const lex = require('./lexer')
const parse = require('./parser')

module.exports = form

function form(str) {
  return parse(lex(str))
}

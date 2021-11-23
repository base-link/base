
const transpile = require('./transpile')
const resolve = require('./resolve')
const print = require('./print')

function make(file, deck) {
  transpile(file, deck)
}

module.exports = make

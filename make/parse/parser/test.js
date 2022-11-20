
const prettify = require("@lancejpollard/pretty-compact-json.js/1");
const form = require('..')

// const nest = form(`link 1, foo <bar>`)
const nest = form(`link <./{code/ball}>`)
// const nest = form(`link {a}-x-{y/z}, foo <bar>`)

console.log(prettify(nest))

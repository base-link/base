
const prettify = require("@lancejpollard/pretty-compact-json.js/1");
const form = require('..')

// const nest = form(`link 1, foo <bar>`)
// const nest = form(`link <./{code/ball}>`)
// const nest = form(`link {a}-x-{y/z}, foo <bar>`)
const nest = form(`

load @treesurf/wolf/code
  load /shared/result
    take tree free-result
    take tree is-below-or-return-error
    take tree is-minimally-or-return-error
  load /javascript/mark/8
    take form mark-8

`)

console.log(prettify(nest))

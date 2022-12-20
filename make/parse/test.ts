// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
const prettify = require('@lancejpollard/pretty-compact-json.js/1')
import parse from '.'
import type { ParserNodeType } from '.'

// const nest = form(`link 1, foo <bar>`)
// const nest = form(`link <./{code/ball}>`)
// const nest = form(`link {a}-x-{y/z}, foo <bar>`)
const nest: ParserNodeType = parse(`

load @treesurf/wolf/code
  load /shared/result
    take tree free-result
    take tree is-below-or-return-error
    take tree is-minimally-or-return-error
  load /javascript/mark/8
    take form mark-8

`)

console.log(prettify(nest))

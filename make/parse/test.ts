import prettify from '@lancejpollard/pretty-compact-json.js/1'
import parse from '.'

// const nest = form(`link 1, foo <bar>`)
// const nest = form(`link <./{code/ball}>`)
// const nest = form(`link {a}-x-{y/z}, foo <bar>`)
// const nest = parse(`

// load @treesurf/wolf/code
//   load /shared/result
//     take tree free-result
//     take tree is-below-or-return-error
//     take tree is-minimally-or-return-error
//   load /javascript/mark/8
//     take form mark-8

// `)
const nest = parse(`
foo a/b/c
foo <hello>
foo <bar{a/b/c}baz>
`)

console.log(prettify(nest))

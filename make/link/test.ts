import { code } from '~'

import { parseLinkText as parse } from './index.js'

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
// const nest = parse({
//   path: 'foo.link',
//   text: `
// # true or false

// time one
//   # true
//   three four # five
//     six
//   seven 8
//     nine
// ten 11
// `,
// })

// console.log(prettifyJSON(nest))

async function start() {
  await code.loadSourceMaps()
  //   parse({
  //     path: 'foo.link',
  //     text: `
  // foo bar{x}-baz/bear-{bond}we, and a123 345
  //   stuff for you
  //     more`,
  //   })
  parse({
    path: 'foo.link',
    text: `
some thing[another(a/b/c, 1, foo(bar(baz)))]
`,
  })
}

start()

// invalid whitespace: `foo  bar`
// invalid whitespace: ` foo`
// invalid whitespace: `foo     bar`

// a b{x y}/c, and
// a b c d e f g a sd f
//   x y z w y
//     abc
// deck <./{base/link}>

// a b c d e f g
//   h i j k
//     l m n
//       o p
//   q
// form text
//   link a-{x y}-z foo

//   link b{hello}, 123

// form two
//   a b{x y 123, 123}/c, and/y/w
//   b-c 432.12, <string {value one 12} bar>, 3.14
//   #b0101
//   123
//   1.12
//   true
//   a/b

//   foo bar{x}-baz/bear-{bond}we, and a123 345
//     stuff for you
//       more

// bear <./{site/deck}>

// deck @treesurf/wolf
//   bear ./code
//   mint <0.0.1>
//   test ./test{{{another 12}}}two/one

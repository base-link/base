
const fs = require('fs')
const parse = require('..')
const lex = require('../lexer')

// a{x(1, b(c 123.3))}
// test(`
// a #u123, 1.2/foo
// `)
// test(`
// foo-{bar} {a}-b/1/two c{b}d
// `)
// test(`
// a x[y/z[f <foo{1}>]], q
// `)
// test(`
// a b c d e, m, n
//   f g h
//     i j
//   k l <foo {bar(1)}>, baz
//   o <foo>, <boo>
//   x[y]
// `)
// test(`
// a <foo{b(x, y, 1, 2/three/<four> five)}>
// `)
// test(`
// a b c, e, f, g h, i
//   d m x(y, z)
// `)

// test(`
// link a/b[c/d][e]/f[g[h[i/j]]]
//   text <foo {bar(<hello {random}>, <world>} baz>
//   another bar

// x foo/bar, foo/baz, a/b/c
// y <foo>, 123, #u123, 3.14
// dynamic-{term(<asdf>)} foo
// {one}{two}-three{four(x)}-five
// `)

test(`
form mark-{size}
  bar baz
`)

// test(`
// {one}{two}-three{four(f)}-five
// `)

function test(a, b) {
  fs.writeFileSync('tmp/lex.json', JSON.stringify(lex(a), null, 2))
  fs.writeFileSync('tmp/parse.json', JSON.stringify(parse(a), null, 2))
}

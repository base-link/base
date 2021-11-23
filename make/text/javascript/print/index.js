
// print the AST

const fs = require('fs')
const HEAD = fs.readFileSync('./make/head/index.js', 'utf-8')
const pathResolver = require('path')

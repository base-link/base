
const fs = require('fs')
const parse = require('./parse')
const Base = require('./base/base')
const Card = require('./base/card')
const shared = require('./shared')
const parseDeckCard = require('./card/deck')

const link = shared.findPath('@treesurf/wolf')
const content = fs.readFileSync(link, 'utf-8')
const base = new Base()
base.site = {
  dock: 'javascript',
  site: 'test',
}

const system = {
  [link]: content
}

load(link, system, base)

function load(link, system, base) {
  base.system = system
  const linkTree = parse(system[link])
  parseDeckCard(link, linkTree, base)
  // console.log(base)
}


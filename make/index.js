
const fs = require('fs')
const parse = require('./parse')
const Base = require('./base/base')
const Card = require('./base/card')

const path = '../wolf.link/base.link'

const content = fs.readFileSync(path, 'utf-8')
const base = new Base()

const system = {
  [path]: content
}

invoke(path, system, base)

function invoke(link, system, base) {
  const linkTree = parse(system[link])
  const card = base.card(link)
  card.bind({
    text: system[path],
    link
  })

  linkTree.site.forEach(site => {
    const node = loadLeafList(card, site.leaf)
    site.site.forEach(site => {

    })
  })
  // compile(link, base)
}

function loadLeafList(card, leafList) {
  const node = {
    hold: {
      size: leafList.length,
      link: []
    }
  }

  leafList.forEach(leaf => {
    if (leaf.form === 'term') {
      node.hold.size--
      node.hold.link.push(leaf.link[0].cord)
    } else {
      throw new Error(JSON.stringify(leaf))
    }
  })

  if (!node.hold.size) {
    const term = node.hold.link.join('')
    node.form = term
    node.hold = null
  }

  return node
}

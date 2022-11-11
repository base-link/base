
const fs = require('fs')
const parse = require('./parse')
const Base = require('./base/base')
const Card = require('./base/card')

const path = '../wolf.link/code/shared/mark/32/base.link'

const content = fs.readFileSync(path, 'utf-8')
const base = new Base()

const system = {
  [path]: content
}

invoke(path, system, base)

function invoke(path, system, base) {
  const link = parse(system[path])
  const card = base.card(path)
  card.bind({
    text: system[path],
    link
  })

  link.site.forEach(site => {
    const hold = {
      remaining: site.leaf.length,
      link: []
    }

    site.leaf.forEach(leaf => {
      if (leaf.form === 'term') {
        hold.remaining--
        hold.link.push(leaf.link[0].cord)
      } else {
        throw new Error(JSON.stringify(leaf))
      }
    })

    if (!hold.remaining) {
      const term = hold.link.join('')
      const mesh = {
        form: term
      }
    }
  })
  // compile(link, base)
}


const parse = require('../../parse')
const fs = require('fs')
const pathResolve = require('path')

module.exports = {
  readTextFile(link) {
    return this.text_mesh.get(link) ?? fs.readFileSync(link, 'utf-8')
  },

  getLinkHost(link) {
    return pathResolve.dirname(link)
  },

  makeCord(cord) {
    return {
      like: 'cord',
      cord,
    }
  },

  parseTextIntoTree(text) {
    return parse(text)
  },

  isTextNest(nest) {
    if (nest.line.length > 1) {
      return false
    }

    if (nest.line.length === 0) {
      return false
    }

    let line = nest.line[0]
    if (line.like === 'text') {
      return true
    }

    return false
  },

  getTextNest(fork) {
    if (fork.nest.line.length > 1) {
      return
    }

    let line = fork.nest.line[0]
    if (line.like !== 'text') {
      return
    }

    const knit = this.makeKnit({
      like: 'text',
    })

    line.link.forEach(link => {
      switch (link.like) {
        case 'cord':
          knit.tree.push({
            like: 'cord',
            cord: link.cord,
          })
          break
        case 'nest': {
          const nestFork = this.extendObject(fork, { nest: link })
          const read = this.readNest(nestFork)
          this.addToTreeLink(knit, read)
          break
        }
        default:
          throw new Error(seed.link)
      }
    })

    if (!knit.size) {
      const str = []
      knit.tree.forEach(link => {
        str.push(link.cord)
      })
      return this.makeCord(str.join(''))
    }

    return tree
  },
}

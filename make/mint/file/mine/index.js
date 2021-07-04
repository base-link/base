
const mintMine = require('../../mine')
const mintLoad = require('../../load')

module.exports = mintFile

function mintFile(road, base) {
  const knit = {}
  base.link.forEach(base => {
    switch (base.name) {
      case 'mine':
        const mine = mintMine(base)
        knit[mine.name] = mine
        break
    }
  })
  return {
    road,
    mint: knit
  }
}

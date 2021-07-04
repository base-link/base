
const mintMill = require('../../mill')
const mintLoad = require('../../load')

module.exports = mintFile

function mintFile(road, base) {
  const knit = {}
  base.link.forEach(base => {
    switch (base.name) {
      case 'mill':
        const mill = mintMill(base)
        knit[mill.name] = mill
        break
    }
  })
  return {
    road,
    mill: knit
  }
}

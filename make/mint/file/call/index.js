
const mintTask = require('../../task')
const mintLoad = require('../../load')
const { mintCall } = mintTask

module.exports = mintFile

function mintFile(road, base) {
  const load = []
  const zone = []
  base.link.forEach(base => {
    switch (base.name) {
      case 'call':
        zone.push(mintCall(base))
        break
      case 'load':
        load.push(mintLoad(base))
        break
      case 'task':
        zone.push(mintTask(base))
        break
    }
  })
  return {
    road,
    tree: base,
    load,
    zone
  }
}


const mintView = require('../../view')
const mintLoad = require('../../load')

module.exports = mintFile

function mintFile(road, base) {
  const view = []
  const load = []
  base.link.forEach(base => {
    switch (base.name) {
      case 'load':
        load.push(mintLoad(base))
        break
      case 'view':
        view.push(mintView(base))
        break
    }
  })
  return {
    road,
    tree: base,
    load,
    view
  }
}

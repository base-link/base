
const mintView = require('../../view')
const mintLoad = require('../../load')

module.exports = mintFile

function mintFile(road, base) {
  const view = []
  const load = []
  base.forEach(base => {
    const term = base.link[0]
    switch (term.term) {
      case 'load':
        load.push(mintLoad(base.link.slice(1)))
        break
      case 'view':
        view.push(mintView(base.link.slice(1)))
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

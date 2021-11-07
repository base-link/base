
const mintForm = require('../../form')
const mintLoad = require('../../load')

module.exports = mintFile

function mintFile(road, base) {
  const form = []
  const load = []
  base.link.forEach(base => {
    switch (base.name) {
      case 'load':
        load.push(mintLoad(base))
        break
      case 'form':
        form.push(mintForm(base))
        break
    }
  })
  return {
    road,
    tree: base,
    load,
    form
  }
}

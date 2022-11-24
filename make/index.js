
const Base = require('./base/server')
const shared = require('./shared')

const link = shared.findPath('@treesurf/wolf')
const base = new Base()
base.site = {
  dock: 'javascript',
  site: 'test',
}
base.mintDeckCard(link)

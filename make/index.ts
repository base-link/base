import Base from './server'
import shared from './shared'

const link = shared.findPath('@treesurf/wolf')
const base = new Base()
base.site = {
  dock: 'javascript',
  site: 'test',
}
base.mintDeckCard(link)

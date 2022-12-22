import shared from './shared'
import Base from './tool'

const link = shared.findPath('@treesurf/wolf')
const base = new Base()
base.site = {
  dock: 'javascript',
  site: 'test',
}
base.mintDeckCard(link)

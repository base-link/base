import { Base, api } from '~'

const link = api.findPath('@treesurf/wolf')
const base = new Base({
  dock: 'javascript',
  site: 'test',
})
api.process_deckCard(base, link)

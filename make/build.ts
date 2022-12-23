import { api } from '~'

const link = api.findPath('@treesurf/wolf')
api.assertString(link)
const base = api.createBase()
api.setEnvironmentVariable(base, 'dock', 'javascript')
api.setEnvironmentVariable(base, 'site', 'test')
api.process_deckCard(base, link)
api.resolve_deckCard(base, link)

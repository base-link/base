import { api } from '~'

start()

async function start() {
  await api.loadSourceMaps()
  const link = api.findPath('@treesurf/wolf')
  api.assertString(link)
  const base = api.createBase()
  api.setEnvironmentVariable(base, 'dock', 'javascript')
  api.setEnvironmentVariable(base, 'site', 'test')
  api.handle_deckCard(base, link)
}

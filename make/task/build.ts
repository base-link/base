import { code } from '~'

start()

async function start() {
  await code.loadSourceMaps()
  const link = code.findPath('@treesurf/wolf')
  code.assertString(link)
  const base = code.createBase()
  code.setEnvironmentVariable(base, 'dock', 'javascript')
  code.setEnvironmentVariable(base, 'site', 'test')
  code.handle_deckCard(base, link)
  while (base.tasks.length) {
    code.performNextTask(base)
  }
  // code.exportNodeJS(base)
}

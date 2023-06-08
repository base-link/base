import { code } from '~'

export default async function build(host: string) {
  await code.loadSourceMaps()
  const link = code.findPath(host)
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

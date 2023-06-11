import { load_deckCard } from '~/mesh/deck/index.js'
import {
  performNextTask,
  findPath,
  loadSourceMaps,
  createBase,
  setEnvironmentVariable,
} from '~/tool/index.js'

export default async function build(host: string) {
  await loadSourceMaps()
  const link = findPath(host)
  assertString(link)
  const base = createBase()
  setEnvironmentVariable(base, 'dock', 'javascript')
  setEnvironmentVariable(base, 'site', 'test')
  load_deckCard(base, link)
  while (base.tasks.length) {
    performNextTask(base)
  }
  // exportNodeJS(base)
}

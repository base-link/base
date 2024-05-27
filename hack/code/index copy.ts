import { load_deckCard } from './mesh/deck/index.js'
import {
  callTask,
  findLink,
  createBase,
  setEnvironmentVariable,
} from './tool/index.js'

export default async function build(host: string) {
  const link = findLink(host)
  assertString(link)
  const base = createBase()
  setEnvironmentVariable(base, 'dock', 'javascript')
  setEnvironmentVariable(base, 'site', 'test')
  load_deckCard(base, link)
  while (base.tasks.length) {
    callTask(base)
  }
  // exportNodeJS(base)
}

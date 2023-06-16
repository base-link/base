import card from '~/make/card.js'
import { MeshLoad } from '~/make/form.js'

export function load_deckCard_deck_link(load: MeshLoad) {
  const text = card.loadText(load)

  card.haveTextForm(load, text, /^@[a-z0-9]+\/[a-z0-9]+$/)

  const [host, name] = card.splitPackageModuleName(text)
  card.haveText(host)
  card.haveText(name)

  const hostText = code.makeText(host)
  const nameText = code.makeText(name)

  load.tree.save('host', hostText)
  load.tree.save('name', nameText)
}

export function splitPackageModuleName(string: string): Array<string> {
  const [host, name] = string.split('/')
  const array: Array<string> = []
  if (host) {
    array.push(host.replace(/^@/, ''))
  }
  if (name) {
    array.push(name)
  }
  return array
}

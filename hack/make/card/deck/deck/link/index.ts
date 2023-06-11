import card from '~/make/card.js'
import { MeshLoad } from '~/make/form.js'

export function load_deckCard_deck_link(load: MeshLoad) {
  const text = card.assumeText(load)

  card.assertStringPattern(load, text, /^@[a-z0-9]+\/[a-z0-9]+$/)

  const [host, name] = card.splitPackageModuleName(text)
  card.assertString(host)
  card.assertString(name)

  const hostString = card.createBlueString(host)
  const nameString = card.createBlueString(name)

  card.pushRed(
    load,
    card.createRedGather(load, 'link', [hostString, nameString]),
  )

  card.attachBlue(load, 'host', hostString)
  card.attachBlue(load, 'name', nameString)
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

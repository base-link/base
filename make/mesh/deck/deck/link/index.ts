import { Mesh, code } from '~'
import type { SiteProcessInputType } from '~'

export function process_deckCard_deck_link(
  input: SiteProcessInputType,
) {
  const text = code.assumeText(input)

  code.assertStringPattern(input, text, /^@[a-z0-9]+\/[a-z0-9]+$/)

  const [host, name] = code.splitPackageModuleName(text)
  code.assertString(host)
  code.assertString(name)

  const hostString = code.createBlueString(host)
  const nameString = code.createBlueString(name)

  code.pushRed(
    input,
    code.createRedGather(input, 'link', [hostString, nameString]),
  )

  code.attachBlue(input, 'host', hostString)
  code.attachBlue(input, 'name', nameString)
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

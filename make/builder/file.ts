import fs from 'fs'
import pathResolve from 'path'

import { Base, NestInputType, api } from '~'

export function findPath(
  link: string,
  context = process.cwd(),
): string | undefined {
  if (link.startsWith('@treesurf')) {
    link = pathResolve
      .resolve(
        link.replace(
          /@treesurf\/(\w+)/,
          (_: string, $1: string): string => `../${$1}.link`,
        ),
      )
      .replace(/\/$/, '')
  } else {
    link = pathResolve.join(context, link).replace(/\/$/, '')
  }

  if (fs.existsSync(`${link}/base.link`)) {
    link = `${link}/base.link`
  } else if (fs.existsSync(`${link}.link`)) {
    link = `${link}.link`
  } else {
    return
  }

  return link
}

export function getLinkHost(link: string): string {
  return pathResolve.dirname(link)
}

export function readTextFile(base: Base, link: string): string {
  return base.text_mesh[link] ?? fs.readFileSync(link, 'utf-8')
}

export function resolveModulePath(
  input: NestInputType,
  text: string,
): string {
  const card = api.getProperty(input, 'card')
  api.assertCard(card)

  const path = api.findPath(text, card.directory)

  if (!path) {
    api.throwError(undefined)
  }

  api.assertString(path)

  return path
}

import fs from 'fs'
import pathResolve from 'path'

import Base from '~client/base'

export function findPath(
  link: string,
  context = process.cwd(),
): string {
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
    throw new Error(`Path ${link} not found.`)
  }

  return link
}

export function getLinkHost(link: string): string {
  return pathResolve.dirname(link)
}

export function readTextFile(base: Base, link: string): string {
  return (
    base.text_mesh.get(link) ?? fs.readFileSync(link, 'utf-8')
  )
}

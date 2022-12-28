import fs from 'fs'
import pathResolve from 'path'

import { APIInputType, Base, api } from '~'

export function assumePath(
  input: APIInputType,
  inputPath: string,
): string {
  const card = input.card
  const path = api.findPath(inputPath, card.directory)
  if (!path) {
    api.throwError(
      api.generateUnresolvedPathError(input, inputPath),
    )
  }
  api.assertString(path)
  return path
}

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
  input: APIInputType,
  text: string,
): string {
  const { card } = input
  const path = api.findPath(text, card.directory)

  if (!path) {
    throw new Error('oops, todo')
  }

  api.assertString(path)

  return path
}

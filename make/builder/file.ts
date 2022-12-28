import fs from 'fs'
import glob from 'glob'
import pathResolve, { dirname } from 'path'
import smc from 'source-map'
import { fileURLToPath } from 'url'

import { api } from '~'
import type { APIInputType, Base } from '~'

export const SOURCE_MAPS: Record<
  string,
  smc.SourceMapConsumer
> = {}

const __filename = fileURLToPath(import.meta.url)

export const __dirname = dirname(__filename)

export function assumePath(
  input: APIInputType,
  inputPath: string,
): string {
  const card = input.card
  api.assertCard(card)
  const path = api.findPath(inputPath, card.directory)
  if (!path) {
    api.throwError(
      api.generateUnresolvedPathError(input, inputPath),
    )
  }
  api.assertString(path)
  return path
}

export async function findFilePathsRecursively(
  pattern: string,
): Promise<Array<string>> {
  return new Promise((res, rej) => {
    glob(pattern, (err, files) => {
      if (err) {
        return rej(err)
      }
      res(files)
    })
  })
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

export async function loadSourceMaps(): Promise<void> {
  const startDir = pathResolve.resolve(
    `${__dirname}/../../host`,
  )
  const paths = await api.findFilePathsRecursively(
    `${startDir}/**/*.js`,
  )

  for (const path of paths) {
    const mapContent = fs.readFileSync(`${path}.map`, 'utf-8')
    const json = JSON.parse(mapContent) as smc.RawSourceMap
    const sm = await new smc.SourceMapConsumer(json)
    SOURCE_MAPS[`file://${path}`] = sm
  }
}

export function readTextFile(base: Base, link: string): string {
  return base.text_mesh[link] ?? fs.readFileSync(link, 'utf-8')
}

export function resolveDirectoryPath(path: string): string {
  return pathResolve.dirname(path)
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

export function resolveNativePath(
  path: string,
  context: string,
): string {
  const relative = pathResolve.relative(
    process.cwd(),
    pathResolve.resolve(context, path),
  )
  return relative.startsWith('.') ? relative : `./${relative}`
}

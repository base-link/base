import fs from 'fs'
import glob from 'glob'
import pathResolver from 'path'
import smc from 'source-map'
import { fileURLToPath } from 'url'

export const SOURCE_MAP_MESH: Record<string, smc.SourceMapConsumer> = {}

const __filename = fileURLToPath(import.meta.url)

export const __dirname = pathResolver.dirname(__filename)

export async function findFilePathsRecursively(
  pattern: string,
): Promise<Array<string>> {
  return glob.sync(pattern)
}

export function loadLink(load: MeshLoad, loadPath: string): string {
  const card = load.module
  const path = code.findPath(loadPath, card.directory)
  if (!path) {
    code.throwError(code.generateUnresolvedPathError(load, loadPath))
  }
  code.assertString(path, 'path')
  return path
}

export function readLinkHost(link: string): string {
  return pathResolver.dirname(link)
}

export function readTextFile(base: Base, link: string): string {
  return base.textMap[link] ?? fs.readFileSync(link, 'utf-8')
}

export function resolveDirectoryPath(path: string): string {
  return pathResolver.dirname(path)
}

export function resolveModulePath(
  load: MeshLoad,
  text: string,
): string {
  const { module } = load
  const path = code.findPath(text, module.directory)

  if (!path) {
    code.throwError(code.generateUnresolvedPathError(load, text))
  }

  code.assertString(path)

  return path
}

export function resolveNativePath(
  path: string,
  context: string,
): string {
  const relative = pathResolver.relative(
    process.cwd(),
    pathResolver.resolve(context, path),
  )
  return relative.startsWith('.') ? relative : `./${relative}`
}

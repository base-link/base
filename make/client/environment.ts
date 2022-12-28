import { api } from '~'

import { Base } from './base.js'

export function createBase(): Base {
  return new Base()
}

export function getEnvironmentVariable(
  base: Base,
  key: string,
): unknown {
  return base.env[key]
}

export function setCachedFile(
  base: Base,
  path: string,
  content: string,
): void {
  base.text_mesh[path] = content
}

export function setEnvironmentVariable(
  base: Base,
  key: string,
  value: unknown,
): void {
  base.env[key] = value
}

import { api } from '~'

export function getProperty(
  object: Record<string, unknown>,
  path: string,
): unknown {
  if (api.isObject(object) && path in object) {
    return object[path]
  }
}

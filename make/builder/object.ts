import { api } from '~'
import type { api } from '~'

export function getProperty(
  object: Record<string, unknown>,
  path: string,
): unknown {
  if (api.isRecord(object) && path in object) {
    return object[path]
  }
}

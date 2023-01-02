import { Link, code } from '~'
import type { MeshInputType } from '~'

export function getNestedProperty(
  object: Record<string, unknown>,
  path: Array<string>,
): unknown {
  let value: unknown = object
  path.forEach(part => {
    if (code.isRecord(value)) {
      value = value[part]
    } else {
      value = undefined
    }
  })
  return value
}

export function getProperty(
  object: Record<string, unknown>,
  path: string,
): unknown {
  if (code.isRecord(object) && path in object) {
    return object[path]
  }
}

export function resolveHashtagAsNumber(
  input: MeshInputType,
): number | undefined {
  let hashtag = code.assumeLinkType(input, Link.Hashtag)

  switch (hashtag.system) {
    case 'b':
      return parseInt(hashtag.code, 2)
    case 'x':
      return parseInt(hashtag.code, 16)
    case 'o':
      return parseInt(hashtag.code, 8)
    case 'h':
      return parseInt(hashtag.code, 16)
    case 'd':
      return parseInt(hashtag.code, 10)
    case 's':
      return parseInt(hashtag.code, 60)
    case 't':
      return parseInt(hashtag.code, 12)
    default:
      // this is caught earlier
      code.throwError(code.generateInvalidCompilerStateError())
  }
}

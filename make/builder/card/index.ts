import { CARD_TYPE, MeshCardType, api } from '~'

export * from './code'
export * from './deck'

export function assertCard(
  object: unknown,
): asserts object is MeshCardType {
  if (!api.isCard(object)) {
    api.throwError(undefined)
  }
}

export function isCard(
  object: unknown,
): object is MeshCardType {
  return (
    api.isObject(object) &&
    'like' in object &&
    CARD_TYPE.includes((object as MeshCardType).like)
  )
}

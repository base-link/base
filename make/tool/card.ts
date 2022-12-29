import { CARD_TYPE, code } from '~'
import type { MeshModule_FullType } from '~'

export * from '../mesh/book/index.js'
export * from '../mesh/code/index.js'
export * from '../mesh/deck/index.js'

export function assertCard(
  object: unknown,
): asserts object is MeshModule_FullType {
  if (!code.isCard(object)) {
    code.throwError({
      code: '0014',
      note: `Card is undefined?`,
    })
  }
}

export function isCard(
  object: unknown,
): object is MeshModule_FullType {
  return (
    code.isRecord(object) &&
    'like' in object &&
    CARD_TYPE.includes((object as MeshModule_FullType).like)
  )
}

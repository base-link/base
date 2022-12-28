import { CARD_TYPE, api } from '~'
import type { ASTModule_FullType } from '~'

export * from './book/index.js'
export * from './code/index.js'
export * from './deck/index.js'

export function assertCard(
  object: unknown,
): asserts object is ASTModule_FullType {
  if (!api.isCard(object)) {
    api.throwError({
      code: '0014',
      note: `Card is undefined?`,
    })
  }
}

export function isCard(
  object: unknown,
): object is ASTModule_FullType {
  return (
    api.isRecord(object) &&
    'like' in object &&
    CARD_TYPE.includes((object as ASTModule_FullType).like)
  )
}

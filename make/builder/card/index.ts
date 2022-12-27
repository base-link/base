import { ASTModuleType, CARD_TYPE, api } from '~'

export * from './book'
export * from './code'
export * from './deck'

export function assertCard(
  object: unknown,
): asserts object is ASTModuleType {
  if (!api.isCard(object)) {
    api.throwError({
      code: '0014',
      note: `Card is undefined?`,
    })
  }
}

export function isCard(
  object: unknown,
): object is ASTModuleType {
  return (
    api.isObject(object) &&
    'like' in object &&
    CARD_TYPE.includes((object as ASTModuleType).like)
  )
}

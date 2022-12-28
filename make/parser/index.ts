import { buildParseTree } from './builder/index.js'
import type { TreeNodeType } from './builder/index.js'
import { tokenizeLinkText } from './tokenizer/index.js'

export * from './builder/index.js'
export * from './tokenizer/index.js'

export enum Nest {
  Code = 'code',
  DynamicTerm = 'dynamic-term',
  DynamicText = 'dynamic-text',
  Empty = '',
  Mark = 'mark',
  StaticTerm = 'static-term',
  StaticText = 'static-text',
}

// eslint-disable-next-line sort-exports/sort-exports
export const NEST_TYPE_TEXT: Record<Nest, string> = {
  [Nest.DynamicTerm]: 'dynamic term',
  [Nest.DynamicText]: 'dynamic text',
  [Nest.StaticTerm]: 'static term',
  [Nest.StaticText]: 'static text',
  [Nest.Empty]: 'empty',
  [Nest.Code]: 'boolean',
  [Nest.Mark]: 'unsigned integer',
}

export function parseLinkText(str: string): TreeNodeType {
  return buildParseTree(tokenizeLinkText(str))
}

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

export function parseLinkText(str: string): TreeNodeType {
  return buildParseTree(tokenizeLinkText(str))
}

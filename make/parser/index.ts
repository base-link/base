import { TreeNodeType, buildParseTree } from './builder'
import { tokenizeLinkText } from './tokenizer'

export * from './builder'
export * from './tokenizer'

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

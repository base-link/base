import { generateLinkTextBuildingDirections } from './fold/index.js'
import { tokenizeLinkText } from './text/index.js'
import type { TextInputType } from './text/index.js'
import { buildParseTree } from './tree/index.js'
import type { TreeResultType } from './tree/index.js'

export * from './fold/index.js'
export * from './text/index.js'
export * from './tree/index.js'

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

export function parseLinkText(
  input: TextInputType,
): TreeResultType {
  return buildParseTree(
    generateLinkTextBuildingDirections(tokenizeLinkText(input)),
  )
}

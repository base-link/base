import { generateLinkTextBuildingDirections } from './fold/index.js'
import { tokenizeLinkText } from './text/index.js'
import type { TextInputType } from './text/index.js'
import { buildParseTree } from './tree/index.js'
import type { TreeResultType } from './tree/index.js'

export * from './fold/index.js'
export * from './text/index.js'
export * from './tree/index.js'

export enum MeshHint {
  Code = 'code',
  DynamicTerm = 'dynamic-term',
  DynamicText = 'dynamic-text',
  Empty = '',
  Mark = 'mark',
  StaticTerm = 'static-term',
  StaticText = 'static-text',
}

// eslint-disable-next-line sort-exports/sort-exports
export const MESH_HINT_TEXT: Record<MeshHint, string> = {
  [MeshHint.Code]: 'boolean',
  [MeshHint.DynamicTerm]: 'dynamic term',
  [MeshHint.DynamicText]: 'dynamic text',
  [MeshHint.Empty]: 'empty',
  [MeshHint.Mark]: 'unsigned integer',
  [MeshHint.StaticTerm]: 'static term',
  [MeshHint.StaticText]: 'static text',
}

export function parseLinkText(
  input: TextInputType,
): TreeResultType {
  return buildParseTree(
    generateLinkTextBuildingDirections(tokenizeLinkText(input)),
  )
}

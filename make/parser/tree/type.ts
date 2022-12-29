import type {
  FoldRangeMetadatType,
  TextSplitInputType,
  TextTokenType,
} from '~'

import { Text, TextTokenBaseType } from '../text/index.js'

export enum Tree {
  Boolean = 'tree-boolean',
  Decimal = 'tree-decimal',
  Handle = 'tree-handle',
  Hashtag = 'tree-hashtag',
  Index = 'tree-index',
  Module = 'tree-module',
  Path = 'tree-path',
  Plugin = 'tree-plugin',
  SignedInteger = 'tree-signed-integer',
  String = 'tree-string',
  Term = 'tree-term',
  Text = 'tree-text',
  UnsignedInteger = 'tree-unsigned-integer',
}

export type TreeBooleanType = {
  like: Tree.Boolean
  value: boolean
}

export type TreeDecimalType = TextTokenBaseType & {
  like: Tree.Decimal
  value: number
}

export type TreeHandleType = {
  element: Array<
    | TreeTextType
    | TreePathType
    | TreeHandleType
    | TreeUnsignedIntegerType
    | TreeSignedIntegerType
    | TreeHashtagType
    | TreeDecimalType
    | TreeStringType
    | TreeBooleanType
  >
  head?: TreeTermType
  like: Tree.Handle
  parent: TreeHandleType | TreeModuleType | TreePluginType
}

export type TreeHashtagType = TextTokenBaseType & {
  code: string
  like: Tree.Hashtag
  system: string
}

export type TreeIndexType = {
  element: TreeHandleType
  like: Tree.Index
  parent: TreePathType
}

export type TreeMappingType = {
  'tree-boolean': TreeBooleanType
  'tree-decimal': TreeDecimalType
  'tree-handle': TreeHandleType
  'tree-hashtag': TreeHashtagType
  'tree-index': TreeIndexType
  'tree-module': TreeModuleType
  'tree-path': TreePathType
  'tree-plugin': TreePluginType
  'tree-signed-integer': TreeSignedIntegerType
  'tree-string': TreeStringType
  'tree-term': TreeTermType
  'tree-text': TreeTextType
  'tree-unsigned-integer': TreeUnsignedIntegerType
}

export type TreeModuleType = {
  element: Array<TreeHandleType>
  like: Tree.Module
}

export type TreeNodeType =
  | TreeTermType
  | TreeStringType
  | TreeHandleType
  | TreeUnsignedIntegerType
  | TreeSignedIntegerType
  | TreeTextType
  | TreePluginType
  | TreeIndexType
  | TreeDecimalType
  | TreeHashtagType
  | TreePathType
  | TreeModuleType

export type TreePathType = {
  like: Tree.Path
  parent: TreeHandleType
  segment: Array<TreeTermType | TreeIndexType>
}

export type TreePluginType = {
  element?: TreeHandleType
  like: Tree.Plugin
  parent: TreeTermType | TreeTextType
  size: number
}

export type TreeResultType = TextSplitInputType & {
  parseTree: TreeModuleType
}

export type TreeSignedIntegerType = TextTokenBaseType & {
  like: Tree.SignedInteger
  value: number
}

export type TreeStringType = {
  like: Tree.String
  range: FoldRangeMetadatType
  value: string
}

export type TreeTermType = {
  dereference: boolean
  guard: boolean
  like: Tree.Term
  parent: TreePathType
  query: boolean
  segment: Array<TreeStringType | TreePluginType>
}

export type TreeTextType = {
  like: Tree.Text
  segment: Array<TreeStringType | TreePluginType>
}

export type TreeType<T extends Tree> = TreeMappingType[T]

export type TreeUnsignedIntegerType = {
  like: Tree.UnsignedInteger
  value: number
}

export type TreeWorkListCallbackType = (
  token: TextTokenType<Text>,
) => void

export type TreeWorkListInputType = {
  callback: TreeWorkListCallbackType
  parent: TreeNodeType
}

import type {
  FoldNodeType,
  FoldRangeMetadatType,
  TextSplitInputType,
  TextTokenType,
} from '~'

import { Text, TextTokenBaseType } from './text/index.js'

export enum Link {
  Boolean = 'link-boolean',
  Decimal = 'link-decimal',
  Hashtag = 'link-hashtag',
  Index = 'link-index',
  Path = 'link-path',
  Plugin = 'link-plugin',
  SignedInteger = 'link-signed-integer',
  String = 'link-string',
  Term = 'link-term',
  Text = 'link-text',
  Tree = 'link-tree',
  UnsignedInteger = 'link-unsigned-integer',
}

export type LinkBooleanType = {
  like: Link.Boolean
  value: boolean
}

export type LinkDecimalType = TextTokenBaseType & {
  like: Link.Decimal
  value: number
}

export type LinkHashtagType = TextTokenBaseType & {
  code: string
  like: Link.Hashtag
  system: string
}

export type LinkIndexType = {
  element: LinkTreeType
  like: Link.Index
  parent: LinkPathType
}

export type LinkInputType = TextSplitInputType & {
  state: {
    index: number
    stack: Array<LinkNodeType>
  }
  token: FoldNodeType
}

export type LinkMappingType = {
  'link-boolean': LinkBooleanType
  'link-decimal': LinkDecimalType
  'link-hashtag': LinkHashtagType
  'link-index': LinkIndexType
  'link-path': LinkPathType
  'link-plugin': LinkPluginType
  'link-signed-integer': LinkSignedIntegerType
  'link-string': LinkStringType
  'link-term': LinkTermType
  'link-text': LinkTextType
  'link-tree': LinkTreeType
  'link-unsigned-integer': LinkUnsignedIntegerType
}

export type LinkNodeType =
  | LinkTermType
  | LinkStringType
  | LinkTreeType
  | LinkUnsignedIntegerType
  | LinkSignedIntegerType
  | LinkTextType
  | LinkPluginType
  | LinkIndexType
  | LinkDecimalType
  | LinkHashtagType
  | LinkPathType
  | LinkBooleanType

export type LinkPathType = {
  like: Link.Path
  parent: LinkTreeType
  segment: Array<LinkTermType | LinkIndexType>
}

export type LinkPluginType = {
  element?: LinkTreeType
  like: Link.Plugin
  parent: LinkTermType | LinkTextType
  size: number
}

export type LinkResultType = TextSplitInputType & {
  link: LinkTreeType
}

export type LinkSignedIntegerType = TextTokenBaseType & {
  like: Link.SignedInteger
  value: number
}

export type LinkStringType = {
  like: Link.String
  range: FoldRangeMetadatType
  value: string
}

export type LinkTermType = {
  dereference: boolean
  guard: boolean
  like: Link.Term
  parent: LinkPathType
  query: boolean
  segment: Array<LinkStringType | LinkPluginType>
}

export type LinkTextType = {
  like: Link.Text
  segment: Array<LinkStringType | LinkPluginType>
}

export type LinkTreeType = {
  head?: LinkTermType | LinkPathType
  like: Link.Tree
  nest: Array<
    | LinkTextType
    | LinkPathType
    | LinkTreeType
    | LinkUnsignedIntegerType
    | LinkSignedIntegerType
    | LinkHashtagType
    | LinkDecimalType
    | LinkStringType
    | LinkBooleanType
  >
  parent?: LinkTreeType | LinkPluginType
}

export type LinkType<T extends Link> = LinkMappingType[T]

export type LinkUnsignedIntegerType = {
  like: Link.UnsignedInteger
  value: number
}

export type LinkWorkListCallbackType = (
  token: TextTokenType<Text>,
) => void

export type LinkWorkListInputType = {
  callback: LinkWorkListCallbackType
  parent: LinkNodeType
}

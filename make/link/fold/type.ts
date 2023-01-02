import type { TextResultType, TextTokenBaseType } from '~'

export enum Fold {
  CloseHandle = 'fold-close-handle',
  CloseIndex = 'fold-close-index',
  CloseLine = 'fold-close-line',
  CloseModule = 'fold-close-module',
  CloseNest = 'fold-close-nest',
  ClosePlugin = 'fold-close-plugin',
  CloseTerm = 'fold-close-term',
  CloseTermPath = 'fold-close-term-path',
  CloseText = 'fold-close-text',
  Comment = 'fold-comment',
  Decimal = 'fold-decimal',
  Hashtag = 'fold-hashtag',
  OpenHandle = 'fold-open-handle',
  OpenIndex = 'fold-open-index',
  OpenLine = 'fold-open-line',
  OpenModule = 'fold-open-module',
  OpenNest = 'fold-open-nest',
  OpenPlugin = 'fold-open-plugin',
  OpenTerm = 'fold-open-term',
  OpenTermPath = 'fold-open-term-path',
  OpenText = 'fold-open-text',
  SignedInteger = 'fold-signed-integer',
  String = 'fold-string',
  TermFragment = 'fold-term-fragment',
  TermSeparator = 'fold-term-separator',
  UnsignedInteger = 'fold-unsigned-integer',
}

export type FoldBaseMixinType = {
  id: number
}

export type FoldCloseHandleType = FoldBaseMixinType & {
  like: Fold.CloseHandle
}

export type FoldCloseIndexType = FoldBaseMixinType & {
  like: Fold.CloseIndex
}

export type FoldCloseLineType = FoldBaseMixinType & {
  like: Fold.CloseLine
}

export type FoldCloseModuleType = FoldBaseMixinType & {
  like: Fold.CloseModule
}

export type FoldCloseNestType = FoldBaseMixinType & {
  like: Fold.CloseNest
}

export type FoldClosePluginType = FoldBaseMixinType & {
  like: Fold.ClosePlugin
}

export type FoldCloseTermPathType = FoldBaseMixinType & {
  like: Fold.CloseTermPath
}

export type FoldCloseTermType = FoldBaseMixinType & {
  like: Fold.CloseTerm
}

export type FoldCloseTextType = FoldBaseMixinType & {
  like: Fold.CloseText
}

export type FoldCommentType = FoldBaseMixinType & {
  like: Fold.Comment
}

export type FoldDecimalType = FoldBaseMixinType & {
  like: Fold.Decimal
}

export type FoldEditorRangeType = {
  end: number
  start: number
}

export type FoldHashtagType = FoldBaseMixinType & {
  like: Fold.Hashtag
}

export type FoldNodeType =
  | FoldCloseIndexType
  | FoldCloseModuleType
  | FoldClosePluginType
  | FoldCloseTermPathType
  | FoldCloseTermType
  | FoldOpenNestType
  | FoldCloseNestType
  | FoldCloseTextType
  | FoldCommentType
  | FoldTermSeparatorType
  | FoldDecimalType
  | FoldOpenLineType
  | FoldCloseLineType
  | FoldHashtagType
  | FoldOpenIndexType
  | FoldOpenModuleType
  | FoldOpenPluginType
  | FoldOpenTermPathType
  | FoldOpenTermType
  | FoldOpenTextType
  | FoldSignedIntegerType
  | FoldStringType
  | FoldTermFragmentType
  | FoldUnsignedIntegerType
  | FoldOpenHandleType
  | FoldCloseHandleType

export type FoldOpenHandleType = FoldBaseMixinType & {
  like: Fold.OpenHandle
}

export type FoldOpenIndexType = FoldBaseMixinType & {
  like: Fold.OpenIndex
}

export type FoldOpenLineType = FoldBaseMixinType & {
  like: Fold.OpenLine
}

export type FoldOpenModuleType = FoldBaseMixinType & {
  like: Fold.OpenModule
}

export type FoldOpenNestType = FoldBaseMixinType & {
  like: Fold.OpenNest
}

export type FoldOpenPluginType = FoldBaseMixinType & {
  like: Fold.OpenPlugin
  size: number
}

export type FoldOpenTermPathType = FoldBaseMixinType & {
  like: Fold.OpenTermPath
}

export type FoldOpenTermType = FoldBaseMixinType & {
  like: Fold.OpenTerm
}

export type FoldOpenTextType = FoldBaseMixinType & {
  like: Fold.OpenText
}

export type FoldRangeMetadatType = {
  character: FoldEditorRangeType
  line: FoldEditorRangeType
  offset: FoldEditorRangeType
}

export type FoldResultType = TextResultType & {
  directions: Array<FoldNodeType>
}

export type FoldSignedIntegerType = FoldBaseMixinType & {
  like: Fold.SignedInteger
}

export type FoldStringType = FoldBaseMixinType & {
  like: Fold.String
}

export type FoldTermFragmentType = FoldBaseMixinType & {
  dereference: boolean
  guard: boolean
  like: Fold.TermFragment
  query: boolean
  range: FoldRangeMetadatType
  start: boolean
  value: string
}

export type FoldTermSeparatorType = FoldBaseMixinType & {
  like: Fold.TermSeparator
}

export type FoldUnsignedIntegerType = FoldBaseMixinType & {
  like: Fold.UnsignedInteger
  value: number
}

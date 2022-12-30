import type { TextResultType, TextTokenBaseType } from '~'

export enum Fold {
  CloseDepth = 'fold-close-depth',
  CloseHandle = 'fold-close-handle',
  CloseIndex = 'fold-close-index',
  CloseModule = 'fold-close-module',
  CloseParenthesis = 'fold-close-parenthesis',
  ClosePlugin = 'fold-close-plugin',
  CloseTerm = 'fold-close-term',
  CloseTermPath = 'fold-close-term-path',
  CloseText = 'fold-close-text',
  Comma = 'fold-comma',
  Comment = 'fold-comment',
  Decimal = 'fold-decimal',
  Hashtag = 'fold-hashtag',
  Line = 'fold-line',
  OpenDepth = 'fold-open-depth',
  OpenHandle = 'fold-open-handle',
  OpenIndentation = 'fold-open-indentation',
  OpenIndex = 'fold-open-index',
  OpenModule = 'fold-open-module',
  OpenParenthesis = 'fold-open-parenthesis',
  OpenPlugin = 'fold-open-plugin',
  OpenTerm = 'fold-open-term',
  OpenTermPath = 'fold-open-term-path',
  OpenText = 'fold-open-text',
  Path = 'fold-path',
  SignedInteger = 'fold-signed-integer',
  String = 'fold-string',
  TermFragment = 'fold-term-fragment',
  TermSeparator = 'fold-term-separator',
  UnsignedInteger = 'fold-unsigned-integer',
}

export type FoldBaseMixinType = {
  id: number
}

export type FoldCloseDepthType = FoldBaseMixinType & {
  like: Fold.CloseDepth
}

export type FoldCloseHandleType = FoldBaseMixinType & {
  like: Fold.CloseHandle
}

export type FoldCloseIndexType = FoldBaseMixinType & {
  like: Fold.CloseIndex
}

export type FoldCloseModuleType = FoldBaseMixinType & {
  like: Fold.CloseModule
}

export type FoldCloseParenthesisType = FoldBaseMixinType & {
  like: Fold.CloseParenthesis
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

export type FoldCommaType = FoldBaseMixinType & {
  like: Fold.Comma
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

export type FoldLineType = FoldBaseMixinType & {
  like: Fold.Line
}

export type FoldNodeType =
  | FoldCloseIndexType
  | FoldCloseModuleType
  | FoldCloseParenthesisType
  | FoldClosePluginType
  | FoldCloseTermPathType
  | FoldCloseTermType
  | FoldCloseTextType
  | FoldCommaType
  | FoldCommentType
  | FoldDecimalType
  | FoldHashtagType
  | FoldLineType
  | FoldOpenDepthType
  | FoldCloseDepthType
  | FoldOpenIndentationType
  | FoldOpenIndexType
  | FoldOpenModuleType
  | FoldOpenParenthesisType
  | FoldOpenPluginType
  | FoldOpenTermPathType
  | FoldOpenTermType
  | FoldOpenTextType
  | FoldPathType
  | FoldSignedIntegerType
  | FoldStringType
  | FoldTermFragmentType
  | FoldUnsignedIntegerType
  | FoldOpenHandleType
  | FoldCloseHandleType

export type FoldOpenDepthType = FoldBaseMixinType & {
  like: Fold.OpenDepth
}

export type FoldOpenHandleType = FoldBaseMixinType & {
  like: Fold.OpenHandle
}

export type FoldOpenIndentationType = FoldBaseMixinType & {
  like: Fold.OpenIndentation
}

export type FoldOpenIndexType = FoldBaseMixinType & {
  like: Fold.OpenIndex
}

export type FoldOpenModuleType = FoldBaseMixinType & {
  like: Fold.OpenModule
}

export type FoldOpenParenthesisType = FoldBaseMixinType & {
  like: Fold.OpenParenthesis
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

export type FoldPathType = FoldBaseMixinType & {
  like: Fold.Path
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

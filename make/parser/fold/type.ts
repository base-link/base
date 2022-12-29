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

export type FoldCloseDepthType = {
  id: number
  like: Fold.CloseDepth
}

export type FoldCloseHandleType = {
  id: number
  like: Fold.CloseHandle
}

export type FoldCloseIndexType = {
  id: number
  like: Fold.CloseIndex
}

export type FoldCloseModuleType = {
  id: number
  like: Fold.CloseModule
}

export type FoldCloseParenthesisType = {
  id: number
  like: Fold.CloseParenthesis
}

export type FoldClosePluginType = {
  id: number
  like: Fold.ClosePlugin
}

export type FoldCloseTermPathType = {
  id: number
  like: Fold.CloseTermPath
}

export type FoldCloseTermType = {
  id: number
  like: Fold.CloseTerm
}

export type FoldCloseTextType = {
  id: number
  like: Fold.CloseText
}

export type FoldCommaType = {
  id: number
  like: Fold.Comma
}

export type FoldCommentType = {
  id: number
  like: Fold.Comment
}

export type FoldDecimalType = {
  id: number
  like: Fold.Decimal
}

export type FoldEditorRangeType = {
  end: number
  start: number
}

export type FoldHashtagType = {
  id: number
  like: Fold.Hashtag
}

export type FoldLineType = {
  id: number
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

export type FoldOpenDepthType = {
  id: number
  like: Fold.OpenDepth
}

export type FoldOpenHandleType = {
  id: number
  like: Fold.OpenHandle
}

export type FoldOpenIndentationType = {
  id: number
  like: Fold.OpenIndentation
}

export type FoldOpenIndexType = {
  id: number
  like: Fold.OpenIndex
}

export type FoldOpenModuleType = {
  id: number
  like: Fold.OpenModule
}

export type FoldOpenParenthesisType = {
  id: number
  like: Fold.OpenParenthesis
}

export type FoldOpenPluginType = Omit<
  TextTokenBaseType,
  'like'
> & {
  id: number
  like: Fold.OpenPlugin
}

export type FoldOpenTermPathType = {
  id: number
  like: Fold.OpenTermPath
}

export type FoldOpenTermType = {
  id: number
  like: Fold.OpenTerm
}

export type FoldOpenTextType = {
  id: number
  like: Fold.OpenText
}

export type FoldPathType = {
  id: number
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

export type FoldSignedIntegerType = {
  id: number
  like: Fold.SignedInteger
}

export type FoldStringType = {
  id: number
  like: Fold.String
}

export type FoldTermFragmentType = {
  dereference: boolean
  guard: boolean
  id: number
  like: Fold.TermFragment
  query: boolean
  range: FoldRangeMetadatType
  start: boolean
  value: string
}

export type FoldTermSeparatorType = {
  id: number
  like: Fold.TermSeparator
}

export type FoldUnsignedIntegerType = {
  id: number
  like: Fold.UnsignedInteger
  value: number
}

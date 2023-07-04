export declare enum Text {
    CloseEvaluation = "text-close-evaluation",
    CloseInterpolation = "text-close-interpolation",
    CloseParenthesis = "text-close-parenthesis",
    ClosePath = "text-close-path",
    CloseText = "text-close-text",
    Comma = "text-comma",
    Comment = "text-comment",
    Decimal = "text-decimal",
    Hashtag = "text-hashtag",
    Line = "text-line",
    OpenEvaluation = "text-open-evaluation",
    OpenIndentation = "text-open-indentation",
    OpenInterpolation = "text-open-interpolation",
    OpenNesting = "text-open-nesting",
    OpenParenthesis = "text-open-parenthesis",
    OpenPath = "text-open-path",
    OpenText = "text-open-text",
    Path = "text-path",
    SignedInteger = "text-signed-integer",
    String = "text-string",
    TermFragment = "text-term-fragment",
    UnsignedInteger = "text-unsigned-integer"
}
export type TextEditorRangeType = {
    end: number;
    start: number;
};
export type TextRangeMetadatType = {
    character: TextEditorRangeType;
    line: TextEditorRangeType;
    offset: TextEditorRangeType;
};
export declare const TEXT_PATH_PATTERN_LIST: Text[];
export declare const TEXT_STRING_PATTERN_LIST: Text[];
export declare const TEXT_TYPE: Text[];
export declare const TEXT_PATTERN_LIST: Text[];
export type TextCloseEvaluationTokenType = TextTokenBaseType & {
    type: Text.CloseEvaluation;
};
export type TextClosePathTokenType = TextTokenBaseType & {
    type: Text.ClosePath;
};
export type TextInputType = {
    path: string;
    text: string;
};
export type TextLineRangeType = {
    character: number;
    line: number;
};
type TextLineTokenType = TextTokenBaseType & {
    type: Text.Line;
};
type TextOpenIndentationTokenType = TextTokenBaseType & {
    type: Text.OpenIndentation;
};
type TextDecimalTokenType = TextTokenBaseType & {
    type: Text.Decimal;
};
type TextSignedIntegerTokenType = TextTokenBaseType & {
    type: Text.SignedInteger;
};
type TextUnsignedIntegerTokenType = TextTokenBaseType & {
    type: Text.UnsignedInteger;
};
type TextOpenNestingTokenType = TextTokenBaseType & {
    type: Text.OpenNesting;
};
type TextOpenParenthesisTokenType = TextTokenBaseType & {
    type: Text.OpenParenthesis;
};
type TextCloseParenthesisTokenType = TextTokenBaseType & {
    type: Text.CloseParenthesis;
};
type TextOpenTextTokenType = TextTokenBaseType & {
    type: Text.OpenText;
};
type TextCloseTextTokenType = TextTokenBaseType & {
    type: Text.CloseText;
};
type TextOpenInterpolationTokenType = TextTokenBaseType & {
    type: Text.OpenInterpolation;
};
type TextCloseInterpolationTokenType = TextTokenBaseType & {
    type: Text.CloseInterpolation;
};
export type TextOpenEvaluationTokenType = TextTokenBaseType & {
    type: Text.OpenEvaluation;
};
type TextCommaTokenType = TextTokenBaseType & {
    type: Text.Comma;
};
type TextHashtagTokenType = TextTokenBaseType & {
    type: Text.Hashtag;
};
type TextCommentTokenType = TextTokenBaseType & {
    type: Text.Comment;
};
export type TextOpenPathTokenType = TextTokenBaseType & {
    type: Text.OpenPath;
};
export type TextPathTokenType = TextTokenBaseType & {
    type: Text.Path;
};
export type TextPatternConfigType = {
    after?: Array<Text>;
    pattern: RegExp;
    skip?: boolean;
};
export type TextRangeType = {
    end: number;
    start: number;
};
export type TextResultType = TextSplitInputType & {
    tokenList: Array<TextTokenType<Text>>;
};
export type TextSplitInputType = TextInputType & {
    textByLine: Array<string>;
};
export declare enum TextState {
    Path = "path",
    Text = "text",
    Tree = "tree"
}
export type TextStringTokenType = TextTokenBaseType & {
    type: Text.String;
};
export type TextTermFragmentTokenType = TextTokenBaseType & {
    type: Text.TermFragment;
};
export type TextTokenBaseType = {
    range: TextRangeMetadatType;
    text: string;
};
export type TextTokenMappingType = {
    'text-close-evaluation': TextCloseEvaluationTokenType;
    'text-close-interpolation': TextCloseInterpolationTokenType;
    'text-close-parenthesis': TextCloseParenthesisTokenType;
    'text-close-path': TextClosePathTokenType;
    'text-close-text': TextCloseTextTokenType;
    'text-comma': TextCommaTokenType;
    'text-comment': TextCommentTokenType;
    'text-decimal': TextDecimalTokenType;
    'text-hashtag': TextHashtagTokenType;
    'text-line': TextLineTokenType;
    'text-open-evaluation': TextOpenEvaluationTokenType;
    'text-open-indentation': TextOpenIndentationTokenType;
    'text-open-interpolation': TextOpenInterpolationTokenType;
    'text-open-nesting': TextOpenNestingTokenType;
    'text-open-parenthesis': TextOpenParenthesisTokenType;
    'text-open-path': TextOpenPathTokenType;
    'text-open-text': TextOpenTextTokenType;
    'text-path': TextPathTokenType;
    'text-signed-integer': TextSignedIntegerTokenType;
    'text-string': TextStringTokenType;
    'text-term-fragment': TextTermFragmentTokenType;
    'text-unsigned-integer': TextUnsignedIntegerTokenType;
};
export type TextTokenType<T extends Text> = TextTokenMappingType[T];
export type TextType = TextCloseEvaluationTokenType | TextLineTokenType | TextOpenIndentationTokenType | TextDecimalTokenType | TextSignedIntegerTokenType | TextUnsignedIntegerTokenType | TextOpenNestingTokenType | TextOpenParenthesisTokenType | TextCloseParenthesisTokenType | TextOpenTextTokenType | TextCloseTextTokenType | TextOpenInterpolationTokenType | TextCloseInterpolationTokenType | TextCommaTokenType | TextHashtagTokenType | TextCommentTokenType | TextOpenEvaluationTokenType | TextStringTokenType | TextTermFragmentTokenType | TextOpenPathTokenType | TextClosePathTokenType | TextPathTokenType;
export declare function tokenizeLinkText(input: TextInputType): TextResultType;
export {};

import type { TextResultType } from '../../index.js';
export declare enum Fold {
    CloseHandle = "fold-close-handle",
    CloseIndex = "fold-close-index",
    CloseLine = "fold-close-line",
    CloseModule = "fold-close-module",
    CloseNest = "fold-close-nest",
    ClosePlugin = "fold-close-plugin",
    CloseTerm = "fold-close-term",
    CloseTermPath = "fold-close-term-path",
    CloseText = "fold-close-text",
    Comment = "fold-comment",
    Decimal = "fold-decimal",
    Hashtag = "fold-hashtag",
    OpenHandle = "fold-open-handle",
    OpenIndex = "fold-open-index",
    OpenLine = "fold-open-line",
    OpenModule = "fold-open-module",
    OpenNest = "fold-open-nest",
    OpenPlugin = "fold-open-plugin",
    OpenTerm = "fold-open-term",
    OpenTermPath = "fold-open-term-path",
    OpenText = "fold-open-text",
    SignedInteger = "fold-signed-integer",
    String = "fold-string",
    TermFragment = "fold-term-fragment",
    TermSeparator = "fold-term-separator",
    UnsignedInteger = "fold-unsigned-integer"
}
export type FoldBaseMixinType = {
    id: number;
};
export type FoldCloseHandleType = FoldBaseMixinType & {
    type: Fold.CloseHandle;
};
export type FoldCloseIndexType = FoldBaseMixinType & {
    type: Fold.CloseIndex;
};
export type FoldCloseLineType = FoldBaseMixinType & {
    type: Fold.CloseLine;
};
export type FoldCloseModuleType = FoldBaseMixinType & {
    type: Fold.CloseModule;
};
export type FoldCloseNestType = FoldBaseMixinType & {
    type: Fold.CloseNest;
};
export type FoldClosePluginType = FoldBaseMixinType & {
    type: Fold.ClosePlugin;
};
export type FoldCloseTermPathType = FoldBaseMixinType & {
    type: Fold.CloseTermPath;
};
export type FoldCloseTermType = FoldBaseMixinType & {
    type: Fold.CloseTerm;
};
export type FoldCloseTextType = FoldBaseMixinType & {
    type: Fold.CloseText;
};
export type FoldCommentType = FoldBaseMixinType & {
    type: Fold.Comment;
};
export type FoldDecimalType = FoldBaseMixinType & {
    range: FoldRangeType;
    type: Fold.Decimal;
    value: number;
};
export type FoldEditorRangeType = {
    end: number;
    start: number;
};
export type FoldHashtagType = FoldBaseMixinType & {
    code: string;
    range: FoldRangeType;
    system: string;
    type: Fold.Hashtag;
};
export type FoldNodeType = FoldCloseIndexType | FoldCloseModuleType | FoldClosePluginType | FoldCloseTermPathType | FoldCloseTermType | FoldOpenNestType | FoldCloseNestType | FoldCloseTextType | FoldCommentType | FoldTermSeparatorType | FoldDecimalType | FoldOpenLineType | FoldCloseLineType | FoldHashtagType | FoldOpenIndexType | FoldOpenModuleType | FoldOpenPluginType | FoldOpenTermPathType | FoldOpenTermType | FoldOpenTextType | FoldSignedIntegerType | FoldStringType | FoldTermFragmentType | FoldUnsignedIntegerType | FoldOpenHandleType | FoldCloseHandleType;
export type FoldOpenHandleType = FoldBaseMixinType & {
    type: Fold.OpenHandle;
};
export type FoldOpenIndexType = FoldBaseMixinType & {
    type: Fold.OpenIndex;
};
export type FoldOpenLineType = FoldBaseMixinType & {
    type: Fold.OpenLine;
};
export type FoldOpenModuleType = FoldBaseMixinType & {
    type: Fold.OpenModule;
};
export type FoldOpenNestType = FoldBaseMixinType & {
    type: Fold.OpenNest;
};
export type FoldOpenPluginType = FoldBaseMixinType & {
    size: number;
    type: Fold.OpenPlugin;
};
export type FoldOpenTermPathType = FoldBaseMixinType & {
    type: Fold.OpenTermPath;
};
export type FoldOpenTermType = FoldBaseMixinType & {
    type: Fold.OpenTerm;
};
export type FoldOpenTextType = FoldBaseMixinType & {
    type: Fold.OpenText;
};
export type FoldRangeType = {
    character: FoldEditorRangeType;
    line: FoldEditorRangeType;
    offset: FoldEditorRangeType;
};
export type FoldResultType = TextResultType & {
    directions: Array<FoldNodeType>;
};
export type FoldSignedIntegerType = FoldBaseMixinType & {
    range: FoldRangeType;
    type: Fold.SignedInteger;
    value: number;
};
export type FoldStringType = FoldBaseMixinType & {
    range: FoldRangeType;
    type: Fold.String;
    value: string;
};
export type FoldTermFragmentType = FoldBaseMixinType & {
    dereference: boolean;
    guard: boolean;
    query: boolean;
    range: FoldRangeType;
    start: boolean;
    type: Fold.TermFragment;
    value: string;
};
export type FoldTermSeparatorType = FoldBaseMixinType & {
    type: Fold.TermSeparator;
};
export type FoldUnsignedIntegerType = FoldBaseMixinType & {
    range: FoldRangeType;
    type: Fold.UnsignedInteger;
    value: number;
};

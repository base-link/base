import { LinkHint, Text } from '~';
import type { FoldStateInputType, SiteProcessInputType, TextSplitInputType, TextTokenType } from '~';
export declare class BaseLinkError extends Error {
    data: SiteErrorType;
    constructor(message: string, data: SiteErrorType);
}
export declare class CompilerError extends Error {
}
export type CursorLinePositionType = {
    character: number;
    line: number;
};
export type CursorRangeType = {
    end: CursorLinePositionType;
    start: CursorLinePositionType;
};
export declare enum ErrorTerm {
    CompilationError = "compilation-error",
    CompilerError = "compiler-error",
    SyntaxError = "syntax-error",
    SystemError = "system-error"
}
export type SiteErrorConfigType = {
    code: string;
    hint?: string;
    note: (props: Record<string, unknown>) => string;
    text?: string;
};
export type SiteErrorInputType = Record<string, unknown>;
export type SiteErrorType = {
    code: string;
    file?: string;
    hint?: string;
    note: string;
    term?: Array<string>;
    text?: string;
};
export type SiteStackTraceType = {
    character?: number;
    file: string;
    function?: string;
    line?: number;
};
export declare class TypescriptError extends Error {
}
export declare function assertError(error: unknown): asserts error is SiteErrorConfigType;
export declare function buildErrorMessage(data: SiteErrorType): Array<string>;
export declare function createDefaultRange(): CursorRangeType;
export declare function generateChangeVariableTypeError(input: SiteProcessInputType): SiteErrorType;
export declare function generateCompilerTodoError(hint?: string): SiteErrorType;
export declare function generateEnvironmentMissingPropertyError(property: string): SiteErrorType;
export declare function generateForkMissingPropertyError(property: string): SiteErrorType;
export declare function generateHighlightedError(textByLine: Array<string>, highlight: CursorRangeType): string;
export declare function generateHighlightedErrorForLinkTree(input: SiteProcessInputType): string;
export declare function generateHighlightedErrorForText(input: SiteProcessInputType): string;
export declare function generateIncorrectlyTypedVariable(type: string | Array<string>, name?: string, path?: string): SiteErrorType;
export declare function generateInvalidCompilerStateError(hint?: string, path?: string): SiteErrorType;
export declare function generateInvalidDeckLink(input: SiteProcessInputType, link: string): SiteErrorType;
export declare function generateInvalidNestCaseError(input: SiteProcessInputType, type: LinkHint): SiteErrorType;
export declare function generateInvalidNestChildrenLengthError(input: SiteProcessInputType, length: number): SiteErrorType;
export declare function generateInvalidWhitespaceError(input: FoldStateInputType): SiteErrorType;
export declare function generateModuleUnresolvableError(input: SiteProcessInputType): SiteErrorType;
export declare function generateObjectNotTypeError(object: unknown, type: Array<string>): SiteErrorType;
export declare function generateStringMismatchError(input: TextSplitInputType, a: string, b: string): SiteErrorType;
export declare function generateSyntaxTokenError(input: TextSplitInputType, lastToken?: TextTokenType<Text>): SiteErrorType;
export declare function generateTermMissingChildError(): void;
export declare function generateTermMissingError(input: SiteProcessInputType, type: string, object: string): SiteErrorType;
export declare function generateUnhandledNestCaseBaseError(input: SiteProcessInputType): SiteErrorType;
export declare function generateUnhandledNestCaseError(input: SiteProcessInputType, type: LinkHint): SiteErrorType;
export declare function generateUnhandledTermCaseError(input: SiteProcessInputType): SiteErrorType;
export declare function generateUnhandledTermInterpolationError(input: SiteProcessInputType): SiteErrorType;
export declare function generateUnknownTermError(input: SiteProcessInputType): SiteErrorType;
export declare function generateUnresolvedPathError(input: SiteProcessInputType, path: string): SiteErrorType;
export declare function generatedNotImplementedYetError(name?: string, path?: string): SiteErrorType;
export declare function getCursorRangeForPath(input: SiteProcessInputType): CursorRangeType;
export declare function getCursorRangeForPlugin(input: SiteProcessInputType): CursorRangeType;
export declare function getCursorRangeForString(input: SiteProcessInputType): CursorRangeType;
export declare function getCursorRangeForTerm(input: SiteProcessInputType): CursorRangeType;
export declare function getCursorRangeForText(input: SiteProcessInputType): CursorRangeType;
export declare function getCursorRangeForTextWhitespaceToken(token: TextTokenType<Text>, input: FoldStateInputType): CursorRangeType;
export declare function getCursorRangeForTree(input: SiteProcessInputType): CursorRangeType;
export declare function getSourceMappedFile(path: string, line: number, character: number): [string, number | undefined, number | undefined];
export declare function highlightTextRangeForError(bound: CursorRangeType, textByLine: Array<string>, highlight: CursorRangeType): string;
export declare function isError(error: unknown): error is SiteErrorConfigType;
export declare function parseStackLine(text: string): SiteStackTraceType;
export declare function parseStackLineFileOnly(text: string): SiteStackTraceType;
export declare function parseTapStackTrace(stack: string): Array<SiteStackTraceType>;
export declare function renderDiffText(a: string, b: string): string;
export declare function renderError(stackTrace: string): Array<string>;
export declare function renderStackTrace(stack: Array<SiteStackTraceType>): Array<string>;
export declare function throwError(data: SiteErrorType): void;

import { code } from '../../..';
export var Text;
(function (Text) {
    Text["CloseEvaluation"] = "text-close-evaluation";
    Text["CloseInterpolation"] = "text-close-interpolation";
    Text["CloseParenthesis"] = "text-close-parenthesis";
    Text["ClosePath"] = "text-close-path";
    Text["CloseText"] = "text-close-text";
    Text["Comma"] = "text-comma";
    Text["Comment"] = "text-comment";
    Text["Decimal"] = "text-decimal";
    Text["Hashtag"] = "text-hashtag";
    Text["Line"] = "text-line";
    Text["OpenEvaluation"] = "text-open-evaluation";
    Text["OpenIndentation"] = "text-open-indentation";
    Text["OpenInterpolation"] = "text-open-interpolation";
    Text["OpenNesting"] = "text-open-nesting";
    Text["OpenParenthesis"] = "text-open-parenthesis";
    Text["OpenPath"] = "text-open-path";
    Text["OpenText"] = "text-open-text";
    Text["Path"] = "text-path";
    Text["SignedInteger"] = "text-signed-integer";
    Text["String"] = "text-string";
    Text["TermFragment"] = "text-term-fragment";
    Text["UnsignedInteger"] = "text-unsigned-integer";
})(Text || (Text = {}));
// eslint-disable-next-line sort-exports/sort-exports
export const TEXT_PATH_PATTERN_LIST = [
    Text.ClosePath,
    Text.OpenInterpolation,
    Text.CloseInterpolation,
    Text.Path,
];
// eslint-disable-next-line sort-exports/sort-exports
export const TEXT_STRING_PATTERN_LIST = [
    Text.OpenInterpolation,
    Text.CloseInterpolation,
    Text.CloseText,
    Text.String,
];
// eslint-disable-next-line sort-exports/sort-exports
export const TEXT_TYPE = [
    Text.ClosePath,
    Text.CloseEvaluation,
    Text.CloseInterpolation,
    Text.CloseParenthesis,
    Text.CloseText,
    Text.Comma,
    Text.Comment,
    Text.Decimal,
    Text.Hashtag,
    Text.Line,
    Text.OpenEvaluation,
    Text.OpenIndentation,
    Text.OpenInterpolation,
    Text.OpenNesting,
    Text.OpenParenthesis,
    Text.OpenText,
    Text.OpenPath,
    Text.Path,
    Text.SignedInteger,
    Text.String,
    Text.TermFragment,
    Text.UnsignedInteger,
];
// eslint-disable-next-line sort-exports/sort-exports
export const TEXT_PATTERN_LIST = [
    Text.CloseEvaluation,
    Text.CloseInterpolation,
    Text.CloseParenthesis,
    Text.CloseText,
    Text.Comma,
    Text.Comment,
    Text.Decimal,
    Text.Hashtag,
    Text.Line,
    Text.OpenEvaluation,
    Text.OpenIndentation,
    Text.OpenInterpolation,
    Text.OpenNesting,
    Text.OpenParenthesis,
    Text.OpenText,
    Text.OpenPath,
    Text.SignedInteger,
    Text.TermFragment,
    Text.UnsignedInteger,
];
export var TextState;
(function (TextState) {
    TextState["Path"] = "path";
    TextState["Text"] = "text";
    TextState["Tree"] = "tree";
})(TextState || (TextState = {}));
const PATTERN = {
    [Text.CloseEvaluation]: {
        pattern: /^ *\] */,
    },
    [Text.CloseInterpolation]: {
        pattern: /^\}/,
    },
    [Text.CloseParenthesis]: {
        pattern: /^\)/,
    },
    [Text.CloseText]: {
        pattern: /^>/,
    },
    [Text.Comma]: {
        pattern: /^, /,
    },
    [Text.Comment]: {
        pattern: /^# [^\n]+/,
    },
    [Text.Decimal]: {
        pattern: /^-?\d+\.\d+/,
    },
    [Text.Hashtag]: {
        pattern: /^#\w+/,
    },
    [Text.Line]: {
        pattern: /^\n/,
    },
    [Text.OpenEvaluation]: {
        pattern: /^ *\[ */,
    },
    [Text.OpenIndentation]: {
        pattern: /^  /,
    },
    [Text.OpenInterpolation]: {
        pattern: /^\{/,
    },
    [Text.OpenNesting]: {
        pattern: /^ /,
    },
    [Text.OpenParenthesis]: {
        pattern: /^\(/,
    },
    [Text.OpenText]: {
        pattern: /^</,
    },
    [Text.OpenPath]: {
        after: [Text.OpenIndentation, Text.OpenNesting, Text.Comma],
        pattern: /^(?:(?:@[\w:\-\.]+\/)|(?:\.{1,2}\/)|\*{1,2}\/|(?:\/))/,
    },
    [Text.Path]: {
        pattern: /^[\w:\-\.\*]*(\/[\w:\-\.\*]*)*/,
    },
    [Text.ClosePath]: {
        pattern: /^[\n, ]/,
        skip: true,
    },
    [Text.SignedInteger]: {
        pattern: /^-\d+(?=\b)/,
    },
    [Text.TermFragment]: {
        pattern: /^-?(?:[*~]?[a-z0-9]*(?:-[a-z0-9]+)*\??)(?:\/[a-z0-9]*(?:-[a-z0-9]+)*\??)*-?|-|\//,
    },
    [Text.UnsignedInteger]: {
        pattern: /^\d+(?=\b)/,
    },
    // eslint-disable-next-line sort-keys/sort-keys-fix
    [Text.String]: {
        pattern: /^(?:\\[<>\{\}])+|[^\{>\\]+/,
    },
};
export function tokenizeLinkText(input) {
    const tokenList = [];
    let source = {
        ...input,
        textByLine: input.text.split('\n'),
    };
    let typeStack = [TextState.Tree];
    let line = 0;
    let character = 0;
    let offset = 0;
    let i = 0;
    lineLoop: for (let textLine of source.textByLine) {
        // append `\n` so pattern matching works as expected
        textLine = `${textLine}\n`;
        processLoop: while (textLine) {
            const state = typeStack[typeStack.length - 1] || TextState.Tree;
            let patternList = TEXT_PATTERN_LIST;
            switch (state) {
                case TextState.Tree:
                    patternList = TEXT_PATTERN_LIST;
                    break;
                case TextState.Text:
                    patternList = TEXT_STRING_PATTERN_LIST;
                    break;
                case TextState.Path:
                    patternList = TEXT_PATH_PATTERN_LIST;
                    break;
                default:
                    patternList = TEXT_PATTERN_LIST;
                    break;
            }
            let progressed = false;
            patternLoop: for (const type of patternList) {
                const config = PATTERN[type];
                if (config && config.pattern instanceof RegExp) {
                    let match = textLine.match(config.pattern);
                    if (match) {
                        console.log(state, type, match?.[0], textLine, config.pattern);
                        if (config.after) {
                            const token = tokenList[tokenList.length - 1];
                            if (!token) {
                                continue;
                            }
                            if (!config.after.includes(token.type)) {
                                continue;
                            }
                        }
                        progressed = true;
                        if (config.skip) {
                            const token = {
                                range: {
                                    character: {
                                        end: character,
                                        start: character,
                                    },
                                    line: {
                                        end: line,
                                        start: line,
                                    },
                                    offset: {
                                        end: offset,
                                        start: offset,
                                    },
                                },
                                text: '',
                                type: type,
                            };
                            tokenList.push(token);
                        }
                        else {
                            const matchedLength = match[0].length;
                            const matchedText = textLine.slice(0, matchedLength);
                            const token = {
                                range: {
                                    character: {
                                        end: character + matchedLength,
                                        start: character,
                                    },
                                    line: {
                                        end: line,
                                        start: line,
                                    },
                                    offset: {
                                        end: offset + matchedLength,
                                        start: offset,
                                    },
                                },
                                text: matchedText,
                                type: type,
                            };
                            tokenList.push(token);
                            textLine = textLine.slice(matchedLength);
                            offset += matchedLength;
                            character += matchedLength;
                        }
                        switch (type) {
                            case Text.Line: {
                                line++;
                                character = 0;
                            }
                            case Text.OpenInterpolation: {
                                typeStack.push(TextState.Tree);
                                break;
                            }
                            case Text.CloseInterpolation: {
                                typeStack.pop();
                                break;
                            }
                            case Text.OpenText: {
                                typeStack.push(TextState.Text);
                                break;
                            }
                            case Text.CloseText: {
                                typeStack.pop();
                                break;
                            }
                            case Text.OpenPath: {
                                typeStack.push(TextState.Path);
                                break;
                            }
                            case Text.ClosePath: {
                                typeStack.pop();
                                break;
                            }
                            default:
                                break;
                        }
                        break patternLoop;
                    }
                }
            }
            if (!progressed) {
                code.throwError(code.generateSyntaxTokenError(source, tokenList[tokenList.length - 1]));
            }
        }
        if (textLine.length) {
            code.throwError(code.generateSyntaxTokenError(source, tokenList[tokenList.length - 1]));
        }
    }
    // console.log(JSON.stringify(tokenList, null, 2))
    return {
        ...source,
        tokenList,
    };
}
//# sourceMappingURL=index.js.map
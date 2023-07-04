import chalk from 'chalk';
import { diffChars } from 'diff';
import { ERROR, LINK_HINT_TEXT, Link, SOURCE_MAP_MESH, Text, code, prettifyJSON, } from '~';
export class BaseLinkError extends Error {
    data;
    constructor(message, data) {
        super(message);
        this.data = data;
    }
}
export class CompilerError extends Error {
}
export var ErrorTerm;
(function (ErrorTerm) {
    ErrorTerm["CompilationError"] = "compilation-error";
    ErrorTerm["CompilerError"] = "compiler-error";
    ErrorTerm["SyntaxError"] = "syntax-error";
    ErrorTerm["SystemError"] = "system-error";
})(ErrorTerm || (ErrorTerm = {}));
const consumers = {};
export class TypescriptError extends Error {
}
export function assertError(error) {
    if (!code.isError(error)) {
        throw new Error('Error handler undefined');
    }
}
export function buildErrorMessage(data) {
    const text = [];
    text.push(``);
    text.push(chalk.gray(`  note <`) +
        chalk.whiteBright(`${data.note}`) +
        chalk.gray('>'));
    if (data.hint) {
        text.push(chalk.gray(`  hint <`) +
            chalk.whiteBright(`${data.hint}`) +
            chalk.gray('>'));
    }
    data.term?.forEach(term => {
        text.push(chalk.gray(`    term `) + chalk.white(`${term}`));
    });
    text.push(chalk.gray(`    code `) + chalk.white(`#${data.code}`));
    if (data.file) {
        if (data.text) {
            text.push(chalk.gray(`    file <`) +
                chalk.whiteBright(`${data.file}`) +
                chalk.gray(`>, <`));
            data.text.split('\n').forEach(line => {
                text.push(`      ${line}`);
            });
            text.push(chalk.gray(`    >`));
        }
        else {
            text.push(chalk.gray(`    file <`) +
                chalk.whiteBright(`${data.file}`) +
                chalk.gray(`>`));
        }
    }
    else if (data.text) {
        text.push(chalk.gray(`    text <`));
        data.text.split('\n').forEach(line => {
            text.push(`      ${line}`);
        });
        text.push(chalk.gray('    >'));
    }
    return text;
}
export function createDefaultRange() {
    return {
        end: {
            character: 0,
            line: 0,
        },
        start: {
            character: 0,
            line: 0,
        },
    };
}
export function generateChangeVariableTypeError(load) {
    return {
        code: '0031',
        note: `Attempt to change a variable's type.`,
    };
}
export function generateCompilerTodoError(hint) {
    return {
        code: `0029`,
        hint: [
            `This part of the compiler is unfinished, see the stack trace for where to modify code.`,
            hint,
        ]
            .filter(x => x)
            .join(' '),
        note: `Compiler TODO`,
        term: [ErrorTerm.CompilerError],
    };
}
export function generateEnvironmentMissingPropertyError(property) {
    return {
        code: '0019',
        note: `Environment is missing property ${property}.`,
    };
}
export function generateForkMissingPropertyError(property) {
    return {
        code: `0010`,
        note: `Scope is missing property '${property}'.`,
    };
}
export function generateHighlightedError(textByLine, highlight) {
    const endLine = Math.min(highlight.start.line + 2, textByLine.length - 1);
    const endLineString = textByLine[endLine];
    code.assertString(endLineString);
    const endCharacter = endLineString.length - 1;
    const boundedRange = {
        end: {
            character: endCharacter,
            line: endLine,
        },
        start: {
            character: 0,
            line: Math.max(0, highlight.start.line - 2),
        },
    };
    const text = highlightTextRangeForError(boundedRange, textByLine, highlight);
    return text;
}
export function generateHighlightedErrorForLinkTree(load) {
    const highlightedRange = code.getCursorRangeForTree(load);
    return code.generateHighlightedError(load.module.textByLine, highlightedRange);
}
export function generateHighlightedErrorForText(load) {
    const highlightedRange = code.getCursorRangeForText(load);
    return code.generateHighlightedError(load.module.textByLine, highlightedRange);
}
export function generateIncorrectlyTypedVariable(type, name, path) {
    type = Array.isArray(type) ? type : [type];
    const words = type.length > 1
        ? type
            .slice(-1)
            .map(x => `\`${x}\``)
            .join(', ') + ` or \`${type[type.length - 1]}\``
        : `\`${type[0]}\``;
    const text = name ? ` \`${name}\`` : '';
    return {
        code: `0027`,
        file: path,
        note: `Variable${text} is not typed as a ${words}.`,
    };
}
export function generateInvalidCompilerStateError(hint, path) {
    return {
        code: `0028`,
        file: path,
        hint: [
            hint,
            `This is some bug with the budding compiler. Check the stack trace to see where the error occurred.`,
        ]
            .filter(x => x)
            .join(' '),
        note: `Invalid compiler state`,
    };
}
export function generateInvalidDeckLink(load, link) {
    return {
        code: `0008`,
        note: `Invalid deck link '${link}'.`,
    };
}
export function generateInvalidNestCaseError(load, type) {
    let scope;
    try {
        scope = code.resolveTermString(load);
    }
    catch (e) { }
    const text = code.generateHighlightedErrorForLinkTree(load);
    return {
        code: `0032`,
        file: `${load.module.path}`,
        note: `The "${LINK_HINT_TEXT[type]}" elements are invalid in this context.`,
        text,
    };
}
export function generateInvalidNestChildrenLengthError(load, length) {
    return {
        code: `0009`,
        note: `Term doesn't have ${length} children.`,
    };
}
// export function generateInvalidPatternError(
//   load: MeshLoad,
//   pattern: unknown,
// ): SiteErrorType {
//   const { module } = load
//   const nest = code.assumeLink(load)
//   const text = code.generateHighlightedErrorForText(load)
//   return {
//     code: `0012`,
//     file: `${module.path}`,
//     note: `Text does not match pattern ${pattern}.`,
//     text: text,
//   }
// }
export function generateInvalidWhitespaceError(load) {
    const token = load.tokenList[load.state.index];
    code.assertTextGenericType(token);
    const highlightedRange = code.getCursorRangeForTextWhitespaceToken(token, load);
    const text = code.generateHighlightedError(load.textByLine, highlightedRange);
    return {
        code: '0027',
        file: load.path,
        note: `Invalid whitespace`,
        text,
    };
}
export function generateModuleUnresolvableError(load) {
    return {
        code: '0020',
        file: `${load.module.path}`,
        note: `Module has unresolvable references`,
    };
}
export function generateObjectNotTypeError(object, type) {
    const words = type.length > 1
        ? type
            .slice(-1)
            .map(x => `\`${x}\``)
            .join(', ') + ` or \`${type[-1]}\``
        : `\`${type[0]}\``;
    return {
        code: `0007`,
        note: `Object isn't type ${words}.`,
        text: object == null ? String(object) : prettifyJSON(object),
    };
}
export function generateStringMismatchError(load, a, b) {
    return {
        code: '0030',
        file: load.path,
        note: 'String mismatch error',
        text: code.renderDiffText(a, b),
    };
}
export function generateSyntaxTokenError(load, lastToken) {
    const highlight = {
        end: {
            character: 0,
            line: 0,
        },
        start: {
            character: 0,
            line: 0,
        },
    };
    if (lastToken) {
        highlight.start.line = lastToken.range.line.start;
        highlight.end.line = lastToken.range.line.end;
        highlight.start.character = lastToken.range.character.start;
        highlight.end.character = lastToken.range.character.end;
    }
    const text = code.generateHighlightedError(load.textByLine, highlight);
    return {
        code: `0021`,
        note: `Error in the structure of the text tree.`,
        text,
    };
}
export function generateTermMissingChildError() { }
export function generateTermMissingError(load, type, object) {
    const { module } = load;
    return {
        code: `0018`,
        file: `${module.path}`,
        note: `Term ${type} is missing on ${object}.`,
        text: '',
    };
}
export function generateUnhandledNestCaseBaseError(load) {
    const { module } = load;
    const text = code.generateHighlightedErrorForLinkTree(load);
    return {
        code: `0005`,
        file: `${module.path}`,
        note: `We haven't implemented handling this type of nest yet.`,
        text,
    };
}
export function generateUnhandledNestCaseError(load, type) {
    let scope;
    try {
        // scope = code.resolveTermString(load, 1)
        scope = code.resolveTermString(load);
    }
    catch (e) { }
    const text = code.generateHighlightedErrorForLinkTree(load);
    return {
        code: `0004`,
        file: `${load.module.path}`,
        note: `We haven't implemented handling "${LINK_HINT_TEXT[type]}s" yet${scope ? ` on \`${scope}\`` : ''}.`,
        text,
    };
}
export function generateUnhandledTermCaseError(load) {
    let scope;
    try {
        // scope = code.resolveTermString(load, 1)
        scope = code.resolveTermString(load);
    }
    catch (e) { }
    const name = code.resolveTermString(load);
    code.assertString(name);
    const handle = ERROR['0002'];
    code.assertError(handle);
    const text = code.generateHighlightedErrorForLinkTree(load);
    return {
        code: `0002`,
        file: `${load.module.path}`,
        note: handle.note({ name, scope }),
        term: [ErrorTerm.CompilerError],
        text,
    };
}
export function generateUnhandledTermInterpolationError(load) {
    return {
        code: `0001`,
        file: `${load.module.path}`,
        note: `We haven't implemented handling term interpolation yet.`,
        text: '',
    };
}
export function generateUnknownTermError(load) {
    const { module } = load;
    const name = code.resolveTermString(load);
    const text = code.generateHighlightedErrorForLinkTree(load);
    // const insideName = code.resolveTermString(load, 1)
    const insideName = code.resolveTermString(load);
    return {
        code: `0003`,
        file: `${module.path}`,
        note: `Unknown term \`${name}\`${insideName ? ` inside \`${insideName}\`` : ''}.`,
        text: text,
    };
}
export function generateUnresolvedPathError(load, path) {
    const { module } = load;
    return {
        code: `0013`,
        file: module.path,
        note: `File not found ${path}.`,
    };
}
export function generatedNotImplementedYetError(name, path) {
    return {
        code: '0024',
        file: path,
        note: `We have not yet implemented ${name ? `${name}` : 'something you referenced'}.`,
        term: [ErrorTerm.CompilerError],
    };
}
export function getCursorRangeForPath(load) {
    const path = code.assumeLink(load, Link.Path);
    const firstSegment = path.segment[0];
    const lastSegment = path.segment[path.segment.length - 1];
    const start = getCursorRangeForTerm(code.withLink(load, firstSegment));
    const end = getCursorRangeForTerm(code.withLink(load, lastSegment));
    const range = {
        end: {
            character: end.end.character,
            line: end.end.line,
        },
        start: {
            character: start.start.character,
            line: start.start.line,
        },
    };
    return range;
}
export function getCursorRangeForPlugin(load) {
    const nest = code.assumeLink(load, Link.Plugin);
    const child = nest.nest[0];
    switch (child?.type) {
        case Link.Term: {
            return code.getCursorRangeForTerm(code.withLink(load, nest));
        }
        case Link.Path: {
            return code.getCursorRangeForPath(code.withLink(load, nest));
        }
        case Link.Tree: {
            return code.getCursorRangeForTree(code.withLink(load, nest));
        }
        default:
            code.throwError(code.generateInvalidCompilerStateError());
            throw new CompilerError();
    }
}
export function getCursorRangeForString(load) {
    const string = code.assumeLink(load, Link.String);
    return {
        end: {
            character: string.range.character.end,
            line: string.range.line.end,
        },
        start: {
            character: string.range.character.start,
            line: string.range.line.start,
        },
    };
}
export function getCursorRangeForTerm(load) {
    const term = code.assumeLink(load, Link.Term);
    const range = createDefaultRange();
    const start = term.segment[0];
    const end = term.segment[term.segment.length - 1];
    if (!start || start.type !== Link.String) {
        return range;
    }
    if (!end || end.type !== Link.String) {
        return range;
    }
    range.end.character = end.range.character.end;
    range.end.line = end.range.line.end;
    range.start.character = start.range.character.start;
    range.start.line = start.range.line.start;
    return range;
}
export function getCursorRangeForText(load) {
    const nest = code.assumeLink(load, Link.Text);
    const range = {
        end: {
            character: 0,
            line: 0,
        },
        start: {
            character: 0,
            line: 0,
        },
    };
    const first = nest.segment[0];
    const last = nest.segment[nest.segment.length - 1];
    code.assertGenericLink(first);
    code.assertGenericLink(last);
    let firstRange;
    if (first.type === Link.String) {
        firstRange = code.getCursorRangeForString(code.withLink(load, first));
    }
    else if (first.type === Link.Plugin) {
        firstRange = code.getCursorRangeForPlugin(code.withLink(load, first));
    }
    else {
        code.throwError(code.generateInvalidCompilerStateError());
        throw new CompilerError();
    }
    if (firstRange) {
        range.start.line = firstRange.start.line;
        range.start.character = firstRange.start.character;
        range.end.line = firstRange.end.line;
        range.end.character = firstRange.end.character;
    }
    let lastRange;
    if (last.type === Link.String) {
        lastRange = code.getCursorRangeForString(code.withLink(load, last));
    }
    else if (last.type === Link.Plugin) {
        lastRange = code.getCursorRangeForPlugin(code.withLink(load, last));
    }
    else {
        code.throwError(code.generateInvalidCompilerStateError());
        throw new CompilerError();
    }
    if (lastRange) {
        range.end.line = lastRange.end.line;
        range.end.character = lastRange.end.character;
    }
    return range;
}
export function getCursorRangeForTextWhitespaceToken(token, load) {
    let tokens = [];
    let i = load.state.index;
    loop: while (i < load.tokenList.length) {
        let t = load.tokenList[i];
        code.assertTextGenericType(t);
        switch (t.type) {
            case Text.OpenIndentation:
            case Text.OpenNesting:
                tokens.push(t);
                break;
            default:
                break loop;
        }
        i++;
    }
    const start = tokens[0];
    const end = tokens[tokens.length - 1];
    code.assertTextGenericType(start);
    code.assertTextGenericType(end);
    return {
        end: {
            character: end.range.character.end,
            line: end.range.line.end,
        },
        start: {
            character: start.range.character.start,
            line: start.range.line.start,
        },
    };
}
export function getCursorRangeForTree(load) {
    // console.log(load)
    const nest = load.link.element;
    switch (nest.type) {
        case Link.Tree: {
            const term = nest.head;
            if (!term) {
                code.throwError(code.generateInvalidCompilerStateError());
                throw new CompilerError();
            }
            return getCursorRangeForTerm(code.withLink(load, term));
        }
        case Link.Path: {
            return getCursorRangeForPath(load);
        }
        case Link.Term: {
            return getCursorRangeForTerm(load);
        }
        default:
            code.throwError(code.generateInvalidCompilerStateError());
            throw new CompilerError();
    }
}
export function getSourceMappedFile(path, line, character) {
    const map = SOURCE_MAP_MESH[path];
    const trace = {
        column: character,
        filename: path,
        line: line,
    };
    if (map) {
        const token = map.originalPositionFor(trace);
        if (token.source) {
            return [
                code.resolveNativePath(token.source, code.resolveDirectoryPath(path.replace(/^file:\/\//, ''))),
                token.line == null ? undefined : token.line,
                token.column == null ? undefined : token.column,
            ];
        }
        else {
            return [path, line, character];
        }
    }
    else {
        return [path, line, character];
    }
}
export function highlightTextRangeForError(bound, textByLine, highlight) {
    const lines = [];
    let i = bound.start.line;
    let n = bound.end.line;
    let pad = String(n + 1).length;
    const defaultIndent = new Array(pad + 1).join(' ');
    lines.push(chalk.white(`${defaultIndent} |`));
    while (i <= n) {
        const lineText = textByLine[i];
        const x = i + 1;
        let z = i < textByLine.length
            ? x.toString().padStart(pad, ' ')
            : defaultIndent;
        if (highlight.start.line === i) {
            lines.push(chalk.whiteBright(`${z} | ${lineText}`));
            const indentA = new Array(z.length + 1).join(' ');
            const indentB = new Array(highlight.start.character + 1).join(' ');
            const squiggly = new Array(highlight.end.character - highlight.start.character + 1).join('~');
            lines.push(chalk.white(`${indentA} | ${indentB}`) +
                chalk.red(`${squiggly}`));
        }
        else {
            lines.push(chalk.white(`${z} | ${lineText}`));
        }
        i++;
    }
    lines.push(chalk.white(`${defaultIndent} |`));
    return lines.join('\n');
}
export function isError(error) {
    return (code.isRecord(error) && Boolean(error.code));
}
export function parseStackLine(text) {
    const [a, b] = text.trim().split(/\s+/);
    code.assertString(a);
    if (!b) {
        return parseStackLineFileOnly(a);
    }
    else {
        return {
            ...parseStackLineFileOnly(b),
            function: a,
        };
    }
}
export function parseStackLineFileOnly(text) {
    const parts = text.replace(/[\(\)]/g, '').split(':');
    const character = parts.pop();
    let characterN = character ? parseInt(character, 10) : undefined;
    const line = parts.pop();
    let lineN = line ? parseInt(line, 10) : undefined;
    let file = parts.join(':');
    if (code.isNumber(lineN) && code.isNumber(characterN)) {
        ;
        [file, lineN, characterN] = getSourceMappedFile(file, lineN, characterN);
    }
    return {
        character: characterN,
        file,
        line: lineN,
    };
}
export function parseTapStackTrace(stack) {
    return stack
        .trim()
        .split(/\n+/)
        .map(line => {
        const [a, b] = line.trim().split(/\s+/);
        code.assertString(a);
        if (!b) {
            return parseStackLineFileOnly(a);
        }
        else {
            return {
                ...parseStackLineFileOnly(b),
                function: a,
            };
        }
    });
}
export function renderDiffText(a, b) {
    const text = [];
    const diff = diffChars(a, b);
    diff.forEach(part => {
        const value = part.value.replace(/ /g, '◌');
        if (part.added) {
            text.push(chalk.green(value));
        }
        else if (part.removed) {
            text.push(chalk.red(value));
        }
        else {
            text.push(chalk.gray(value));
        }
    });
    return text.join('');
}
export function renderError(stackTrace) {
    const messageLine = [];
    const stack = [];
    const parts = stackTrace.trim().split(/\n+/);
    let intoMessage = false;
    let i = parts.length - 1;
    while (i >= 0) {
        const line = parts[i--];
        if (!intoMessage && line?.startsWith('    at ')) {
            stack.push(code.parseStackLine(line.slice('    at '.length)));
        }
        else if (line) {
            intoMessage = true;
            messageLine.push(line);
        }
    }
    const errorText = code.buildErrorMessage({
        code: '0031',
        note: messageLine.reverse().join('\n'),
        term: [ErrorTerm.SystemError],
    });
    code.renderStackTrace(stack.reverse()).forEach(line => {
        errorText.push(`    ${line}`);
    });
    errorText.push('');
    return errorText;
}
export function renderStackTrace(stack) {
    const g = chalk.gray;
    const w = chalk.white;
    const bw = chalk.whiteBright;
    const text = [];
    stack.forEach(node => {
        let suffix = [];
        if (node.line) {
            suffix.push(node.line);
        }
        if (node.character) {
            suffix.push(node.character);
        }
        const end = suffix.length ? ':' + suffix.join(':') : '';
        text.push(`${g(`site ${g('<')}`)}${bw(`${node.file}${end}`)}${g('>')}`);
        if (node.function) {
            text.push(`${g(`  call ${g('<')}${w(node.function)}${g('>')}`)}`);
        }
    });
    return text;
}
export function throwError(data) {
    const text = code.buildErrorMessage(data);
    text.push(``);
    // Error.stackTraceLimit = Infinity
    const prepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = function prepareStackTrace(error, stack) {
        return (error.message +
            chalk.gray('    list base\n') +
            stack
                .slice(1)
                .map((site) => {
                let x = site.getFileName();
                let a = site.getLineNumber();
                let b = site.getColumnNumber();
                if (x &&
                    code.isNumber(a) &&
                    code.isNumber(b) &&
                    code.isString(x)) {
                    ;
                    [x, a, b] = getSourceMappedFile(x, a, b);
                }
                let m = site.getMethodName()?.trim();
                let f = site.getFunctionName()?.trim();
                let t = site.getTypeName()?.trim();
                let label = m
                    ? [t, m].join('.')
                    : t
                        ? [t, f].join('.')
                        : f || '[anonymous]';
                label = label ? label : '';
                const lastLines = [];
                if (x) {
                    lastLines.push(chalk.gray('      site <') +
                        chalk.whiteBright([x, a, b].filter(x => x).join(':')) +
                        chalk.gray('>'));
                }
                else {
                    lastLines.push(chalk.gray('      site <unknown>'));
                }
                lastLines.push(chalk.gray('        call <') +
                    chalk.white(label) +
                    chalk.gray('>'));
                return lastLines.join('\n');
            })
                .join('\n') +
            '\n');
    };
    const error = new BaseLinkError(text.join('\n'), data);
    error.name = '';
    Error.captureStackTrace(error);
    error.stack;
    Error.prepareStackTrace = prepareStackTrace;
    throw error;
}
//# sourceMappingURL=halt.js.map
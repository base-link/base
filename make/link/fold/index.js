import chalk from 'chalk';
import { Text, code } from '../../index.js';
import { Fold } from './type.js';
export * from './type.js';
export function generateLinkTextBuildingDirections(input) {
    const result = [];
    const stack = [Fold.OpenModule];
    const counter = {};
    function count(type) {
        counter[type] = counter[type] || 1;
        return counter[type]++;
    }
    function base(type) {
        return {
            id: count(type),
            type,
        };
    }
    // console.log(
    //   input.tokenList.map(x => `${x.type} => ${x.text}`),
    // )
    const state = {
        base,
        count,
        index: 0,
        result,
        stack,
    };
    const stateInput = {
        ...input,
        state,
    };
    state.index = 0;
    let indent = 0;
    let fromLine = false;
    while (state.index < input.tokenList.length) {
        const token = input.tokenList[state.index];
        if (token) {
            switch (token.type) {
                case Text.TermFragment: {
                    fromLine = false;
                    result.push(...handleTermFragment(stateInput));
                    break;
                }
                case Text.OpenIndentation: {
                    if (!fromLine) {
                        code.throwError(code.generateInvalidWhitespaceError(stateInput));
                    }
                    indent++;
                    result.push(base(Fold.OpenNest));
                    state.index++;
                    break;
                }
                case Text.OpenNesting: {
                    code.throwError(code.generateInvalidWhitespaceError(stateInput));
                    break;
                }
                case Text.Line: {
                    while (indent > 0) {
                        result.push(base(Fold.CloseNest));
                        indent--;
                    }
                    fromLine = true;
                    state.index++;
                    break;
                }
                case Text.OpenInterpolation:
                    fromLine = false;
                    result.push(...handleTermFragment(stateInput, 0, true));
                    break;
                case Text.CloseEvaluation:
                case Text.CloseInterpolation:
                case Text.CloseParenthesis:
                case Text.CloseText:
                case Text.OpenEvaluation:
                case Text.OpenNesting:
                case Text.OpenParenthesis:
                case Text.OpenText:
                case Text.Comma: {
                    code.throwError(code.generateInvalidCompilerStateError(`Unhandled text type ${token.type}.`, input.path));
                }
                case Text.Comment: {
                    state.index++;
                    fromLine = false;
                    break;
                }
                case Text.UnsignedInteger: {
                    fromLine = false;
                    result.push({
                        ...token,
                        value: parseInt(token.text, 10),
                        ...base(Fold.UnsignedInteger),
                    });
                    state.index++;
                    break;
                }
                case Text.SignedInteger: {
                    fromLine = false;
                    result.push({
                        ...token,
                        value: parseInt(token.text, 10),
                        ...base(Fold.SignedInteger),
                    });
                    state.index++;
                    break;
                }
                case Text.Decimal: {
                    fromLine = false;
                    result.push({
                        ...token,
                        value: parseFloat(token.text),
                        ...base(Fold.Decimal),
                    });
                    state.index++;
                    break;
                }
                case Text.OpenPath: {
                    fromLine = false;
                    result.push(...handlePath(stateInput));
                    break;
                }
                case Text.Hashtag: {
                    fromLine = false;
                    const [hashtag, system = '', ...code] = token.text;
                    result.push({
                        ...token,
                        code: code.join(''),
                        system,
                        ...base(Fold.Hashtag),
                    });
                    state.index++;
                    break;
                }
                default:
                    fromLine = false;
                    state.index++;
                    break;
            }
        }
    }
    // result.push(base(Fold.CloseModule))
    function handlePath(input) {
        const array = [];
        array.push(base(Fold.OpenText));
        let interpolationStack = 0;
        loop: while (state.index < input.tokenList.length) {
            const token = input.tokenList[state.index++];
            check: switch (token?.type) {
                case Text.String:
                case Text.Path: {
                    array.push({
                        ...token,
                        value: token.text,
                        ...base(Fold.String),
                    });
                    break check;
                }
                case Text.OpenPath: {
                    array.push({
                        ...token,
                        value: token.text,
                        ...base(Fold.String),
                    });
                    break check;
                }
                case Text.ClosePath: {
                    break loop;
                }
                case Text.OpenInterpolation: {
                    interpolationStack++;
                    array.push({
                        size: token.text.length,
                        ...base(Fold.OpenPlugin),
                    });
                    array.push(...handleTermFragment(input));
                    break check;
                }
                case Text.CloseInterpolation: {
                    if (interpolationStack > 0) {
                        array.push(base(Fold.ClosePlugin));
                        interpolationStack--;
                    }
                    else {
                        state.index--;
                        break loop;
                    }
                    break check;
                }
                case Text.TermFragment: {
                    state.index--;
                    array.push(...handleTermFragment(input));
                    break;
                }
                default:
                    // state.index--
                    break loop;
            }
        }
        array.push(base(Fold.CloseText));
        return array;
    }
    function handleText(input) {
        const array = [];
        array.push(base(Fold.OpenText));
        let interpolationStack = 0;
        loop: while (state.index < input.tokenList.length) {
            const token = input.tokenList[state.index++];
            check: switch (token?.type) {
                case Text.String: {
                    array.push({
                        ...token,
                        value: token.text,
                        ...base(Fold.String),
                    });
                    break check;
                }
                case Text.OpenInterpolation: {
                    interpolationStack++;
                    array.push({
                        size: token.text.length,
                        ...base(Fold.OpenPlugin),
                    });
                    array.push(...handleTermFragment(input));
                    break check;
                }
                case Text.CloseInterpolation: {
                    if (interpolationStack > 0) {
                        array.push(base(Fold.ClosePlugin));
                        interpolationStack--;
                    }
                    else {
                        state.index--;
                        break loop;
                    }
                    break check;
                }
                default:
                    break loop;
            }
        }
        array.push(base(Fold.CloseText));
        return array;
    }
    function handleNest(input, array = []) {
        array.push(base(Fold.OpenNest));
        handleNestContent(input, array);
        array.push(base(Fold.CloseNest));
        return array;
    }
    function handleNestContent(input, array = []) {
        loop: while (state.index < input.tokenList.length) {
            const token = input.tokenList[state.index++];
            check: switch (token?.type) {
                case Text.TermFragment: {
                    state.index--;
                    array.push(...handleTermFragment(input));
                    break;
                }
                case Text.Comma: {
                    break;
                }
                case Text.UnsignedInteger: {
                    array.push({
                        ...token,
                        value: parseInt(token.text, 10),
                        ...base(Fold.UnsignedInteger),
                    });
                    break;
                }
                case Text.SignedInteger: {
                    array.push({
                        ...token,
                        value: parseInt(token.text, 10),
                        ...base(Fold.SignedInteger),
                    });
                    break;
                }
                case Text.OpenPath: {
                    state.index--;
                    array.push(...handlePath(stateInput));
                    break;
                }
                case Text.Decimal: {
                    array.push({
                        ...token,
                        value: parseFloat(token.text),
                        ...base(Fold.Decimal),
                    });
                    break;
                }
                case Text.Hashtag: {
                    const [hashtag, system = '', ...code] = token.text;
                    array.push({
                        ...token,
                        code: code.join(''),
                        system,
                        ...base(Fold.Hashtag),
                    });
                    break;
                }
                case Text.OpenText: {
                    array.push(...handleText(input));
                    break;
                }
                case Text.OpenInterpolation: {
                    state.index--;
                    array.push(...handleTermFragment(input));
                    break;
                }
                default:
                    state.index--;
                    break loop;
            }
        }
        return array;
    }
    function handleParenthesis(input, array = []) {
        let bracketStack = 0;
        loop: while (state.index < input.tokenList.length) {
            const token = input.tokenList[state.index++];
            check: switch (token?.type) {
                case Text.OpenParenthesis: {
                    bracketStack++;
                    array.push(base(Fold.OpenNest));
                    handleNestContent(input, array);
                    break;
                }
                case Text.CloseParenthesis: {
                    if (bracketStack > 0) {
                        array.push(base(Fold.CloseNest));
                        bracketStack--;
                    }
                    else {
                        state.index--;
                        break loop;
                    }
                    break;
                }
                // case Text.TermFragment:
                // case Text.Comma:
                // case Text.UnsignedInteger:
                // case Text.SignedInteger:
                // case Text.OpenPath:
                // case Text.Decimal:
                // case Text.Hashtag:
                // case Text.OpenText:
                //   handleNestContent(input, array)
                //   console.log('nest', input.tokenList[state.index])
                //   break
                default:
                    state.index--;
                    break loop;
            }
        }
        return array;
    }
    function handleTermFragment(input, depth = 0, close = false) {
        let array = [];
        const tail = [];
        let bracketStack = 0;
        let hasSeparator = false;
        let hasIndex = false;
        loop: while (state.index < input.tokenList.length) {
            const token = input.tokenList[state.index++];
            check: switch (token?.type) {
                case Text.OpenParenthesis: {
                    state.index--;
                    tail.push(...handleParenthesis(input));
                    break;
                }
                case Text.TermFragment: {
                    // console.log(token)
                    const frags = generateTermFragments(token);
                    const list = [];
                    frags.forEach((frag, i) => {
                        if (frag.value) {
                            list.push(frag);
                        }
                        if (i < frags.length - 1) {
                            hasSeparator = true;
                            list.push(base(Fold.CloseTerm));
                            list.push(base(Fold.OpenTerm));
                        }
                    });
                    array.push(...list);
                    break check;
                }
                case Text.OpenEvaluation: {
                    bracketStack++;
                    hasIndex = true;
                    array.push(base(Fold.OpenIndex));
                    array.push(...handleTermFragment(input, depth + 1));
                    break;
                }
                case Text.CloseEvaluation: {
                    if (bracketStack > 0) {
                        array.push(base(Fold.CloseIndex));
                        bracketStack--;
                    }
                    else {
                        state.index--;
                        break loop;
                    }
                    break check;
                }
                case Text.OpenInterpolation: {
                    bracketStack++;
                    array.push({
                        size: token.text.length,
                        ...base(Fold.OpenPlugin),
                    });
                    array.push(...handleTermFragment(input, depth + 1));
                    break check;
                }
                case Text.CloseInterpolation: {
                    if (bracketStack > 0) {
                        array.push(base(Fold.ClosePlugin));
                        bracketStack--;
                    }
                    else {
                        if (!close) {
                            state.index--;
                            break loop;
                        }
                    }
                    break check;
                }
                case Text.OpenNesting: {
                    tail.push(...handleNest(input));
                    break loop;
                }
                case Text.Path: {
                    const frags = generateTermFragments(token);
                    const list = [];
                    list.push(base(Fold.OpenTerm));
                    frags.forEach((frag, i) => {
                        if (frag.value) {
                            list.push(frag);
                        }
                        if (i < frags.length - 1) {
                            hasSeparator = true;
                            list.push(base(Fold.CloseTerm));
                            list.push(base(Fold.OpenTerm));
                        }
                    });
                    list.push(base(Fold.CloseTerm));
                    array.push(...list);
                    break check;
                }
                default:
                    state.index--;
                    break loop;
            }
        }
        if (array[array.length - 1]?.type === Fold.TermSeparator) {
            array.pop();
        }
        const result = [];
        // if (depth === 0) {
        //   console.log(array)
        // }
        if (hasIndex) {
            result.push(base(Fold.OpenTermPath));
            result.push(base(Fold.OpenTerm));
            array.forEach(x => {
                if (x.type === Fold.OpenIndex) {
                    result.push(base(Fold.CloseTerm));
                }
                result.push(x);
            });
            result.push(base(Fold.CloseTermPath));
        }
        else if (hasSeparator) {
            result.push(base(Fold.OpenTermPath));
            result.push(base(Fold.OpenTerm));
            array.forEach(x => {
                result.push(x);
            });
            result.push(base(Fold.CloseTerm));
            result.push(base(Fold.CloseTermPath));
        }
        else {
            if (tail.length) {
                result.push(base(Fold.OpenHandle));
            }
            result.push(base(Fold.OpenTerm));
            array.forEach(x => {
                result.push(x);
            });
            result.push(base(Fold.CloseTerm));
            if (tail.length) {
                result.push(base(Fold.CloseHandle));
            }
        }
        result.push(...tail);
        return result;
    }
    function generateTermFragments(token) {
        const parts = token.text.split('/');
        return parts.map((fragment, i) => {
            const dereference = Boolean(fragment.match(/\*/));
            const guard = Boolean(fragment.match(/\?/));
            const query = Boolean(fragment.match(/~/));
            const name = fragment.replace(/[\*\~\?]/g, '');
            const upto = parts.slice(0, i).join('').length;
            const character = {
                end: token.range.character.start + upto + fragment.length + i,
                start: token.range.character.start + upto + i,
            };
            const line = {
                end: token.range.line.start,
                start: token.range.line.start,
            };
            const offset = {
                end: token.range.offset.start + upto + fragment.length + i,
                start: token.range.offset.start,
            };
            return {
                dereference,
                guard,
                offset,
                query,
                range: {
                    character,
                    line,
                    offset,
                },
                start: i > 0,
                value: name,
                ...base(Fold.TermFragment),
                type: Fold.TermFragment,
            };
        });
    }
    // console.log(logDirectionList(result))
    // console.log(result.map(x => `${x.type} => ${x.value}`))
    return {
        ...input,
        directions: result,
    };
}
function logDirectionList(directionList) {
    const tree = [''];
    let indent = 1;
    let yay = 0;
    let nay = 0;
    directionList.forEach(direction => {
        let color = chalk.gray;
        let diff = 0;
        let type = 'neutral';
        if (direction.type.match('open')) {
            indent++;
            yay++;
            color = chalk.green;
            type = 'open';
        }
        else if (direction.type.match('close')) {
            diff = -1;
            nay++;
            color = chalk.yellow;
            type = 'close';
        }
        const indentText = new Array(Math.max(0, type.match(/open|close/) ? indent : indent + 1)).join('  ');
        const value = chalk.whiteBright('value' in direction
            ? direction.value
            : 'text' in direction
                ? direction.text
                : '');
        const symbol = chalk.gray('');
        tree.push(`  ${indentText}${color(direction.type)} ${value} ${symbol}`);
        indent += diff;
    });
    tree.push('');
    return tree;
}
function cleanText(text) {
    return text.replace(/^(text|fold)-/, '');
}
//# sourceMappingURL=index.js.map
import chalk from 'chalk';
import { Fold, Link, TEXT_TYPE, code } from '../index.js';
import { generateLinkTextBuildingDirections } from './fold/index.js';
import { tokenizeLinkText } from './text/index.js';
export * from './fold/index.js';
export * from './text/index.js';
export * from './type.js';
export var LinkHint;
(function (LinkHint) {
    LinkHint["Code"] = "code";
    LinkHint["DynamicPath"] = "dynamic-path";
    LinkHint["DynamicTerm"] = "dynamic-term";
    LinkHint["DynamicText"] = "dynamic-text";
    LinkHint["Empty"] = "";
    LinkHint["Mark"] = "mark";
    LinkHint["StaticPath"] = "static-path";
    LinkHint["StaticTerm"] = "static-term";
    LinkHint["StaticText"] = "static-text";
})(LinkHint || (LinkHint = {}));
export function assertTextGenericType(object, name) {
    if (!code.isTextGenericType(object)) {
        code.throwError(code.generateIncorrectlyTypedVariable('text', name));
    }
}
export function assertTextType(object, type, name) {
    if (!code.isTextType(object, type)) {
        code.throwError(code.generateIncorrectlyTypedVariable(type, name));
    }
}
export function isTextGenericType(object) {
    return (code.isRecord(object) &&
        'type' in object &&
        TEXT_TYPE.includes(object.type));
}
export function isTextType(object, type) {
    return (code.isRecord(object) &&
        'type' in object &&
        object.type === type);
}
export function parseLinkTree(input) {
    let result = undefined;
    // console.log(code.prettifyJSON(input.directions))
    const state = {
        contexts: [],
        index: 0,
        tree: { nest: [], type: Link.Tree },
    };
    const context = {
        path: [],
        stack: [state.tree],
        tree: state.tree,
    };
    state.contexts.push(context);
    while (state.index < input.directions.length) {
        const token = input.directions[state.index];
        if (!token) {
            continue;
        }
        switch (token.type) {
            case Fold.TermFragment:
                code.parse_termFragment({
                    ...input,
                    state,
                    token,
                });
                break;
            case Fold.OpenHandle:
                code.parse_openHandle({
                    ...input,
                    state,
                    token,
                });
                break;
            case Fold.OpenPlugin:
                code.parse_openPlugin({
                    ...input,
                    state,
                    token,
                });
                break;
            case Fold.ClosePlugin:
                code.parse_closePlugin({
                    ...input,
                    state,
                    token,
                });
                break;
            case Fold.OpenTermPath:
                code.parse_openTermPath({
                    ...input,
                    state,
                    token,
                });
                break;
            case Fold.CloseTermPath:
                code.parse_closeTermPath({
                    ...input,
                    state,
                    token,
                });
                break;
            case Fold.OpenIndex:
                code.parse_openIndex({
                    ...input,
                    state,
                    token,
                });
                break;
            case Fold.CloseIndex:
                code.parse_closeIndex({
                    ...input,
                    state,
                    token,
                });
                break;
            case Fold.OpenTerm:
                code.parse_openTerm({
                    ...input,
                    state,
                    token,
                });
                break;
            case Fold.CloseTerm:
                code.parse_closeTerm({
                    ...input,
                    state,
                    token,
                });
                break;
            case Fold.CloseHandle:
                code.parse_closeHandle({
                    ...input,
                    state,
                    token,
                });
                break;
            case Fold.UnsignedInteger:
                code.parse_unsignedInteger({
                    ...input,
                    state,
                    token,
                });
                break;
            case Fold.OpenText:
                code.parse_openText({
                    ...input,
                    state,
                    token,
                });
                break;
            case Fold.CloseText:
                code.parse_closeText({
                    ...input,
                    state,
                    token,
                });
                break;
            case Fold.String:
                code.parse_string({
                    ...input,
                    state,
                    token,
                });
                break;
            case Fold.Decimal:
                code.parse_decimal({
                    ...input,
                    state,
                    token,
                });
                break;
            case Fold.SignedInteger:
                code.parse_signedInteger({
                    ...input,
                    state,
                    token,
                });
                break;
            case Fold.Hashtag:
                code.parse_hashtag({
                    ...input,
                    state,
                    token,
                });
                break;
            case Fold.OpenNest:
                code.parse_openNest({
                    ...input,
                    state,
                    token,
                });
                break;
            case Fold.CloseNest:
                code.parse_closeNest({
                    ...input,
                    state,
                    token,
                });
                break;
            default:
                code.throwError(code.generatedNotImplementedYetError(token.type, input.path));
        }
        state.index++;
    }
    code.assertLink(state.tree, Link.Tree);
    // console.log(printParserMesh(state.tree))
    return {
        ...input,
        linkTree: state.tree,
    };
}
export function parse_closeHandle(input) {
    const { contexts } = input.state;
    const context = contexts[contexts.length - 1];
    const stack = context?.stack;
    stack?.pop();
}
export function parse_closeIndex(input) {
    const { contexts } = input.state;
    contexts.pop();
}
export function parse_closeNest(input) {
    const { contexts } = input.state;
    const context = contexts[contexts.length - 1];
    const stack = context?.stack;
    stack?.pop();
    context?.path.pop();
}
export function parse_closePlugin(input) {
    const { contexts } = input.state;
    contexts.pop();
}
export function parse_closeTerm(input) {
    const { contexts } = input.state;
    const context = contexts[contexts.length - 1];
    const stack = context?.stack;
    stack?.pop();
}
export function parse_closeTermPath(input) {
    const { contexts } = input.state;
    const context = contexts[contexts.length - 1];
    const stack = context?.stack;
    stack?.pop();
}
export function parse_closeText(input) {
    const { contexts } = input.state;
    const context = contexts[contexts.length - 1];
    const stack = context?.stack;
    stack?.pop();
}
export function parse_decimal(input) {
    const { contexts } = input.state;
    const context = contexts[contexts.length - 1];
    const stack = context?.stack ?? [];
    const current = stack?.[stack.length - 1];
    switch (current?.type) {
        case Link.Tree: {
            if (input.token.type === Fold.Decimal) {
                const uint = {
                    range: input.token.range,
                    type: Link.Decimal,
                    value: input.token.value,
                };
                current.nest.push(uint);
            }
            break;
        }
        default:
            code.throwError(code.generatedNotImplementedYetError(current?.type, input.path));
    }
}
export function parse_hashtag(input) {
    const { contexts } = input.state;
    const context = contexts[contexts.length - 1];
    const stack = context?.stack ?? [];
    const current = stack?.[stack.length - 1];
    switch (current?.type) {
        case Link.Tree: {
            if (input.token.type === Fold.Hashtag) {
                const uint = {
                    code: input.token.code,
                    range: input.token.range,
                    system: input.token.system,
                    type: Link.Hashtag,
                };
                current.nest.push(uint);
            }
            break;
        }
        default:
            code.throwError(code.generatedNotImplementedYetError(current?.type, input.path));
    }
}
export function parse_openHandle(input) {
    const { contexts } = input.state;
    const context = contexts[contexts.length - 1];
    const stack = context?.stack ?? [];
    const current = stack?.[stack.length - 1];
    switch (current?.type) {
        case Link.Plugin: {
            const tree = {
                nest: [],
                parent: current,
                type: Link.Tree,
            };
            current.nest.push(tree);
            stack?.push(tree);
            break;
        }
        case Link.Index: {
            const tree = {
                nest: [],
                parent: current,
                type: Link.Tree,
            };
            current.nest.push(tree);
            stack?.push(tree);
            break;
        }
        case Link.Tree: {
            const tree = {
                nest: [],
                parent: current,
                type: Link.Tree,
            };
            current.nest.push(tree);
            stack?.push(tree);
            break;
        }
        // case Link.Term: {
        //   const tree: LinkTreeType = {
        //     nest: [],
        //     parent: current,
        //     type: Link.Tree,
        //   }
        //   current.nest.push(tree)
        //   stack?.push(tree)
        //   break
        // }
        default:
            code.throwError(code.generatedNotImplementedYetError(current?.type, input.path));
    }
}
export function parse_openIndex(input) {
    const { contexts } = input.state;
    const context = contexts[contexts.length - 1];
    const stack = context?.stack ?? [];
    const current = stack?.[stack.length - 1];
    switch (current?.type) {
        case Link.Path: {
            const index = {
                nest: [],
                parent: current,
                type: Link.Index,
            };
            current.segment.push(index);
            stack?.push(index);
            const tree = index;
            contexts.push({
                path: [],
                stack: [tree],
                tree,
            });
            break;
        }
        default:
            code.throwError(code.generatedNotImplementedYetError(current?.type, input.path));
    }
}
export function parse_openNest(input) {
    const context = input.state.contexts[input.state.contexts.length - 1];
    if (!context) {
        return;
    }
    let tree = context.tree;
    for (const part of context.path) {
        if (tree && tree.type === Link.Tree) {
            const node = tree.nest[part];
            if (node) {
                if (node.type === Link.Tree) {
                    tree = node;
                }
                else {
                    tree = undefined;
                }
            }
            else {
                tree = undefined;
                break;
            }
        }
        else if (tree && tree.type === Link.Plugin) {
            const node = tree.nest[part];
            if (node) {
                if (node.type === Link.Tree) {
                    tree = node;
                }
                else {
                    tree = undefined;
                }
            }
            else {
                tree = undefined;
                break;
            }
        }
        else if (tree && tree.type === Link.Index) {
            const node = tree.nest[part];
            if (node) {
                if (node.type === Link.Tree) {
                    tree = node;
                }
                else {
                    tree = undefined;
                }
            }
            else {
                tree = undefined;
                break;
            }
        }
    }
    if (tree &&
        (tree.type === Link.Tree ||
            tree.type === Link.Plugin ||
            tree.type === Link.Index)) {
        context.path.push(tree.nest.length - 1);
        const node = tree.nest[tree.nest.length - 1];
        if (node) {
            context.stack.push(node);
        }
        else {
            // throw new Error()
        }
    }
    else {
        // throw new Error()
    }
}
export function parse_openPlugin(input) {
    const { contexts } = input.state;
    const context = contexts[contexts.length - 1];
    const stack = context?.stack ?? [];
    const current = stack?.[stack.length - 1];
    switch (current?.type) {
        case Link.Term: {
            if (input.token.type === Fold.OpenPlugin) {
                const plugin = {
                    nest: [],
                    parent: current,
                    size: input.token.size,
                    type: Link.Plugin,
                };
                current.segment.push(plugin);
                const tree = plugin;
                contexts.push({
                    path: [],
                    stack: [tree],
                    tree,
                });
                // stack?.push(plugin)
            }
            break;
        }
        case Link.Text: {
            if (input.token.type === Fold.OpenPlugin) {
                const plugin = {
                    nest: [],
                    parent: current,
                    size: input.token.size,
                    type: Link.Plugin,
                };
                current.segment.push(plugin);
                const tree = plugin;
                contexts.push({
                    path: [],
                    stack: [tree],
                    tree,
                });
                // stack?.push(plugin)
            }
            break;
        }
        default:
            code.throwError(code.generatedNotImplementedYetError(current?.type, input.path));
    }
}
export function parse_openTerm(input) {
    const { contexts } = input.state;
    const context = contexts[contexts.length - 1];
    const stack = context?.stack ?? [];
    const current = stack?.[stack.length - 1];
    switch (current?.type) {
        case Link.Path: {
            const term = {
                dereference: false,
                guard: false,
                parent: current,
                query: false,
                segment: [],
                type: Link.Term,
            };
            stack?.push(term);
            current.segment.push(term);
            break;
        }
        case Link.Plugin: {
            const term = {
                dereference: false,
                guard: false,
                parent: current,
                query: false,
                segment: [],
                type: Link.Term,
            };
            stack?.push(term);
            current.nest.push(term);
            break;
        }
        case Link.Tree: {
            const term = {
                dereference: false,
                guard: false,
                parent: current,
                query: false,
                segment: [],
                type: Link.Term,
            };
            stack?.push(term);
            if (current.head) {
                current.nest.push(term);
            }
            else {
                current.head = term;
            }
            break;
        }
        default:
            code.throwError(code.generatedNotImplementedYetError(current?.type, input.path));
    }
}
export function parse_openTermPath(input) {
    const { contexts } = input.state;
    const context = contexts[contexts.length - 1];
    const stack = context?.stack ?? [];
    const current = stack?.[stack.length - 1];
    switch (current?.type) {
        case Link.Tree: {
            const path = {
                parent: current,
                segment: [],
                type: Link.Path,
            };
            stack?.push(path);
            current.nest.push(path);
            break;
        }
        case Link.Plugin: {
            const path = {
                parent: current,
                segment: [],
                type: Link.Path,
            };
            stack?.push(path);
            current.nest.push(path);
            break;
        }
        case Link.Index: {
            const path = {
                parent: current,
                segment: [],
                type: Link.Path,
            };
            stack?.push(path);
            current.nest.push(path);
            break;
        }
        default:
            code.throwError(code.generatedNotImplementedYetError(current?.type, input.path));
    }
}
export function parse_openText(input) {
    const { contexts } = input.state;
    const context = contexts[contexts.length - 1];
    const stack = context?.stack ?? [];
    const current = stack?.[stack.length - 1];
    switch (current?.type) {
        case Link.Tree: {
            const text = {
                segment: [],
                type: Link.Text,
            };
            current.nest.push(text);
            stack?.push(text);
            break;
        }
        default:
            code.throwError(code.generatedNotImplementedYetError(current?.type, input.path));
    }
}
export function parse_signedInteger(input) {
    const { contexts } = input.state;
    const context = contexts[contexts.length - 1];
    const stack = context?.stack ?? [];
    const current = stack?.[stack.length - 1];
    switch (current?.type) {
        case Link.Tree: {
            if (input.token.type === Fold.SignedInteger) {
                const int = {
                    range: input.token.range,
                    type: Link.SignedInteger,
                    value: input.token.value,
                };
                current.nest.push(int);
            }
            break;
        }
        default:
            code.throwError(code.generatedNotImplementedYetError(current?.type, input.path));
    }
}
function printMeshDetails(node, flat = false) {
    const text = [];
    switch (node.type) {
        case Link.String: {
            text.push(node.value);
            break;
        }
        case Link.Tree: {
            const head = [];
            if (node.head) {
                printMeshDetails(node.head, flat).forEach(line => {
                    head.push(`${line}`);
                });
            }
            const nest = [];
            node.nest.forEach(el => {
                printMeshDetails(el, flat).forEach(line => {
                    nest.push(`${line}`);
                });
            });
            if (flat) {
                text.push(`${head.join('')}(${nest.join(', ')})`);
            }
            else {
                text.push(`${head.join('')}`);
                nest.forEach(line => {
                    text.push(`  ${line}`);
                });
            }
            break;
        }
        case Link.UnsignedInteger: {
            text.push(chalk.green(`${node.value}`));
            break;
        }
        case Link.Text: {
            const string = [];
            node.segment.forEach(seg => {
                printMeshDetails(seg, true).forEach(line => {
                    string.push(`${line}`);
                });
            });
            text.push(`<${string.join('')}>`);
            break;
        }
        case Link.Plugin: {
            if (node.nest.length) {
                const plugin = [];
                node.nest.forEach(nest => {
                    printMeshDetails(nest, true).forEach(line => {
                        plugin.push(`${line}`);
                    });
                });
                text.push('{'.repeat(node.size) +
                    plugin.join('') +
                    '}'.repeat(node.size));
            }
            break;
        }
        case Link.Index: {
            const index = [];
            node.nest.forEach(nest => {
                printMeshDetails(nest, true).forEach(line => {
                    index.push(`${line}`);
                });
            });
            text.push('[' + index.join('') + ']');
            break;
        }
        case Link.Decimal: {
            text.push(`${node.value}`);
            break;
        }
        case Link.Hashtag: {
            text.push(`#${node.system}${node.code}`);
            break;
        }
        case Link.Term: {
            const term = [];
            node.segment.forEach(seg => {
                printMeshDetails(seg, true).forEach(line => {
                    term.push(line);
                });
            });
            text.push(term.join(''));
            break;
        }
        case Link.Path: {
            const path = [];
            node.segment.forEach((seg, i) => {
                printMeshDetails(seg, true).forEach(line => {
                    if (i > 0 && seg.type !== Link.Index) {
                        path.push('/');
                    }
                    path.push(line);
                });
            });
            text.push(path.join(''));
            break;
        }
        default:
            code.throwError(code.generatedNotImplementedYetError(undefined));
    }
    return text;
}
export function parse_string(input) {
    const { contexts } = input.state;
    const context = contexts[contexts.length - 1];
    const stack = context?.stack ?? [];
    const current = stack?.[stack.length - 1];
    switch (current?.type) {
        case Link.Text: {
            if (input.token.type === Fold.String) {
                const string = {
                    range: input.token.range,
                    type: Link.String,
                    value: input.token.value,
                };
                current.segment.push(string);
            }
            break;
        }
        case Link.Tree: {
            if (input.token.type === Fold.String) {
                const string = {
                    range: input.token.range,
                    type: Link.String,
                    value: input.token.value,
                };
                current.nest.push(string);
            }
            break;
        }
        default:
            code.throwError(code.generatedNotImplementedYetError(current?.type, input.path));
    }
}
function printParserMeshDetails(node) {
    const text = [];
    const title = chalk.white(node.type);
    switch (node.type) {
        case Link.String: {
            text.push(`${title} ${chalk.green(node.value)}`);
            break;
        }
        case Link.Tree: {
            text.push(`${title}`);
            if (node.head) {
                text.push(chalk.gray(`  head:`));
                printParserMeshDetails(node.head).forEach(line => {
                    text.push(`    ${line}`);
                });
            }
            else {
                text.push(chalk.gray('  hook: undefined'));
            }
            if (node.nest.length) {
                text.push(chalk.gray(`  nest:`));
                node.nest.forEach(el => {
                    printParserMeshDetails(el).forEach(line => {
                        text.push(`    ${line}`);
                    });
                });
            }
            break;
        }
        case Link.UnsignedInteger: {
            text.push(`${title} ${node.value}`);
            break;
        }
        case Link.Text: {
            text.push(`${title}`);
            node.segment.forEach(seg => {
                printParserMeshDetails(seg).forEach(line => {
                    text.push(`  ${line}`);
                });
            });
            break;
        }
        case Link.Plugin: {
            text.push(`${title}`);
            text.push(chalk.gray(`  size: ${node.size}`));
            if (node.nest.length) {
                text.push(chalk.gray(`  nest:`));
                node.nest.forEach(nest => {
                    printParserMeshDetails(nest).forEach(line => {
                        text.push(`    ${line}`);
                    });
                });
            }
            break;
        }
        case Link.Index: {
            text.push(`${title}`);
            text.push(chalk.gray(`  nest:`));
            node.nest.forEach(nest => {
                printParserMeshDetails(nest).forEach(line => {
                    text.push(`    ${line}`);
                });
            });
            break;
        }
        case Link.Decimal: {
            text.push(`${title} ${node.value}`);
            break;
        }
        case Link.Hashtag: {
            text.push(`${title} #${node.system}${node.code}`);
            break;
        }
        case Link.Term: {
            text.push(`${title}`);
            node.segment.forEach(seg => {
                printParserMeshDetails(seg).forEach(line => {
                    text.push(`  ${line}`);
                });
            });
            break;
        }
        case Link.Path: {
            text.push(`${title}`);
            node.segment.forEach(seg => {
                printParserMeshDetails(seg).forEach(line => {
                    text.push(`  ${line}`);
                });
            });
            break;
        }
        default:
            code.throwError(code.generatedNotImplementedYetError(undefined));
    }
    return text;
}
export function parse_termFragment(input) {
    const { contexts } = input.state;
    const context = contexts[contexts.length - 1];
    const stack = context?.stack ?? [];
    const current = stack?.[stack.length - 1];
    switch (current?.type) {
        case Link.Term: {
            const parent = current.parent;
            const oldTerm = current;
            if (input.token.type === Fold.TermFragment) {
                oldTerm.dereference = input.token.dereference;
                oldTerm.guard = input.token.guard;
                oldTerm.type = Link.Term;
                oldTerm.parent = parent;
                oldTerm.query = input.token.query;
                oldTerm.segment.push({
                    range: input.token.range,
                    type: Link.String,
                    value: input.token.value,
                });
                // if (!input.token.start) {
                //   const termList: Array<LinkTermType> = mergeTerms(
                //     oldTerm,
                //     newTerm,
                //   )
                // }
                // parent.segment.push(newTerm)
                // stack.push(newTerm)
            }
            break;
        }
        default:
            code.throwError(code.generatedNotImplementedYetError(current?.type, input.path));
    }
}
export function parse_unsignedInteger(input) {
    const { contexts } = input.state;
    const context = contexts[contexts.length - 1];
    const stack = context?.stack ?? [];
    const current = stack?.[stack.length - 1];
    switch (current?.type) {
        case Link.Tree: {
            if (input.token.type === Fold.UnsignedInteger) {
                const uint = {
                    type: Link.UnsignedInteger,
                    value: input.token.value,
                };
                current.nest.push(uint);
            }
            break;
        }
        default:
            code.throwError(code.generatedNotImplementedYetError(current?.type, input.path));
    }
}
export function printMesh(base) {
    const text = [''];
    printMeshDetails(base).forEach(line => {
        text.push(`${line}`);
    });
    text.push('');
    return text.join('\n');
}
export function printParserMesh(base) {
    const text = [''];
    printParserMeshDetails(base).forEach(line => {
        text.push(`  ${line}`);
    });
    text.push('');
    return text.join('\n');
}
// eslint-disable-next-line sort-exports/sort-exports
export const LINK_HINT_TEXT = {
    [LinkHint.Code]: 'boolean',
    [LinkHint.DynamicTerm]: 'dynamic term',
    [LinkHint.DynamicText]: 'dynamic text',
    [LinkHint.DynamicPath]: 'dynamic path',
    [LinkHint.Empty]: 'empty',
    [LinkHint.Mark]: 'unsigned integer',
    [LinkHint.StaticTerm]: 'static term',
    [LinkHint.StaticText]: 'static text',
    [LinkHint.StaticPath]: 'static path',
};
export function parseLinkText(input) {
    return parseLinkTree(generateLinkTextBuildingDirections(tokenizeLinkText(input)));
}
//# sourceMappingURL=index.js.map
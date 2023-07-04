import chalk from 'chalk';
export function prettifyJSON(obj, indent = 0) {
    return makePrettyArray(obj, indent).join('');
}
function makePrettyArray(obj, indent = 0) {
    const str = [];
    if (Array.isArray(obj)) {
        const arr = [];
        let isSimple = true;
        obj.forEach(val => {
            const item = makePrettyArray(val, indent + 1);
            if (item.length > 1) {
                isSimple = false;
            }
            arr.push(item.join(''));
        });
        if (isSimple) {
            if (arr.length) {
                str.push(chalk.gray(`[ `));
                str.push(`${arr.join(chalk.gray(', '))}`);
                str.push(chalk.gray(` ]`));
            }
            else {
                str.push(chalk.gray(`[]`));
            }
        }
        else {
            str.push(chalk.gray(`[`));
            arr.forEach((item, i) => {
                str.push(`\n${makeIndent(indent + 1)}${item}`);
                if (i < arr.length - 1) {
                    str.push(chalk.gray(','));
                }
            });
            str.push(chalk.gray(` ]`));
        }
    }
    else if (obj != null) {
        if (code.isRecord(obj)) {
            str.push(chalk.gray(`{`));
            const keys = Object.keys(obj);
            keys.forEach((key, i) => {
                str.push(`\n${makeIndent(indent + 1)}${quotifyKey(key)}${chalk.gray(':')} `);
                str.push(makePrettyArray(obj[key], indent + 1).join(''));
                if (i < keys.length - 1) {
                    str.push(chalk.gray(`,`));
                }
            });
            if (keys.length) {
                str.push(chalk.gray(` }`));
            }
            else {
                str.push(chalk.gray(`}`));
            }
        }
        else if (typeof obj === 'boolean') {
            str.push(chalk.green(`${obj}`));
        }
        else if (typeof obj === 'string') {
            str.push(quotifyString(obj));
        }
        else if (code.isRecord(obj) &&
            'toJSON' in obj &&
            typeof obj.toJSON === 'function') {
            str.push(`TODO`);
        }
        else {
            str.push(`${obj.toString()}`);
        }
    }
    else if (obj === null) {
        str.push(`null`);
    }
    return str;
}
function makeIndent(i) {
    return new Array(i + 1).join('  ');
}
function quotifyKey(key) {
    if (key.match(/^[a-zA-Z_][_a-zA-Z0-9]*$/)) {
        return chalk.blue(key);
    }
    else {
        return quotifyString(key);
    }
}
function quotifyString(string) {
    return chalk.yellow(`'${string.replace(/\'/g, _ => `\\${_}`)}'`);
}
//# sourceMappingURL=prettyJSON.js.map
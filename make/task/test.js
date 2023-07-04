import chalk from 'chalk';
import cp from 'child_process';
import { Parser } from 'tap-parser';
const p = new Parser();
p.on('pass', handlePass);
p.on('fail', handleFail);
p.on('bound', handleComplete);
handleStart();
function handleStart() {
    console.log('');
}
const child = cp.spawn('node', ['./host/link/test/parser/index.test.js'], {
    stdio: [null, 'pipe', 'inherit'],
});
child.stdout.pipe(p);
function handleFail(data) {
    const name = data.name;
    const stack = getStackTrace(data);
    const duration = getDuration(data);
    const r = chalk.red;
    const g = chalk.gray;
    const w = chalk.white;
    const bw = chalk.whiteBright;
    const y = chalk.yellow;
    const text = [];
    text.push(`  ${r(`test`)} ${g('<')}${r(name)}${g('>')}`);
    if (duration) {
        text.push(g(`    time ${y(duration)}`));
    }
    if (stack.length) {
        code.renderStackTrace(stack).forEach(line => {
            text.push(`    ${line}`);
        });
    }
    else if (code.isRecord(data.diag) &&
        code.isString(data.diag.error)) {
        text.push(data.diag.error);
    }
    text.push('');
    console.log(text.join('\n'));
}
function getDuration(data) {
    return code.isRecord(data.diag) &&
        code.isNumber(data.diag.duration_ms)
        ? parseFloat(data.diag.duration_ms.toFixed(2))
        : undefined;
}
function getStackTrace(data) {
    if (code.isRecord(data.diag) && code.isString(data.diag.stack)) {
        return code.parseTapStackTrace(data.diag.stack);
    }
    else {
        return [];
    }
}
function handlePass(data) {
    const name = data.name;
    const stack = getStackTrace(data);
    const duration = getDuration(data);
    const r = chalk.green;
    const g = chalk.gray;
    const w = chalk.white;
    const bw = chalk.whiteBright;
    const y = chalk.yellow;
    const text = [];
    text.push(`  ${r(`test`)} ${g('<')}${r(name)}${g('>')}`);
    if (duration) {
        text.push(g(`    time ${y(duration)}`));
    }
    if (stack.length) {
        code.renderStackTrace(stack).forEach(line => {
            text.push(`    ${line}`);
        });
    }
    text.push('');
    console.log(text.join('\n'));
}
function handleComplete(data) {
    const text = [];
    const ratio = [];
    if (data.pass) {
        ratio.push(chalk.green(data.pass));
    }
    if (data.fail) {
        ratio.push(chalk.red(data.fail));
    }
    ratio.push(chalk.white(data.count));
    text.push('');
    text.push(`  rate ${ratio.join(chalk.gray(', '))}`);
    text.push('');
    console.log(text.join('\n'));
}
//# sourceMappingURL=test.js.map
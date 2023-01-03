import chalk from 'chalk'
import cp from 'child_process'
import { FinalResults, Parser, Result } from 'tap-parser'

import { SiteStackTraceType, code } from '~'

const p = new Parser()

p.on('pass', handlePass)
p.on('fail', handleFail)
p.on('complete', handleComplete)

handleStart()

function handleStart() {
  console.log('')
}

const child = cp.spawn(
  'node',
  ['./host/link/test/parser/index.test.js'],
  {
    stdio: [null, 'pipe', 'inherit'],
  },
)

child.stdout.pipe(p)

function handleFail(data: Result): void {
  const name = data.name
  const stack = getStackTrace(data)
  const duration = getDuration(data)
  const r = chalk.red
  const g = chalk.gray
  const w = chalk.white
  const bw = chalk.whiteBright
  const y = chalk.yellow

  const text: Array<string> = []

  text.push(`  ${r(`test`)} ${g('<')}${r(name)}${g('>')}`)
  if (duration) {
    text.push(g(`    time ${y(duration)}`))
  }
  if (stack.length) {
    code.renderStackTrace(stack).forEach(line => {
      text.push(`    ${line}`)
    })
  }

  text.push('')

  console.log(text.join('\n'))
}

function getDuration(data: Result): number | undefined {
  return code.isRecord(data.diag) &&
    code.isNumber(data.diag.duration_ms)
    ? parseFloat(data.diag.duration_ms.toFixed(2))
    : undefined
}

function getStackTrace(
  data: Result,
): Array<SiteStackTraceType> {
  if (
    code.isRecord(data.diag) &&
    code.isString(data.diag.stack)
  ) {
    return code.parseTapStackTrace(data.diag.stack)
  } else {
    return []
  }
}

function handlePass(data: Result): void {
  const name = data.name
  const stack = getStackTrace(data)
  const duration = getDuration(data)
  const r = chalk.green
  const g = chalk.gray
  const w = chalk.white
  const bw = chalk.whiteBright
  const y = chalk.yellow

  const text: Array<string> = []

  text.push(`  ${r(`test`)} ${g('<')}${r(name)}${g('>')}`)
  if (duration) {
    text.push(g(`    time ${y(duration)}`))
  }
  if (stack.length) {
    code.renderStackTrace(stack).forEach(line => {
      text.push(`    ${line}`)
    })
  }

  text.push('')

  console.log(text.join('\n'))
}

function handleComplete(data: FinalResults): void {
  const text: Array<string> = []

  const ratio: Array<string> = []
  if (data.pass) {
    ratio.push(chalk.green(data.pass))
  }
  if (data.fail) {
    ratio.push(chalk.red(data.fail))
  }
  ratio.push(chalk.white(data.count))

  text.push('')
  text.push(`  rate ${ratio.join(chalk.gray(', '))}`)
  text.push('')

  console.log(text.join('\n'))
}

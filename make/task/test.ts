import chalk from 'chalk'
import cp from 'child_process'
import { FinalResults, Parser, Result } from 'tap-parser'

import { code } from '~'

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
    renderStackTrace(stack).forEach(line => {
      text.push(`    ${line}`)
    })
  }

  text.push('')

  console.log(text.join('\n'))
}

function renderStackTrace(
  stack: Array<SiteStackTraceType>,
): Array<string> {
  const g = chalk.gray
  const w = chalk.white
  const bw = chalk.whiteBright
  const text: Array<string> = []
  stack.forEach(node => {
    let suffix = []
    if (node.line) {
      suffix.push(node.line)
    }
    if (node.character) {
      suffix.push(node.character)
    }

    const end = suffix.length ? ':' + suffix.join(':') : ''
    text.push(
      `${w(`file ${g('<')}`)}${bw(`${node.file}${end}`)}${g(
        '>',
      )}`,
    )
    if (node.function) {
      text.push(
        `${g(`  call ${g('<')}${w(node.function)}${g('>')}`)}`,
      )
    }
  })
  return text
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
    return parseStackTrace(data.diag.stack)
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
    renderStackTrace(stack).forEach(line => {
      text.push(`    ${line}`)
    })
  }

  text.push('')

  console.log(text.join('\n'))
}

function handleComplete(data: FinalResults): void {
  const rise = chalk.green(data.pass)
  const fall = chalk.red(data.fail)
  const text: Array<string> = []

  text.push('')
  text.push(`  rate ${rise}${chalk.gray(', ')}${fall}`)
  text.push('')

  console.log(text.join('\n'))
}

function parseStackTrace(
  stack: string,
): Array<SiteStackTraceType> {
  return stack
    .trim()
    .split(/\n+/)
    .map(line => {
      const [a, b] = line.split(/\s+/)
      if (!b) {
        return parseStackLineFileOnly(a)
      } else {
        return {
          ...parseStackLineFileOnly(b),
          function: a,
        }
      }
    })
}

function parseStackLineFileOnly(
  text: string,
): SiteStackTraceType {
  const parts = text.replace(/[\(\)]/g, '').split(':')
  const character = parts.pop()
  const line = parts.pop()
  const file = parts.join(':')
  return {
    character: character ? parseInt(character, 10) : undefined,
    file,
    line: line ? parseInt(line, 10) : undefined,
  }
}

export type SiteStackTraceType = {
  character?: number
  file: string
  function?: string
  line?: number
}

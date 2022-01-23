#!/usr/bin/env node

import minimist from 'minimist'
import chalk from 'chalk'

const COMMAND = [
  {
    entry: 'make link',
    title: `Convert JavaScript to Link Text`,
    options: [
      {
        key: 'input',
        abbr: 'i',
        desc: 'The input JavaScript file to transpile',
        required: true
      },
      {
        key: 'output',
        abbr: 'o',
        desc: 'The output Link Text file or directory',
        required: true
      }
    ]
  },
  {
    entry: 'make',
    title: `Compile Link Text to JavaScript`,
    options: [
      {
        key: 'output',
        abbr: 'o',
        desc: 'The output JavaScript file or directory',
      }
    ]
  }
]

const COMMAND_MAP = COMMAND.reduce((m, x) => {
  m[x.entry] = x
  return m
}, {})

const TASK = {
  '': handleEmpty
}

make()

async function make() {
  const argv = minimist(process.argv.slice(2))

  console.log(argv)

  const command = argv._.join(' ')

  const call = TASK[command]

  if (!call) {
    handleMissing()
  }
}

async function writeBound(fn) {
  console.log('')
  await fn()
  console.log('')
}

function handleEmpty() {
  printUsage()
}

function handleMissing() {
  writeBound(() => {
    console.log(chalk.yellow('  Command does not exist.'))
  })
}

function printUsage() {
  const text = []

  for (const command of COMMAND) {

  }
}

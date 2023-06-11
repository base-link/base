#!/usr/bin/env node

import { Command } from 'commander'
import fs from 'fs'
import pathResolver from 'path'
import os from 'os'
import build from '../task/build.js'

const program = new Command()

const link = program.command('link')
link
  .command('deck')
  .argument('[deck]')
  .action(deck => {
    if (deck) {
      linkDeck(deck as string)
    } else {
      linkSelfBase()
    }
  })

const test = program.command('test')
test.command('deck').action(() => {
  testDeck()
})

const kill = program.command('kill')
const killLink = kill.command('link')
const killLinkDeck = killLink.command('deck')

killLinkDeck.argument('[deck]').action(deck => {
  if (deck) {
    killLinkDeckDeck(deck as string)
  } else {
    killLinkDeckSelfBase()
  }
})

program.parse()

async function testDeck() {
  const deckHost = process.cwd()
  await build(deckHost)
}

function killLinkDeckDeck(deck: string) {
  const [host, name] = String(deck)
    .split('/')
    .map(x => x.replace('@', ''))

  if (!name) {
    throw new Error(`Invalid name ${deck}`)
  }

  const deckHost = process.cwd()

  const link = `${deckHost}/link/hold/${host}/${name}`

  if (fs.lstatSync(link).isSymbolicLink()) {
    fs.unlinkSync(link)
  }
}

function killLinkDeckSelfBase() {}

function linkSelfBase() {
  // TODO: windows/linux support
  const baseHost = os.homedir()
  const deckHost = process.cwd()

  fs.mkdirSync(`${baseHost}/Library/base`, { recursive: true })
  fs.mkdirSync(`${baseHost}/Library/base/nest`, { recursive: true })
  fs.mkdirSync(`${baseHost}/Library/base/nest/link`, {
    recursive: true,
  })

  const deck = JSON.parse(
    fs.readFileSync(`${deckHost}/package.json`, 'utf-8'),
  ) as Record<string, unknown>
  const [host, name] = String(deck.name)
    .split('/')
    .map(x => x.replace('@', ''))

  if (!name) {
    throw new Error(`Invalid name ${deck.name}`)
  }

  fs.mkdirSync(`${baseHost}/Library/base/nest/link/${host}`, {
    recursive: true,
  })

  // TODO: do it like pnpm with hard links
  const baseDeckHost = `${baseHost}/Library/base/nest/link/${host}/${name}`
  fs.symlinkSync(deckHost, baseDeckHost)
}

function linkDeck(deck: string) {
  const baseHost = os.homedir()

  if (!fs.existsSync(`${baseHost}/Library/base/nest/link`)) {
    return
  }

  const deckHost = process.cwd()

  const [host, name] = String(deck)
    .split('/')
    .map(x => x.replace('@', ''))

  if (!name) {
    throw new Error(`Invalid name ${deck}`)
  }

  fs.mkdirSync(`${deckHost}/link/hold/${host}`, { recursive: true })

  // TODO: do it like pnpm with hard links
  fs.symlinkSync(
    `${baseHost}/Library/base/nest/link/${host}/${name}`,
    `${deckHost}/link/hold/${host}/${name}`,
  )
}

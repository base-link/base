#!/usr/bin/env node

import { Command } from 'commander'
import fs from 'fs'
import pathResolver from 'path'
import os from 'os'

const program = new Command()

const link = program.command('link')
link
  .command('deck')
  .argument('[deck]')
  .action((deck) => {
    if (deck) {
      linkDeck(deck)
    } else {
      linkSelfBase()
    }
  })

program.parse()

function linkSelfBase() {
  // TODO: windows/linux support
  const baseHost = os.homedir()
  const deckHost = process.cwd()

  fs.mkdirSync(`${baseHost}/Library/base`, { recursive: true })
  fs.mkdirSync(`${baseHost}/Library/base/host`, { recursive: true })
  fs.mkdirSync(`${baseHost}/Library/base/host/link`, { recursive: true })

  const deck = JSON.parse(fs.readFileSync(`${deckHost}/package.json`, 'utf-8')) as Record<string, unknown>
  const [host, name] = String(deck.name).split('/').map(x => x.replace('@', ''))

  if (!name) {
    throw new Error(`Invalid name ${deck.name}`)
  }

  fs.mkdirSync(`${baseHost}/Library/base/host/link/${host}`, { recursive: true })

  // TODO: do it like pnpm with hard links
  const baseDeckHost = `${baseHost}/Library/base/host/link/${host}/${name}`
  fs.symlinkSync(deckHost, baseDeckHost)
}

function linkDeck(deck: string) {
  const baseHost = os.homedir()

  if (!fs.existsSync(`${baseHost}/Library/base/host/link`)) {
    return
  }

  const deckHost = process.cwd()

  const [host, name] = String(deck).split('/').map(x => x.replace('@', ''))

  if (!name) {
    throw new Error(`Invalid name ${deck}`)
  }

  fs.mkdirSync(`${deckHost}/deck/link/${host}`, { recursive: true })

  // TODO: do it like pnpm with hard links
  fs.symlinkSync(`${baseHost}/Library/base/host/link/${host}/${name}`, `${deckHost}/deck/link/${host}/${name}`)
}

import { RiffDeck } from './riff.js'

export class Base {
  // tasks to be run
  task: Array<() => void>

  // observers
  bind: Record<string, Array<SiteObjectWatcherType>>

  // env variables
  host: Record<string, unknown>

  // the file tree
  deck: Record<string, RiffDeck>

  constructor() {
    this.task = []
    this.bind = {}
    this.host = {}
    this.deck = {}
  }
}

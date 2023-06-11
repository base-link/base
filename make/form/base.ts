import { RiffDeck, SiteLookFormLink } from '~'

export class Base {
  // tasks to be run
  task: Array<() => void>

  // observers
  hook: Record<string, Array<SiteLookFormLink>>

  // env variables
  host: Record<string, unknown>

  // the file tree
  deck: Record<string, RiffDeck>

  constructor() {
    this.task = []
    this.hook = {}
    this.host = {}
    this.deck = {}
  }
}

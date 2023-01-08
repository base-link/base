import {
  BaseCard,
  SiteBindInputType,
  SitePropertyObserverType,
} from '~'
import type { SiteDependencyType } from '~'

export { Base }

export type BaseCallbackType = {
  fork: string
  hook: (site: string, fork: unknown) => void
  link: string
  site: string
}

export type BaseEncounterParamsType = {
  hash: string
  like: string
  load: string
  name: string
}

export type BaseFreeType = () => void

class Base {
  textMap: Record<string, string>

  env: Record<string, unknown>

  observersByIdThenName: Record<
    string,
    Record<string, SiteBindInputType>
  >

  observersByNameThenId: Record<
    string,
    Record<string, SitePropertyObserverType>
  >

  cards: Record<string, BaseCard>

  constructor() {
    this.textMap = {}
    this.env = {}
    this.observersByIdThenName = {}
    this.observersByNameThenId = {}
    this.cards = {}
  }

  load(call: () => void) {
    call()
  }

  card(hash: string) {
    let card: BaseCard | undefined = this.cards[hash]

    if (!card) {
      card = new BaseCard(hash)
      this.cards[hash] = card
    }

    return card
  }
}

export type BaseHookType = () => BaseFreeType

export type BaseRequestParamsType = {
  fork: string
  hash: string
  hook: (site: string, fork: unknown) => void
  like: string
  link: string
  name: string
  site: string
}

import { BaseCard, code } from '~'
import type { SitePropertyObserverType } from '~'

export { Base }

export type BaseCallbackType = {
  fork: string
  hook: (site: string, fork: unknown) => void
  link: string
  site: string
}

export type BaseEncounterParamsType = {
  hash: string
  load: string
  name: string
  type: string
}

export type BaseFreeType = () => void

class Base {
  tasks: Array<() => void>

  textMap: Record<string, string>

  env: Record<string, unknown>

  observersByCardThenIdThenName: Record<
    string,
    Record<string, Record<string, SitePropertyObserverType>>
  >

  observersByCardThenNameThenId: Record<
    string,
    Record<string, Record<string, SitePropertyObserverType>>
  >

  cardsByPath: Record<string, BaseCard>

  cardsById: Record<number, BaseCard>

  constructor() {
    this.tasks = []
    this.textMap = {}
    this.env = {}
    this.observersByCardThenIdThenName = {}
    this.observersByCardThenNameThenId = {}
    this.cardsByPath = {}
    this.cardsById = {}
  }

  load(call: () => void) {
    call()
  }

  card(key: string | number) {
    if (code.isString(key)) {
      let card: BaseCard | undefined = this.cardsByPath[key]

      if (!card) {
        card = new BaseCard(key)
        this.cardsByPath[key] = card
        this.cardsById[card.id] = card
      }

      return card
    } else {
      const card = this.cardsById[key]
      assertBaseCard(card)
      return card
    }
  }
}

export type BaseHookType = () => BaseFreeType

export type BaseRequestParamsType = {
  fork: string
  hash: string
  hook: (site: string, fork: unknown) => void
  link: string
  name: string
  site: string
  type: string
}

function assertBaseCard(object: unknown): asserts object is BaseCard {
  if (!(object instanceof BaseCard)) {
    code.throwError(
      code.generateObjectNotTypeError(object, ['base-card']),
    )
  }
}

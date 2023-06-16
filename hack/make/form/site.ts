import { Base } from '@tunebond/form'

export type SiteFork = {
  base?: SiteFork
  link: Record<string, unknown>
}

export type SiteLookForm = {
  hook?: undefined
  link: SiteLookFormLinkList
}

export type SiteLookFormLink = {
  hook?: SiteLookHook
  link?: SiteLookFormLinkList
  // look: Array<RiffRiseMark>
}

export type SiteLookFormLinkList = {
  [name: string]: SiteLookFormLink
}

export type SiteLookHook = (value: unknown) => void

export type SiteLookLink = {
  base?: SiteLookLink
  bond: boolean
  // counted
  // dynamic properties
  flowLink?: SiteLookLinkList
  hook?: SiteLookHook
  link?: SiteLookLinkList
  // look: Array<RiffRiseMark>
  name: string
  size: number
  test: boolean
}

export type SiteLookLinkList = {
  [name: string]: SiteLookLink
}

export type SiteObjectWatcherType = {
  hook?: undefined
  link: SiteLookLinkList
}

export class Tree {
  form: Base

  fork: Fork

  link: Record<string, unknown>

  hook: Record<string, () => void>

  constructor({ form, fork }: { fork: Fork; form: Base }) {
    this.form = form
    this.fork = fork
    this.link = {}
    this.hook = {}
  }

  make(name: string, { fork }: { fork: Fork }) {
    const make = new Tree()
    if (this.form[name].list) {
      const list = (this.link[name] ??= [])
      list.push(make)
    } else {
      this.link[name] = make
    }
    return make
  }

  bind(name, form, hook) {
    const list = (this.hook[name] ??= [])
    const bind = {}
    const nest = {}
    for (const name in form) {
      const bond = form[name]
      if (isObject(bond)) {
        nest[name] = bond
      } else {
        bind[name] = true
      }
    }
    list.push({ bind, hook, nest })
  }

  save(name, bond) {}
}

export class TreeBind {}

export class TreeFork {
  constructor() {
    this.link = {}
  }

  bind(name, form, bond) {}

  form(name, form) {}

  save(name, bond) {}
}

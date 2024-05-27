/* eslint-disable @typescript-eslint/no-explicit-any */
import { Base, FormMesh } from '@nerdbond/form'

export class TreeBase {
  link: Record<string, unknown>

  hook: Record<string, () => void>

  constructor() {
    this.link = {}
    this.hook = {}
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    list.push({ bind, hook, nest })
  }
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

type MakeTreeBase<B extends Base, FM extends FormMesh> = {
  base: B
  fork: TreeFork
  form: FM
}

// eslint-disable-next-line sort-exports/sort-exports
export class TreeSite<
  B extends Base,
  FM extends FormMesh,
> extends TreeBase {
  base: B

  form: FM

  fork: TreeFork

  bond: any

  constructor({ base, form, fork }: MakeTreeBase<B, FM>) {
    super()
    this.base = base
    this.form = form
    this.fork = fork
  }

  save(
    name: string,
    bond: TreeSite<B, FM> | string | number | boolean | null,
  ) {
    const link = this.form.link[name]
    this.link[name] = bond
    if (!testMesh(bond)) {
      const bindList = this.bind[name]
      if (bindList) {
        for (const bind of bindList) {
          bind.hook(this)
        }
      }
    }
  }

  bind1(hook: TreeHook) {
    // self and all children are resolved
    for (const name in form.link) {
      const nestHook = () => {
        this.needSize--
        this.needLink[name] = false
        this.killBind2(name, nestHook)
        if (this.needSize === 0) {
          hook()
        }
      }
      this.bind2(name, nestHook)
    }
  }

  bind2(name: string, hook: TreeHook) {
    // all the children are resolved
    const list = (this.bind[name] ??= [])
    list.push({ hook })
  }

  bind3(name: string, test: TreeTest, hook: TreeHook) {
    // subset of children are resolved
    const list = (this.bind[name] ??= [])
    const nest = makeTestNest(test, hook)
    list.push({ hook, nest })

    function makeTestNest(test, hook) {
      const nest = []
      const site = this
      let need = 0
      for (const name in test) {
        need++
        const hookSelf = self => {
          self.need--
          if (self.need === 0) {
            hook(site)
          }
        }
        nest.push({ hook: hookSelf, name, need })
      }
      return nest
    }
  }
}

type TreeTest = {
  [name: string]: true | TreeTest
}

type TreeHook = () => void

type Matcher = {
  [key: string]: true | Matcher
}

type Callback = () => void

abstract class TreeElement {
  #parent?: TreeObject

  #listeners: Array<{ callback: Callback; matcher?: Matcher }> = []

  constructor(parent?: TreeObject) {
    this.#parent = parent
  }

  watch(callback: Callback, matcher?: Matcher) {
    if (this.isResolved(matcher)) {
      callback.call(this)
    } else {
      this.#listeners.push({ callback, matcher })
    }
  }

  notify() {
    // empty(!) the listeners array and let the watch method deal with them
    for (const { callback, matcher } of this.#listeners.splice(0)) {
      this.watch(callback, matcher)
    }
    this.#parent?.notify() // bubble up
  }

  abstract isResolved(matcher?: Matcher): boolean
}

class TreeObject extends TreeElement {
  #properties: Record<string, TreeObject | TreeLiteral> = {}

  createObject(name: string) {
    return (this.#properties[name] = new TreeObject(this))
  }

  createLiteral(name: string) {
    return (this.#properties[name] = new TreeLiteral(this))
  }

  isResolved(matcher?: Matcher): boolean {
    const keys = Object.keys(matcher ?? this.#properties)
    return (
      keys.length > 0 &&
      keys.every(key =>
        this.#properties[key]?.isResolved(
          !matcher || matcher?.[key] === true
            ? undefined
            : (matcher[key] as Matcher),
        ),
      )
    )
  }
}

class TreeLiteral extends TreeElement {
  #literalValue: any

  #isResolved = false

  set(value: any) {
    this.#literalValue = value
    this.#isResolved = true
    this.notify()
  }

  isResolved(): boolean {
    return this.#isResolved
  }
}

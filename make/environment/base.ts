import { BaseCard } from '~'
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
  text_mesh: Record<string, string>

  env: Record<string, unknown>

  link_mesh: Map<string, Array<string>>

  hook_mesh: Map<string, BaseHookType>

  free_mesh: Map<string, BaseFreeType>

  card_mesh: Map<string, BaseCard>

  wait_seek_mesh: Map<
    string,
    Map<string, Map<string, Array<BaseCallbackType>>>
  >

  wait_find_mesh: Map<string, Map<string, Map<string, string>>>

  dependency: Array<SiteDependencyType>

  constructor() {
    this.text_mesh = {}
    this.env = {}
    this.link_mesh = new Map()
    this.hook_mesh = new Map()
    this.free_mesh = new Map()
    this.card_mesh = new Map()
    this.wait_seek_mesh = new Map()
    this.wait_find_mesh = new Map()
    this.dependency = []
  }

  link(hash: string, list: Array<string>) {
    this.link_mesh.set(hash, list)
  }

  free(hash: string) {
    this.link_mesh.delete(hash)

    const free = this.free_mesh.get(hash)
    if (free) {
      free()
    }

    this.free_mesh.delete(hash)
    this.hook_mesh.delete(hash)
  }

  hook(hash: string, call: BaseHookType) {
    this.hook_mesh.set(hash, call)
  }

  bind(hash: string) {
    // const list = this.sort()
    // for (const link of list) {
    //   const free = this.free_mesh.get(hash)
    //   if (free) {
    //     free()
    //   }
    //   const call = this.hook_mesh.get(link)
    //   if (call) {
    //     const free_head = call()
    //     this.free_mesh.set(hash, free_head)
    //   }
    // }
  }

  card(hash: string) {
    let card: BaseCard | undefined = this.card_mesh.get(hash)

    if (!card) {
      card = new BaseCard(hash)
      this.card_mesh.set(hash, card)
    }

    return card
  }

  sort() {
    // Calcuate the incoming degree of each vertex
    // const hash_list = [...this.link_mesh.keys()]
    // const head_size = {}
    // for (const hash of hash_list) {
    //   const link_list = this.link_mesh[hash]
    //   if (link_list) {
    //     for (const link of link_list) {
    //       head_size[link] = head_size[link] + 1 || 1
    //     }
    //   }
    // }
    // const head = hash_list.filter(v => !head_size[v])
    // const list = []
    // while (head.length) {
    //   const hash = head.shift()
    //   const link_list = this.link_mesh[hash]
    //   list.push(hash)
    //   // adjust the incoming degree of its neighbors
    //   if (link_list) {
    //     for (const link of link_list) {
    //       head_size[link]--
    //       if (head_size[link] === 0) {
    //         head.push(link)
    //       }
    //     }
    //   }
    // }
    // return list
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

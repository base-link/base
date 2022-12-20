import Card from './card'
import {
  BaseCallbackType,
  BaseEncounterParamsType,
  BaseFreeType,
  BaseHookType,
  BaseRequestParamsType,
} from './type'

class Base {
  text_mesh: Map<string, string>

  link_mesh: Map<string, Array<string>>

  hook_mesh: Map<string, BaseHookType>

  free_mesh: Map<string, BaseFreeType>

  card_mesh: Map<string, Card>

  wait_seek_mesh: Map<
    string,
    Map<string, Map<string, Array<BaseCallbackType>>>
  >

  wait_find_mesh: Map<string, Map<string, Map<string, string>>>

  constructor(text_mesh: Iterable<readonly [string, string]>) {
    this.text_mesh = new Map(text_mesh)
    this.link_mesh = new Map()
    this.hook_mesh = new Map()
    this.free_mesh = new Map()
    this.card_mesh = new Map()
    this.wait_seek_mesh = new Map()
    this.wait_find_mesh = new Map()
  }

  request({
    hash,
    like,
    name,
    site,
    link,
    fork,
    hook,
  }: BaseRequestParamsType) {
    let like_mesh = this.wait_seek_mesh.get(hash)
    if (!like_mesh) {
      like_mesh = new Map()
      this.wait_seek_mesh.set(hash, like_mesh)
    }

    let name_mesh = like_mesh.get(like)
    if (!name_mesh) {
      name_mesh = new Map()
      like_mesh.set(hash, name_mesh)
    }

    let list = name_mesh.get(name)
    if (!list) {
      list = []
      name_mesh.set(name, list)
    }

    list.push({ site, link, hook, fork })
  }

  encounter({
    hash,
    like,
    name,
    load,
  }: BaseEncounterParamsType) {
    let like_mesh = this.wait_find_mesh.get(hash)
    if (!like_mesh) {
      like_mesh = new Map()
      this.wait_find_mesh.set(hash, like_mesh)
    }

    let name_mesh = like_mesh.get(like)
    if (!name_mesh) {
      name_mesh = new Map()
      like_mesh.set(hash, name_mesh)
    }

    name_mesh.set(name, load)
  }

  propagate() {
    for (const [hash, find_like_mesh] of this.wait_find_mesh) {
      const seek_like_mesh = this.wait_seek_mesh.get(hash)

      if (!seek_like_mesh) {
        continue
      }

      for (const [like, find_name_mesh] of find_like_mesh) {
        const seek_name_mesh = seek_like_mesh.get(like)
        if (!seek_name_mesh) {
          continue
        }

        for (const [name, load] of find_name_mesh) {
          const bind_list = seek_name_mesh.get(name)
          if (!bind_list) {
            continue
          }

          for (const bind of bind_list) {
            bind.site[bind.link] = {
              like: 'bind-link',
              bind: load,
            }
            bind.hook(bind.site, bind.fork)
          }
        }
      }
    }

    for (const [hash, find_like_mesh] of this.wait_find_mesh) {
      const seek_like_mesh = this.wait_seek_mesh.get(hash)
      if (!seek_like_mesh) {
        continue
      }

      for (const [like, find_name_mesh] of find_like_mesh) {
        const seek_name_mesh = seek_like_mesh.get(like)
        if (!seek_name_mesh) {
          continue
        }

        for (const [name] of find_name_mesh) {
          seek_name_mesh.delete(name)
          find_name_mesh.delete(name)
        }

        if (seek_name_mesh.size === 0) {
          seek_like_mesh.delete(like)
        }

        if (find_name_mesh.size === 0) {
          find_like_mesh.delete(like)
        }
      }

      if (seek_like_mesh.size === 0) {
        this.wait_seek_mesh.delete(hash)
      }

      if (find_like_mesh.size === 0) {
        this.wait_find_mesh.delete(hash)
      }
    }
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
    let card: Card | undefined = this.card_mesh.get(hash)

    if (!card) {
      card = new Card(hash)
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

export default Base

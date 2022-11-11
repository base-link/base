
const Card = require('./card')

class Base {
  constructor() {
    this.link_mesh = new Map()
    this.hook_mesh = new Map()
    this.free_mesh = new Map()
    this.card_mesh = new Map()
  }

  link(hash, list) {
    this.link_mesh.set(hash, list)
  }

  free(hash) {
    this.link_mesh.delete(hash)
    const free = this.free_mesh.get(hash)
    if (free) {
      free()
    }
    this.free_mesh.delete(hash)
    this.hook_mesh.delete(hash)
  }

  hook(hash, call) {
    this.hook_mesh.set(hash, call)
  }

  bind(hash) {
    const list = this.sort(hash)

    for (const link of list) {
      const free = this.free_mesh.get(hash)
      if (free) {
        free()
      }

      const call = this.hook_mesh.get(link)
      const free_head = call()

      this.free_mesh.set(hash, free_head)
    }
  }

  card(hash) {
    let card = this.card_mesh.get(hash)

    if (!card) {
      card = new Card
      this.card_mesh.set(hash, card)
    }

    return card
  }

  sort() {
    // Calcuate the incoming degree of each vertex
    const hash_list = [...this.link_mesh.keys()]
    const head_size = {}
    for (const hash of hash_list) {
      const link_list = this.link_mesh[hash]

      if (link_list) {
        for (const link of link_list) {
          head_size[link] = head_size[link] + 1 || 1
        }
      }
    }

    const head = hash_list.filter((v) => !head_size[v])
    const list = []

    while (head.length) {
      const hash = head.shift()
      const link_list = this.link_mesh[hash]

      list.push(hash)

      // adjust the incoming degree of its neighbors
      if (link_list) {
        for (const link of link_list) {
          head_size[link]--

          if (head_size[link] === 0) {
            head.push(link)
          }
        }
      }
    }

    return list
  }
}

module.exports = Base

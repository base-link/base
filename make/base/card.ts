let ID = 1

class BaseCard {
  hash: string

  seed: Object

  id: number

  constructor(hash: string) {
    this.id = ID++
    this.hash = hash
    this.seed = {}
  }

  bind(seed: Object) {
    // diff the values
    this.seed = seed
  }

  free() {
    this.seed = {}
  }
}

export { BaseCard }

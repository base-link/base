class Card {
  hash: string

  seed: Object

  constructor(hash: string) {
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

export default Card

class Card {
  hash: string

  seed: Record<string, unknown>

  constructor(hash: string) {
    this.hash = hash
    this.seed = {}
  }

  bind(seed: Record<string, unknown>) {
    // diff the values
    this.seed = seed
  }

  free() {
    this.seed = {}
  }
}

export default Card


class Card {
  constructor(hash) {
    this.hash = hash
    this.seed = {}
  }

  bind(seed) {
    // diff the values
    this.seed = seed
  }

  free() {
    this.seed = {}
  }
}

module.exports = Card

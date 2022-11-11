
class Card {
  constructor() {
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

let ID = 1

class BaseCard {
  link: string

  seed: Object

  id: number

  constructor(link: string) {
    this.id = ID++
    this.link = link
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

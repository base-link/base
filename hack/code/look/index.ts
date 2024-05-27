/* eslint-disable @typescript-eslint/no-explicit-any */

export default class Look {
  link: Record<string, Look>

  testLeaf: boolean

  constructor() {
    this.link = {}
    this.testLeaf = false
  }

  seek(name: string) {
    const look = (this.link[name] ??= new Look())
    return look
  }

  leaf() {
    this.testLeaf = true
    return this
  }
}

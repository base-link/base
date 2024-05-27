import Emitter from 'events'
import makeCode from './code'

export default class BindHash extends Emitter {
  code: string

  constructor() {
    super()

    this.code = makeCode()
  }
}

import Emitter from 'events'
import makeCode from './code'

export default class BindSink extends Emitter {
  code: string

  bond: unknown

  constructor(bond: unknown) {
    super()

    this.code = makeCode()

    this.save(bond)
  }

  save(bond: unknown) {
    this.bond = bond
    this.emit('save')
  }

  read() {
    return this.bond
  }
}

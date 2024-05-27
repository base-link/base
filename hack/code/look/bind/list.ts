/* eslint-disable @typescript-eslint/no-explicit-any */
import Emitter from 'events'
import { Bind } from '.'
import makeCode from './code'

export default class BindList extends Emitter {
  dock: Array<Bind>

  vibeSeal: boolean

  code: string

  constructor() {
    super()
    this.dock = []
    this.vibeSeal = false
    this.code = makeCode()
  }

  saveHead(bond: Bind) {
    this.dock.push(bond)
    this.emit('save', bond)
  }

  seal() {
    if (!this.vibeSeal) {
      this.vibeSeal = true
      this.emit('seal')
    }
  }
}

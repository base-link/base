/* eslint-disable @typescript-eslint/no-explicit-any */
import Emitter from 'events'
import { Bind } from '.'
import makeCode from './code'

export default class BindSite extends Emitter {
  dock: Record<string, Bind>

  code: string

  constructor() {
    super()

    this.dock = {}
    this.code = makeCode()
  }

  save(name: string, bond: Bind) {
    this.dock[name] = bond
    this.emit('save', { bond, name })
  }

  read(name: string) {
    return this.dock[name]
  }

  have(name: string) {
    return this.dock.hasOwnProperty(name)
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import Emitter from 'events'
import { Bind } from './bind/index.js'
import BindList from './bind/list.js'
import BindSite from './bind/site.js'
import BindHash from './bind/hash.js'
import Look from './index.js'
import BindSink from './bind/sink.js'

type SaveHook = {
  bond: Bind
  name: string
}

type FillLoad = {
  base?: Fill
  look: Look
  name: string
}

export default class Fill extends Emitter {
  // how many things we've bound
  seekSize: number

  // how many things we've resolved
  haveSize: number

  takeVibe: boolean

  fill: Record<string, Record<string, Fill>>

  takeFill: Record<string, boolean>

  // parent
  base?: Fill

  bindTest: Record<string, boolean>

  sealVibe: boolean

  look: Look

  name: string

  sort?: string

  constructor({ look, base, name }: FillLoad) {
    super()
    this.name = name
    this.look = look
    this.base = base
    this.fill = {}
    this.seekSize = 0
    this.haveSize = 0
    this.takeVibe = false
    this.takeFill = {}
    this.bindTest = {}
    this.sealVibe = false
    this.seekRise()
  }

  hold(bond: Bind) {
    this.bind(bond)
    this.load(bond)
  }

  protected bind(bond: Bind) {
    if (bond instanceof BindSite && !this.bindTest[bond.code]) {
      this.bindSite(bond)

      return
    }

    if (bond instanceof BindList && !this.bindTest[bond.code]) {
      this.bindList(bond)

      return
    }

    if (bond instanceof BindSink && !this.bindTest[bond.code]) {
      this.bindSink(bond)

      return
    }

    if (bond instanceof BindHash && !this.bindTest[bond.code]) {
      this.bindHash(bond)

      return
    }
  }

  protected load(bond: Bind) {
    if (bond instanceof BindSite) {
      this.loadSite(bond)
    }

    if (bond instanceof BindList) {
      this.loadList(bond)
    }

    if (bond instanceof BindSink) {
      this.loadSink(bond)
    }
  }

  protected take() {
    if (this.takeVibe) {
      return
    }

    // console.log('take')
    // console.log(' ', this.readLink())
    // console.log('   ', 'have:', this.haveSize, 'seek:', this.seekSize)
    if (this.haveSize === this.seekSize) {
      this.takeVibe = true
      this.emit('take')
    }
  }

  protected bindSite(bond: BindSite) {
    this.bindTest[bond.code] = true

    this.sort = 'site'

    bond.on(`save`, ({ name, bond: nestBond }: SaveHook) => {
      this.holdLink(bond.code, name, nestBond)
    })

    for (const name in this.look.link) {
      this.bindSiteLink(name, bond)
    }

    // for (const name in this.look.link) {
    //   if (bond.have(name)) {
    //     const link = bond.read(name)
    //     if (link != null) {
    //       this.holdLink(bond.code, name, link)
    //     }
    //   }
    // }
  }

  protected bindSiteLink(name: string, bond: BindSite) {
    const look = this.look.link[name]
    const fillHash = (this.fill[name] ??= {})

    if (look) {
      fillHash[bond.code] ??= new Fill({
        base: this,
        look,
        name,
      })
      // this.seekRise()
    }
  }

  readLink() {
    const link: Array<string> = []
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let seed: Fill | undefined = this
    while (seed) {
      link.push(seed.name)
      seed = seed.base
    }
    return link.reverse().join('/')
  }

  protected bindList(bond: BindList) {
    this.seekRise() // for the seal on the list

    this.sort = 'list'

    this.bindTest[bond.code] = true

    bond.on(`save`, (bond: Bind) => {
      this.hold(bond)
    })

    bond.on(`seal`, () => {
      this.haveRise()
      // this.haveRise()
    })

    bond.dock.forEach(bond => {
      this.hold(bond)
    })
  }

  protected bindSink(bond: BindSink) {
    this.bindTest[bond.code] = true

    this.sort = 'sink'

    bond.on(`save`, () => {
      this.haveRise()
    })
  }

  protected bindHash(bond: BindHash) {
    this.bindTest[bond.code] = true

    this.sort = 'hash'

    bond.on(`save`, () => {
      this.haveRise()
    })
  }

  protected loadSite(bond: BindSite) {
    for (const name in this.fill) {
      if (bond.have(name)) {
        const link = bond.read(name)
        if (link != null) {
          this.loadLink(bond.code, name, link)
        }
      }
    }
  }

  testMeet() {
    return this.haveSize === this.seekSize - 1
  }

  protected loadList(bond: BindList) {
    if (bond.vibeSeal) {
      this.haveRise()
    }
    bond.dock.forEach(bond => {
      this.hold(bond)
    })
  }

  protected loadSink(bond: BindSink) {
    // console.log(
    //   'load sink',
    //   this.readLink(),
    //   this.haveSize,
    //   this.seekSize,
    // )
    this.haveRise()
  }

  protected loadLink(code: string, name: string, bond: Bind) {
    const look = this.look.link[name]
    if (!look) {
      return
    }

    const fillHash = this.fill[name]

    if (!fillHash) {
      return
    }

    const fill = fillHash[code]

    if (!fill) {
      return
    }

    fill.hold(bond)
  }

  protected holdLink(code: string, name: string, bond: Bind) {
    const look = this.look.link[name]
    if (!look) {
      return
    }

    const fillHash = this.fill[name]

    if (!fillHash) {
      return
    }

    const fill = fillHash[code]

    if (!fill) {
      return
    }

    fill.hold(bond)
  }

  protected seekRise() {
    this.seekSize++
    console.log(
      'seekRise  ',
      this.haveSize,
      this.seekSize,
      this.readLink(),
    )
    // console.log('seekRise')
    // console.log(' ', this.readLink())
    // console.log('   ', 'have:', this.haveSize, 'seek:', this.seekSize)
    this.base?.seekRise()
  }

  protected haveRise() {
    // console.log(
    //   // new Error().stack,
    //   'haveRise2',
    //   this.haveSize,
    //   this.seekSize,
    //   this.readLink(),
    //   this.takeVibe,
    // )
    if (this.takeVibe) {
      return
    }

    this.haveSize++

    console.log(
      // new Error().stack,
      'haveRise',
      this.haveSize,
      this.seekSize,
      this.readLink(),
    )

    this.take()
    this.base?.haveRise()

    if (this.haveSize === this.seekSize - 1) {
      this.haveRise()
      return
    }

    // if (this.sort === 'list' && this.haveSize === this.seekSize - 1) {
    //   console.log('ere')
    //   this.haveRise()
    // }
  }
}

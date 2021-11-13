
const host = typeof window == 'undefined' ? global : window

class Site {
  constructor(head, link) {
    this.head = head
    this.link = link
    this.file = undefined
    this.mesh = {}
  }
}

class Fork {
  constructor(base, home, mark) {
    this.mark = mark
    this.base = base
    this.home = home || base.home
    this.head = {}
  }

  fork(name, home) {
    const fork = new Fork(this, home, name)
    this.head[name] = fork
    return fork
  }

  save(name, blob) {
    const form = typeof blob
    this.head[name] = {
      form,
      blob
    }
    return blob
  }

  read(...road) {
    let stem = this
    let i = 0
    while (i < road.length) {
      const name = road[i++]
      stem = stem.head[name]
    }
    return stem
  }
}

class File extends Fork {
  bind(task) {
    this.host = task
  }
}

class Base {
  constructor() {
    this.mesh = {}
  }

  load(road) {
    const list = road.split('/')
    let size = 0
    let mesh = this.mesh
    let site
    while (size < list.length) {
      const link = list[size]
      site = mesh[link] = mesh[link] || new Site(site, link)
      mesh = site.mesh
      size++
    }

    let file = site.file
    if (!file) {
      site.file = file = new File()
      file.save('road', road)
    }

    return file
  }

  bind(road, task) {
    task(this.load(road))
    return this
  }

  link(road) {
    const file = this.load(road)
    if (file.host) file.host()
  }

  free(road) {
    const list = road.split('/')
    let size = 0
    let mesh = this.mesh
    let site
    while (size < list.length) {
      const link = list[size]
      site = mesh[link]
      if (site) {
        mesh = site.mesh
        size++
      } else {
        break
      }
    }
    while (site) {
      const head = site.head
      delete head.mesh[site.link]
      if (!Object.keys(head.mesh).length) {
        site = head
      } else {
        break
      }
    }
  }
}

host.base = new Base

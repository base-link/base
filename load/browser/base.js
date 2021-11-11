
const host = typeof window == 'undefined' ? global : window

class Site {
  constructor(head, link) {
    this.head = head
    this.link = link
    this.file = undefined
    this.mesh = {}
  }
}

class File {
  constructor(road) {
    this.road = road
  }

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
    const file = site.file = site.file || new File(road)
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
base.bind('@drumwork/dock/code/javascript/module', file => {
  file.task = {}

  file.task.require = function(path){
    return require(path)
  }
})

base.bind('@drumwork/base/code/dock/browser', file => {
  const x1 = base.load('@drumwork/dock/code/javascript/module')
  let x1_1

  file.task = {}

  file.task.make_base = function(){
    return rise_base.make()
  }

  file.task.make = function(type){
    return rise_make.make(type)
  }

  file.task.bind_view = function(list, base){
    rise_mesh.bind(list, base)
  }

  file.task.draw_view = function(mesh){
    rise_mesh.draw(mesh)
  }

  file.task.create_mesh = function(view){
    return rise_mesh.createMesh(view)
  }
  rise_mesh = require(
    '@drumwork/rise.browser.js/view/mesh'
  )
  rise_make = require(
    '@drumwork/rise.browser.js/make'
  )
  rise_base = require(
    '@drumwork/rise.browser.js/base'
  )

  file.bind(() => {
    x1_1 = x1.task.require
  })
})

base.bind('@drumwork/dock/code/javascript/console', file => {
  file.task = {}

  file.task.assert = function(assertion, obj1, msg, subst1){
    console.assert(assertion, obj1, msg, subst1)
  }

  file.task.clear = function(){
    console.clear()
  }

  file.task.count = function(label){
    console.count(label)
  }

  file.task.count_reset = function(label){
    console.countReset(label)
  }

  file.task.debug = function(obj1, msg, subst1){
    console.debug(obj1, msg, subst1)
  }

  file.task.dir = function(object){
    console.dir(object)
  }

  file.task.dirxml = function(object){
    console.dirxml(object)
  }

  file.task.error = function(obj1, msg, subst1){
    console.error(obj1, msg, subst1)
  }

  file.task.group = function(label){
    console.group(label)
  }

  file.task.group_collapsed = function(label){
    console.groupCollapsed(label)
  }

  file.task.group_end = function(){
    console.groupEnd()
  }

  file.task.info = function(obj1, msg, subst1){
    console.info(obj1, msg, subst1)
  }

  file.task.log = function(message){
    console.log(message)
  }

  file.task.table = function(data, columns){
    console.table(data, columns)
  }

  file.task.time = function(label){
    console.time(label)
  }

  file.task.time_end = function(label){
    console.timeEnd(label)
  }

  file.task.time_log = function(label){
    console.timeLog(label)
  }

  file.task.trace = function(any){
    console.trace(any)
  }

  file.task.warn = function(obj1, msg, subst1){
    console.warn(obj1, msg, subst1)
  }
})

base.bind('@drumwork/base/test/view/example', file => {
  file.view = {}

  file.view.h1 = {
    form: 'view',
    name: 'h1',
    base: [],
    bond: [],
    hook: [],
    zone: [],
    task: []
  }

  file.view.example = {
    form: 'view',
    name: 'example',
    base: [],
    bond: [],
    hook: [],
    zone: [
      {
        form: 'mesh',
        name: 'h1',
        bind: [
          {
            form: 'bind',
            name: 'fill',
            sift: {
              form: 'sift-text',
              text: '#ff0000'
            }
          },
          {
            form: 'bind',
            name: 'text-fill',
            sift: {
              form: 'sift-text',
              text: 'white'
            }
          },
          {
            form: 'bind',
            name: 'text',
            sift: {
              form: 'sift-text',
              text: 'hello world'
            }
          }
        ],
        vibe: [
          {
            form: 'vibe',
            name: 'hover',
            bind: [
              {
                form: 'bind',
                name: 'fill',
                sift: {
                  form: 'sift-text',
                  text: '#00ff00'
                }
              }
            ],
            hook: []
          }
        ],
        zone: [],
        hook: [
          {
            form: 'hook',
            name: 'click',
            base: [
              {
                form: 'task-base',
                name: 'event'
              }
            ],
            zone: [
              {
                form: 'call',
                name: 'log',
                wait: false,
                bind: [
                  {
                    form: 'bind',
                    name: 'message',
                    sift: {
                      form: 'link',
                      nest: {
                        form: 'nest',
                        stem: [
                          {
                            form: 'term',
                            name: 'event'
                          }
                        ]
                      }
                    }
                  }
                ],
                zone: [],
                hook: []
              }
            ]
          }
        ]
      }
    ],
    task: []
  }

  file.bind(() => {
    file.view.example.zone[0].case = file.view.h1
  })
})

base.bind('@drumwork/base/test/task/view', file => {
  const x1 = base.load('@drumwork/base/test/view/example')
  const x2 = base.load('@drumwork/dock/code/javascript/console')
  const x3 = base.load('@drumwork/base/code/dock/browser')
  const x4 = base.load('@drumwork/base/code/dock/browser')
  let x1_1
  let x2_1
  let x3_1
  let x3_2
  let x3_3
  let x3_4
  let x4_1

  file.task = {}

  file.task.mount_example_view = function(){
    b = x3_1(

    )
    frag = x4_1(
      x1_1
    )
    x2_1(
      frag
    )
    x3_3(
      frag,
      b
    )
    x3_4(
      frag
    )
    x2_1(
      'done'
    )
  }

  file.bind(() => {
    x1_1 = x1.view.example
    x2_1 = x2.task.log
    x3_1 = x3.task.make_base
    x3_2 = x3.task.load_view
    x3_3 = x3.task.bind_view
    x3_4 = x3.task.draw_view
    x4_1 = x4.task.make
  })
})

base.bind('@drumwork/base/test/dock/browser', file => {
  const x1 = base.load('@drumwork/base/test/task/view')
  let x1_1

  file.bind(() => {
    x1_1 = x1.task.mount_example_view
    x1_1()
  })
})

base.link('@drumwork/base/code/dock/browser')
base.link('@drumwork/base/test/view/example')
base.link('@drumwork/base/test/task/view')
base.link('@drumwork/base/test/dock/browser')


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
base.bind('@drumwork/base/test/dock/node', file => {
  const x1 = base.load('@drumwork/base/test/task')

  file.bind(function(){
    x1.task.test_fibonacci_loop()
  })
})

base.bind('@drumwork/base/test/task', file => {
  const x1 = base.load('@drumwork/dock/code/javascript/number')
  const x2 = base.load('@drumwork/dock/code/javascript/base')
  const x3 = base.load('@drumwork/dock/code/javascript/console')
  const x4 = base.load('@drumwork/dock/code/javascript/object')
  const x5 = base.load('@drumwork/dock/code/javascript/error')
  const x6 = base.load('@drumwork/base/code/dock/node/file')
  const x7 = base.load('@drumwork/base/code/host/form')

  file.task = {}

  file.task.assert_equal = function(base, head){
    x2.task.check_if_strictly_equal(
      base,
      head
    )
  }

  file.task.find_fibonacci_via_loop = function(i){
    let g = 0
    let o = 1
    let d
    x2.task.walk(
      function(){
        return x2.task.check_gt(
          i,
          0
        )
      },
      function(){
        d = o
        o = x1.task.add(
          g,
          d
        )
        g = d
        i = x1.task.decrement(
          i
        )
      }
    )
    return g
  }

  file.task.find_fibonacci_via_recursion = function(i, g, o){
    if (g == null) {
      g = 0
    }

    if (o == null) {
      o = 1
    }

    return x2.task.check_else(
      function(){
        return x2.task.check_if_strictly_equal(
          i,
          0
        )
      },
      function(){
        return g
      },
      function(){
        d = x1.task.subtract(
          i,
          1
        )
        t = x1.task.add(
          o,
          g
        )
        return file.task.find_fibonacci_via_recursion(
          d,
          o,
          t
        )
      }
    )
  }

  file.task.test_fibonacci_loop = async function(){
    o = file.task.find_fibonacci_via_loop(
      7
    )
    x3.task.log(
      o
    )
    x = file.task.find_fibonacci_via_recursion(
      7
    )
    x3.task.log(
      x
    )
    x = x4.task.create(

    )
    x2.task.set_field(
      x,
      'foo',
      'bar'
    )
    x2.task.set_field(
      x,
      'x',
      o
    )
    x.y = x2.task.shift_left(
      o,
      5
    )
    x3.task.log(
      x
    )
    content = await x6.task.read(
      'deck.link',
      'utf-8'
    )
    x3.task.log(
      content
    )
  }
})

base.bind('@drumwork/dock/code/javascript/number', file => {
  file.task = {}

  file.task.parse_decimal = function(string){
    return window.parseFloat(string)
  }

  file.task.parse_int = function(string){
    return window.parseInt(string)
  }

  file.task.parse_number = function(value){
    return window.Number(value)
  }

  file.task.get_max = function(start, end){
    return Math.max(start, end)
  }

  file.task.get_min = function(start, end){
    return Math.max(start, end)
  }

  file.task.floor = function(number){
    return Math.floor(number)
  }

  file.task.ceil = function(number){
    return Math.ceil(number)
  }

  file.task.round = function(number){
    return Math.round(number)
  }

  file.task.get_abs = function(number){
    return Math.abs(number)
  }

  file.task.get_cos = function(number){
    return Math.cos(number)
  }

  file.task.get_acos = function(number){
    return Math.acos(number)
  }

  file.task.get_sin = function(number){
    return Math.sin(number)
  }

  file.task.get_asin = function(number){
    return Math.asin(number)
  }

  file.task.get_tan = function(number){
    return Math.tan(number)
  }

  file.task.get_atan = function(number){
    return Math.atan(number)
  }

  file.task.get_atan2 = function(number){
    return Math.atan2(number)
  }

  file.task.get_log = function(number){
    return Math.log(number)
  }

  file.task.get_sqrt = function(number){
    return Math.sqrt(number)
  }

  file.task.add = function(left, right){
    return left + right
  }

  file.task.subtract = function(left, right){
    return left - right
  }

  file.task.multiply = function(left, right){
    return left * right
  }

  file.task.divide = function(left, right){
    return left / right
  }

  file.task.modulus = function(left, right){
    return left % right
  }

  file.task.get_exponent = function(left, right){
    return left ** right
  }

  file.task.increment = function(value){
    return ++value
  }

  file.task.decrement = function(value){
    return --value
  }

  file.task.check_if_not_number = function(value){
    return window.isNaN(value)
  }

  file.task.get_random = function(){
    return Math.random()
  }

  file.task.loop = function(start, end, step){
    undefined
  }
})

base.bind('@drumwork/dock/code/javascript/base', file => {
  file.task = {}

  file.task.walk = function(check, block){
    while (check()) {
      block()
    }
  }

  file.task.check = function(check, block){
    if (check()) {
      return block()
    }
  }

  file.task.check_else = function(check, block, other){
    if (check()) {
      return block()
    } else {
      return other()
    }
  }

  file.task.debug_function = function(func){
    window.debug(func)
  }

  file.task.debug = function(){
    debugger
  }

  file.task.queue = function(func){
    window.setImmediate(func)
  }

  file.task.compute_bitwise_or = function(left, right){
    return left | right
  }

  file.task.check_if_equal = function(left, right){
    return left == right
  }

  file.task.check_if_null = function(value){
    return value == null
  }

  file.task.check_if_strictly_equal = function(left, right){
    return left === right
  }

  file.task.get_typeof = function(value){
    return typeof value
  }

  file.task.get_instanceof = function(left, right){
    return left instanceof right
  }

  file.task.set_field = function(object, attribute, value){
    object[attribute] = value
  }

  file.task.get_field = function(object, attribute){
    return object[attribute]
  }

  file.task.remove_field = function(object, attribute){
    delete object[attribute]
  }

  file.task.shift_left = function(left, right){
    return left << right
  }

  file.task.shift_right = function(left, right){
    return left >> right
  }

  file.task.shift_right_unsigned = function(left, right){
    return left >>> right
  }

  file.task.compute_bitwise_and = function(left, right){
    return left & right
  }

  file.task.check_or = function(left, right){
    return left || right
  }

  file.task.try_catch = function(block, error){
    try {
      block()
    } catch (e) {
      error(e)
    }
  }

  file.task.check_if_truthy = function(value){
    return !!value
  }

  file.task.check_opposite = function(value){
    return !value
  }

  file.task.check_not_equal = function(left, right){
    return left !== right
  }

  file.task.flip_block = function(value){
    return ~value
  }

  file.task.check_gt = function(left, right){
    return left > right
  }

  file.task.check_lt = function(left, right){
    return left < right
  }

  file.task.check_gte = function(left, right){
    return left > right
  }

  file.task.check_lte = function(left, right){
    return left < right
  }

  file.task.check_and = function(left, right){
    return left && right
  }
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

base.bind('@drumwork/dock/code/javascript/object', file => {
  file.task = {}

  file.task.create = function(){
    return {}
  }

  file.task.check_if_has_property = function(object, property){
    return object.hasOwnProperty(property)
  }

  file.task.stringify_json = function(object){
    return JSON.stringify(object)
  }

  file.task.parse_json = function(string){
    return JSON.parse(string)
  }

  file.task.get_keys = function(object){
    return Object.keys(object)
  }

  file.task.get_values = function(object){
    return Object.values(object)
  }
})

base.bind('@drumwork/dock/code/javascript/error', file => {
  const x1 = base.load('../string')

  file.task = {}

  file.task.create = function(message){
    return new Error(message)
  }

  file.task.get_stack = function(error){
    return undefined
  }

  file.task.throw = function(message){
    undefined
  }
})

base.bind('@drumwork/base/code/dock/node/file', file => {
  const x1 = base.load('@drumwork/dock/code/node/fs')
  const x2 = base.load('@drumwork/dock/code/javascript/promise')
  const x3 = base.load('@drumwork/dock/code/javascript/module')
  const x4 = base.load('@drumwork/dock/code/javascript/base')

  file.task = {}

  file.task.read = function(name, encoding){
    let fs
    fs = x3.task.require(
      'fs'
    )
    return x2.task.make(
      function handle(resolve, reject){
        x1.task.read_file(
          fs,
          name,
          encoding,
          function handle(error, data){
            x4.task.check_else(
              function(){
                return x4.task.check_if_null(
                  error
                )
              },
              function(){
                resolve(
                  data
                )
              },
              function(){
                reject(
                  error
                )
              }
            )
          }
        )
      }
    )
  }
})

base.bind('@drumwork/base/code/host/form/bind', file => {
  const x1 = base.load('@drumwork/base/code/host/form/term')
  const x2 = base.load('@drumwork/base/code/host/form/sift')

  file.form = {}

  file.form.bind = {
    name: 'bind',
    base: {
      term: {
        form: 'base',
        name: 'term',
        case: {
          form: 'form',
          name: 'term'
        }
      },
      sift: {
        form: 'base',
        name: 'sift',
        case: {
          form: 'form',
          name: 'sift'
        }
      }
    }
  }

  file.bind(function(){
    file.form.bind.base['term'].case.bind = x1.form.term
    file.form.bind.base['sift'].case.bind = x2.form.sift
  })
})

base.bind('@drumwork/base/code/host/form/term', file => {
  file.form = {}

  file.form.term = {
    name: 'term',
    base: {
      text: {
        form: 'base',
        name: 'text',
        case: {
          form: 'form',
          name: 'text'
        }
      }
    }
  }

  file.bind(function(){
    file.form.term.base['text'].case.bind = file.form.text
  })
})

base.bind('@drumwork/base/code/host/form/sift', file => {
  const x1 = base.load('@drumwork/base/code/host/form/call')
  const x2 = base.load('@drumwork/base/code/host/form/task')
  const x3 = base.load('@drumwork/base/code/host/form/link')

  file.form = {}

  file.form.sift = {
    name: 'sift',
    case: {
      call: {
        form: 'case',
        name: 'call'
      },
      task: {
        form: 'case',
        name: 'task'
      },
      form: {
        form: 'case',
        name: 'form'
      },
      link: {
        form: 'case',
        name: 'link'
      }
    }
  }

  file.form.link = {
    name: 'link',
    base: {
      road: {
        form: 'base',
        name: 'road'
      }
    }
  }

  file.form.read = {
    name: 'read',
    base: {
      road: {
        form: 'base',
        name: 'road'
      }
    }
  }

  file.form.move = {
    name: 'move',
    base: {
      road: {
        form: 'base',
        name: 'road'
      }
    }
  }

  file.form.loan = {
    name: 'loan',
    base: {
      road: {
        form: 'base',
        name: 'road'
      }
    }
  }
})

base.bind('@drumwork/base/code/host/form/call', file => {
  const x1 = base.load('@drumwork/base/code/host/form/bind')
  const x2 = base.load('@drumwork/base/code/host/form/task')

  file.form = {}

  file.form.call = {
    name: 'call',
    base: {
      name: {
        form: 'base',
        name: 'name',
        case: {
          form: 'form',
          name: 'term'
        }
      },
      bind: {
        form: 'base',
        name: 'bind',
        case: {
          form: 'list',
          name: 'bind'
        }
      },
      flow: {
        form: 'base',
        name: 'flow',
        case: {
          form: 'list',
          name: 'call-flow'
        }
      },
      hook: {
        form: 'base',
        name: 'hook',
        case: {
          form: 'list',
          name: 'hook'
        }
      }
    }
  }

  file.form.hook = {
    name: 'hook',
    base: {
      name: {
        form: 'base',
        name: 'name',
        case: {
          form: 'form',
          name: 'term'
        }
      },
      band: {
        form: 'base',
        name: 'band',
        case: {
          form: 'form',
          name: 'term'
        }
      },
      base: {
        form: 'base',
        name: 'base',
        case: {
          form: 'list',
          name: 'base'
        }
      },
      flow: {
        form: 'base',
        name: 'flow',
        case: {
          form: 'list',
          name: 'task-flow'
        }
      },
      task: {
        form: 'base',
        name: 'task',
        case: {
          form: 'list',
          name: 'task'
        }
      }
    }
  }

  file.form.flow = {
    name: 'flow',
    case: {
      call: {
        form: 'case',
        name: 'call'
      },
      save: {
        form: 'case',
        name: 'save'
      },
      turn: {
        form: 'case',
        name: 'turn'
      }
    }
  }

  file.form.save = {
    name: 'save',
    base: {
      road: {
        form: 'base',
        name: 'road',
        case: {
          form: 'form',
          name: 'road'
        }
      }
    }
  }

  file.form.turn = {
    name: 'turn',
    base: {
      term: {
        form: 'base',
        name: 'term',
        case: {
          form: 'form',
          name: 'term'
        }
      }
    }
  }

  file.bind(function(){
    file.form.call.base['name'].case.bind = file.form.term
    file.form.call.base['bind'].case.bind = x1.form.bind
    file.form.call.base['flow'].case.bind = file.form.call_flow
    file.form.call.base['hook'].case.bind = file.form.hook
    file.form.hook.base['name'].case.bind = file.form.term
    file.form.hook.base['band'].case.bind = file.form.term
    file.form.hook.base['base'].case.bind = x2.form.base
    file.form.hook.base['flow'].case.bind = x2.form.flow
    file.form.hook.base['task'].case.bind = file.form.task
    file.form.save.base['road'].case.bind = file.form.road
    file.form.turn.base['term'].case.bind = file.form.term
  })
})

base.bind('@drumwork/base/code/host/form/task', file => {
  const x1 = base.load('@drumwork/base/code/host/form/call')

  file.form = {}

  file.form.flow_seat = {
    name: 'flow-seat',
    case: {
      call: {
        form: 'case',
        name: 'call',
        case: {
          form: 'form',
          name: 'call'
        }
      },
      save: {
        form: 'case',
        name: 'save'
      }
    }
  }

  file.form.task = {
    name: 'task',
    base: {
      name: {
        form: 'base',
        name: 'name',
        case: {
          form: 'form',
          name: 'term'
        }
      },
      head: {
        form: 'base',
        name: 'head',
        case: {
          form: 'list',
          name: 'head'
        }
      },
      base: {
        form: 'base',
        name: 'base',
        case: {
          form: 'list',
          name: 'base'
        }
      },
      flow: {
        form: 'base',
        name: 'flow',
        case: {
          form: 'form',
          name: 'list'
        }
      },
      task: {
        form: 'base',
        name: 'task',
        case: {
          form: 'list',
          name: 'task'
        }
      }
    }
  }

  file.form.head = {
    name: 'head',
    base: {
      name: {
        form: 'base',
        name: 'name',
        case: {
          form: 'form',
          name: 'term'
        }
      },
      'head-form': {
        form: 'base',
        name: 'head-form',
        case: {
          form: 'form',
          name: 'form'
        }
      },
      fall: {
        form: 'base',
        name: 'fall',
        case: {
          form: 'form',
          name: 'task'
        }
      }
    }
  }

  file.form.base = {
    name: 'base',
    base: {
      name: {
        form: 'base',
        name: 'name',
        case: {
          form: 'form',
          name: 'term'
        }
      },
      'base-form': {
        form: 'base',
        name: 'base-form',
        case: {
          form: 'form',
          name: 'form'
        }
      },
      fall: {
        form: 'base',
        name: 'fall',
        case: {
          form: 'form',
          name: 'task'
        }
      }
    }
  }

  file.bind(function(){
    file.form.flow_seat.case['call'].case.bind = x1.form.call
    file.form.task.base['name'].case.bind = file.form.term
    file.form.task.base['head'].case.bind = file.form.head
    file.form.task.base['base'].case.bind = file.form.base
    file.form.task.base['flow'].case.bind = file.form.list
    file.form.task.base['task'].case.bind = file.form.task
    file.form.head.base['name'].case.bind = file.form.term
    file.form.head.base['head-form'].case.bind = file.form.form
    file.form.head.base['fall'].case.bind = file.form.task
    file.form.base.base['name'].case.bind = file.form.term
    file.form.base.base['base-form'].case.bind = file.form.form
    file.form.base.base['fall'].case.bind = file.form.task
  })
})

base.bind('@drumwork/base/code/host/form/link', file => {
  file.form = {}

  file.form.link = {
    name: 'link'
  }
})

base.bind('@drumwork/dock/code/javascript/string', file => {
  file.task = {}

  file.task.replace = function(string, pattern, replacer){
    return string.replace(pattern, replacer)
  }

  file.task.trim = function(string){
    return string.trim()
  }

  file.task.get_char_code_at = function(string, index){
    return string.charCodeAt(index)
  }

  file.task.get_char_at = function(string, index){
    return string.charAt(index)
  }

  file.task.get_char_from_code = function(code){
    return String.fromCharCode(code)
  }

  file.task.get_char_from_code_point = function(code){
    return String.fromCodePoint(code)
  }

  file.task.convert_to_lowercase = function(string){
    return string.toLowerCase()
  }

  file.task.convert_to_uppercase = function(string){
    return string.toUpperCase()
  }

  file.task.create = function(){
    return ''
  }

  file.task.match = function(string, pattern){
    return string.match(pattern)
  }

  file.task.create_collator = function(){
    new Intl.Collator()
  }

  file.task.get_collator_comparator = function(collator){
    undefined
  }

  file.task.split = function(string, pattern){
    return string.split(pattern)
  }

  file.task.check_starts_with = function(string, pattern){
    return string.startsWith(pattern)
  }

  file.task.check_ends_with = function(string, pattern){
    return string.endsWith(pattern)
  }

  file.task.pad_start = function(string, pad_size, pad_string){
    return string.padStart(pad_size, pad_string)
  }
})

base.bind('@drumwork/dock/code/node/fs', file => {
  file.task = {}

  file.task.write_file = function(fs, path, content, encoding, callback){
    fs.writeFile(path, content, encoding, callback)
  }

  file.task.read_file = function(fs, path, encoding, callback){
    fs.readFile(path, encoding, callback)
  }

  file.task.append_file = function(fs, path, data, callback){
    fs.appendFile(path, data, callback)
  }

  file.task.change_mode = function(fs, path, mode, callback){
    fs.chmod(path, mode, callback)
  }

  file.task.change_owner = function(fs, path, uid, gid, callback){
    fs.chown(path, uid, gid, callback)
  }

  file.task.copy_file = function(fs, src, dest, mode, callback){
    fs.copyFile(src, dest, mode, callback)
  }

  file.task.create_read_stream = function(fs, path, options){
    fs.createReadStream(path, options)
  }

  file.task.create_write_stream = function(fs, path, options){
    fs.createWriteStream(path, options)
  }

  file.task.build_directory = function(fs, path, options, callback){
    fs.mkdir(path, options, callback)
  }

  file.task.read_directory = function(fs, path, options, callback){
    fs.readdir(path, options, callback)
  }

  file.task.rename = function(fs, old_path, new_path, callback){
    fs.rename(old_path, new_path, callback)
  }

  file.task.clear_directory = function(fs, path, options, callback){
    fs.rmdir(path, options, callback)
  }

  file.task.stat = function(fs, path, options, callback){
    fs.stat(path, options, callback)
  }

  file.task.truncate = function(fs, path, size, callback){
    fs.truncate(path, size, callback)
  }

  file.task.unlink = function(fs, path, callback){
    fs.unlink(path, callback)
  }
})

base.bind('@drumwork/dock/code/javascript/promise', file => {
  file.task = {}

  file.task.make = function(hook){
    return new Promise(hook)
  }

  file.task.call_all = function(array){
    return Promise.all(array)
  }
})

base.bind('@drumwork/dock/code/javascript/module', file => {
  file.task = {}

  file.task.require = function(path){
    return require(path)
  }
})

base.link('@drumwork/base/test/dock/node')
base.link('@drumwork/base/code/host/form/bind')
base.link('@drumwork/base/code/host/form/term')
base.link('@drumwork/base/code/host/form/sift')
base.link('@drumwork/base/code/host/form/call')
base.link('@drumwork/base/code/host/form/task')
base.link('@drumwork/base/code/host/form/link')

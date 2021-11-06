
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

  call(road) {
    const file = this.load(road)
    if (file.base) file.base()
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

base.bind('@drumwork/base/test', file => {
  const x1 = base.load('@drumwork/base/test/task')
  const x2 = base.load('@drumwork/dock/code/browser/binding/document')
  file.base = function(){
    x1.task.test_fibonacci_loop()
  }
})

base.bind('@drumwork/base/test/task', file => {
    file.task = file.task || {}
    const x1 = base.load('@drumwork/dock/code/javascript/binding/number')
    const x2 = base.load('@drumwork/dock/code/javascript/binding/base')
    const x3 = base.load('@drumwork/dock/code/javascript/binding/console')
    
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
      return x2.task.check_else(
        i,
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
    
    file.task.test_fibonacci_loop = function(){
      o = file.task.find_fibonacci_via_loop(
        7
      )
      x3.task.log(
        o
      )
      file.task.assert_equal(
        13,
        o
      )
    }
})

base.bind('@drumwork/dock/code/browser/binding/document', file => {
    file.task = file.task || {}
    file.task.build_document = function(){
      return new Document()
    }
    file.task.get_body = function(build){
      return undefined
    }
    file.task.set_body = function(build, value){
      undefined
    }
    file.task.get_character_set = function(build){
      return undefined
    }
    file.task.get_compat_mode = function(build){
      return undefined
    }
    file.task.get_content_type = function(build){
      return undefined
    }
    file.task.get_doctype = function(build){
      return undefined
    }
    file.task.get_document_element = function(build){
      return undefined
    }
    file.task.get_document_uri = function(build){
      return undefined
    }
    file.task.get_embeds = function(build){
      return undefined
    }
    file.task.get_fonts = function(build){
      return undefined
    }
    file.task.set_fonts = function(build, value){
      undefined
    }
    file.task.get_forms = function(build){
      return undefined
    }
    file.task.get_head = function(build){
      return undefined
    }
    file.task.get_hidden = function(build){
      return undefined
    }
    file.task.get_images = function(build){
      return undefined
    }
    file.task.get_implementation = function(build){
      return undefined
    }
    file.task.get_links = function(build){
      return undefined
    }
    file.task.get_moz_synthetic_document = function(build){
      return undefined
    }
    file.task.set_moz_synthetic_document = function(build, value){
      undefined
    }
    file.task.get_picture_in_picture_enabled = function(build){
      return undefined
    }
    file.task.get_plugins = function(build){
      return undefined
    }
    file.task.get_feature_policy = function(build){
      return undefined
    }
    file.task.get_scripts = function(build){
      return undefined
    }
    file.task.get_scrolling_element = function(build){
      return undefined
    }
    file.task.get_timeline = function(build){
      return undefined
    }
    file.task.get_undo_manager = function(build){
      return undefined
    }
    file.task.get_visibility_state = function(build){
      return undefined
    }
    file.task.adopt_node = function(build, external_node){
      return build.adoptNode(external_node)
    }
    file.task.create_attribute = function(build){
      return build.createAttribute()
    }
    file.task.create_attribute_ns = function(build){
      return build.createAttributeNS()
    }
    file.task.create_cdata_section = function(build){
      return build.createCDATASection()
    }
    file.task.create_comment = function(build, data){
      return build.createComment(data)
    }
    file.task.create_document_fragment = function(build){
      return build.createDocumentFragment()
    }
    file.task.create_element = function(build, tag_name, options){
      return build.createElement(tag_name, options)
    }
    file.task.create_element_ns = function(build, namespace_uri, qualified_name, options, options){
      return build.createElementNS(namespace_uri, qualified_name, options, options)
    }
    file.task.create_event = function(build){
      return build.createEvent()
    }
    file.task.create_node_iterator = function(build){
      return build.createNodeIterator()
    }
    file.task.create_processing_instruction = function(build){
      return build.createProcessingInstruction()
    }
    file.task.create_range = function(build){
      return build.createRange()
    }
    file.task.create_text_node = function(build){
      return build.createTextNode()
    }
    file.task.create_tree_walker = function(build, root, what_to_show, filter, entity_reference_expansion){
      return build.createTreeWalker(root, what_to_show, filter, entity_reference_expansion)
    }
    file.task.exit_picture_in_picture = function(build){
      return build.exitPictureInPicture()
    }
    file.task.get_elements_by_class_name = function(build){
      return build.getElementsByClassName()
    }
    file.task.get_elements_by_tag_name = function(build){
      return build.getElementsByTagName()
    }
    file.task.get_elements_by_tag_name_ns = function(build){
      return build.getElementsByTagNameNS()
    }
    file.task.import_node = function(build, external_node, deep){
      return build.importNode(external_node, deep)
    }
    file.task.request_storage_access = function(build){
      return build.requestStorageAccess()
    }
})

base.bind('@drumwork/dock/code/javascript/binding/number', file => {
    file.task = file.task || {}
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

base.bind('@drumwork/dock/code/javascript/binding/base', file => {
    file.task = file.task || {}
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
      return left < right
    }
    file.task.shift_right = function(left, right){
      return left > right
    }
    file.task.shift_right_unsigned = function(left, right){
      return left > right
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

base.bind('@drumwork/dock/code/javascript/binding/console', file => {
    file.task = file.task || {}
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

base.call('@drumwork/base/test')
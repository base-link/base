
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

base.load('@drumwork/base/test', file => {
  {"form":"term","name":"task","link":[{"form":"term","name":"test-fibonacci-loop","link":[]}]} = base.link('@drumwork/base/test/task')
  test_fibonacci_loop()
})

base.load('@drumwork/base/test/task', file => {
    file.task = file.task || {}
    {"form":"term","name":"task","link":[{"form":"term","name":"add","link":[]}]} = base.link('@drumwork/dock/code/javascript/binding/number')
    {"form":"term","name":"task","link":[{"form":"term","name":"subtract","link":[]}]} = base.link('@drumwork/dock/code/javascript/binding/number')
    {"form":"term","name":"task","link":[{"form":"term","name":"decrement","link":[]}]} = base.link('@drumwork/dock/code/javascript/binding/number')
    file.test-fibonacci-loop = function(){
      o = find-fibonacci-via-loop(
      
      )
    }
    file.find-fibonacci-via-loop = function(i){
      undefinedwalk(
      
      )
    }
    file.find-fibonacci-via-recursion = function(
      i,
      g,
      o
    ){
    }
})

base.load('@drumwork/dock/code/javascript/binding/number', file => {
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
      return value++
    }
    file.task.decrement = function(value){
      return value--
    }
    file.task.check_if_not_number = function(value){
      return window.isNaN(value)
    }
    file.task.get_random = function(){
      return Math.random()
    }
    file.task.loop = function(start, end, step){
      undefinedundefined
    }
})
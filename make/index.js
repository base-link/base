
const fs = require('fs')
const muse = require('./muse')
const readText = require('./read')
const makeTree = require('./read/tree')
const mintDeckFile = require('./mint/file/deck')
const mintCallFile = require('./mint/file/call')
const mintTaskFile = require('./mint/file/task')
const mintFormFile = require('./mint/file/form')
const mintTestFile = require('./mint/file/test')
const mintViewFile = require('./mint/file/view')
const makeText = require('./text')
const pathResolver = require('path')

const MINT = {
  'dock-task-file': makeTaskFile,
  'task-file': makeTaskFile,
  'form-file': makeFormFile,
  'view-file': makeViewFile,
}

module.exports = make

function make(base, ROAD_TO_MINT, dock) {
  const deck = {}
  const file = deck[base] = makeTestFile(base)
  file.mint = 'test-file'
  load(deck[base], deck, ROAD_TO_MINT)
  muse(file)
  const text = makeText(file, deck)
  save(dock, text)
}

function load(file, deck, ROAD_TO_MINT) {
  const roadList = makeRoad(file)
  file.loadList = []
  roadList.forEach(road => {
    const [host, name, ...rest] = road.split('/')
    if (!deck[road]) {
      const mint = ROAD_TO_MINT[road]
      if (!MINT[mint]) {
        throw `${mint} - ${road}`
      }
      deck[road] = MINT[mint](road)
      deck[road].mint = mint
      load(deck[road], deck, ROAD_TO_MINT)
    }
  })
}

function makeRoad(file, list = []) {
  file.load.forEach(load => {
    makeLoadRoad(file.road, load, list)
  })
  return list
}

function makeLoadRoad(baseRoad, load, list) {
  if (load.road.match(/^@/)) {
    if (load.take.length) {
      list.push(load.road)
    } else {
      const road = load.road
      load.load.forEach(load => {
        makeLoadRoad(road, load, list)
      })
    }
  } else {
    const road = pathResolver.join(baseRoad, load.road)
    if (load.take.length) {
      list.push(road)
    } else {
      load.load.forEach(load => {
        makeLoadRoad(road, load, list)
      })
    }
  }
}

function save(name, text) {
  if (!fs.existsSync(`load/${name}`)) {
    fs.mkdirSync(`load/${name}`)
  }
  fs.writeFileSync(`load/${name}/base.js`, text)
}

function makeViewFile(road) {
  const [host, name, ...rest] = road.split('/')
  const text = readFile(`../${name}/${rest.join('/')}/base.link`)
  const line = readText(text)
  const tree = makeTree(line, road.replace(/\//g, '-'))
  const file = mintViewFile(road, tree)
  file.text = text
  return file
}

function makeTestFile(road) {
  const [host, name, ...rest] = road.split('/')
  const text = readFile(`../${name}/${rest.join('/')}/base.link`)
  const line = readText(text)
  const tree = makeTree(line, road.replace(/\//g, '-'))
  const file = mintTestFile(road, tree)
  file.text = text
  return file
}

function makeFormFile(road) {
  const [host, name, ...rest] = road.split('/')
  const text = readFile(`../${name}/${rest.join('/')}/base.link`)
  const line = readText(text)
  const tree = makeTree(line, road.replace(/\//g, '-'))
  const file = mintFormFile(road, tree)
  return file
}

function makeCallFile(road) {
  const text = readFile(`./${road}/base.link`)
  const line = readText(text)
  const tree = makeTree(line, road.replace(/\//g, '-'))
  const file = mintCallFile(road, tree)
}

function makeTaskFile(road) {
  const [host, name, ...rest] = road.split('/')
  const text = readFile(`../${name}/${rest.join('/')}/base.link`)
  const line = readText(text)
  const tree = makeTree(line, road.replace(/\//g, '-'))
  const file = mintTaskFile(road, tree)
  return file
}

function readFile(road) {
  return fs.readFileSync(road, 'utf-8');
}

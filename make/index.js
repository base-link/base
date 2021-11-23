
const fs = require('fs')
const muse = require('./muse')
const makeTree = require('@lancejpollard/link-parser.js')
const mintDeckFile = require('./mint/file/deck')
const mintCallFile = require('./mint/file/call')
const mintTaskFile = require('./mint/file/task')
const mintFormFile = require('./mint/file/form')
const mintTestFile = require('./mint/file/test')
const mintViewFile = require('./mint/file/view')
const makeText = require('./text/javascript')
const makeRoad = require('./text/javascript/make')

const MINT = {
  'dock-task-file': makeTaskFile,
  'task-file': makeTaskFile,
  'form-file': makeFormFile,
  'view-file': makeViewFile,
}

module.exports = make

function make(base, ROAD_TO_MINT, dock, compile) {
  const deck = {}
  const file = deck[base] = makeTestFile(base)
  file.mint = 'test-file'
  load(deck[base], deck, ROAD_TO_MINT)
  muse(file)
  const text = makeText(file, deck)
  // save(dock, text)
  // if (compile) compile()
}

function load(file, deck, ROAD_TO_MINT) {
  const roadList = makeRoad(file)
  file.loadList = []
  roadList.forEach(({ road }) => {
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

function save(name, text) {
  if (!fs.existsSync(`load/${name}`)) {
    fs.mkdirSync(`load/${name}`)
  }
  fs.writeFileSync(`load/${name}/base.js`, text)
}

function makeViewFile(road) {
  const [host, name, ...rest] = road.split('/')
  const text = readFile(`../${name}/${rest.join('/')}/base.link`)
  const tree = makeTree(text, road.replace(/\//g, '-'))
  const file = mintViewFile(road, tree)
  file.text = text
  return file
}

function makeTestFile(road) {
  const [host, name, ...rest] = road.split('/')
  const text = readFile(`../${name}/${rest.join('/')}/base.link`)
  const tree = makeTree(text, road.replace(/\//g, '-'))
  const file = mintTestFile(road, tree)
  file.text = text
  return file
}

function makeFormFile(road) {
  const [host, name, ...rest] = road.split('/')
  const text = readFile(`../${name}/${rest.join('/')}/base.link`)
  const tree = makeTree(text, road.replace(/\//g, '-'))
  const file = mintFormFile(road, tree)
  return file
}

function makeCallFile(road) {
  const text = readFile(`./${road}/base.link`)
  const tree = makeTree(text, road.replace(/\//g, '-'))
  const file = mintCallFile(road, tree)
}

function makeTaskFile(road) {
  const [host, name, ...rest] = road.split('/')
  const text = readFile(`../${name}/${rest.join('/')}/base.link`)
  const tree = makeTree(text, road.replace(/\//g, '-'))
  const file = mintTaskFile(road, tree)
  return file
}

function readFile(road) {
  return fs.readFileSync(road, 'utf-8');
}

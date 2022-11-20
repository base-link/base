
const fs = require('fs')
const parse = require('../parse')
const shared = require('../shared')
const pathResolve = require('path')

module.exports = parseCodeCard

function parseCodeCard(link, text, linkTree, base) {
  const dir = pathResolve.dirname(link)
  const card = base.card(link)
  const seed = {
    text,
    link, // file path
    like: 'code-card',
    'load-list': [],
    base, // global environment, has `home` env vars.
    'text-tree': linkTree,
    'tree-mesh': {},
    'form-mesh': {},
    'task-mesh': {},
    'host-mesh': {},
    'bear-list': [],
    'show-tree-mesh': {},
    'show-form-mesh': {},
    'show-task-mesh': {},
    'show-host-mesh': {},
    'find-mesh': {},
    'hook-mesh': {},
    'task-text-mesh': {},
    'form-text-mesh': {},
  }
  // call it card.seed
  card.bind(seed)

  // console.log('CODE', link)

  linkTree.nest.forEach(nest => {
    if (shared.doesHaveFind(nest)) {
      throw new Error('Oops ' + link)
    } else if (shared.isSimpleTerm(nest)) {
      const term = shared.getSimpleTerm(nest)
      switch (term) {
        case 'bear': {
          const bear = parseBear(nest, card, dir)
          seed['bear-list'].push(bear)
          break
        }
        case 'load': {
          const load = parseLoad(nest, card, dir)
          seed['load-list'].push(load)
          break
        }
        case 'fuse': {
          // const fuse = parseFuse(nest, card)
          // seed
          break
        }
        case 'tree': {
          const tree = parseTree(nest, card, dir)
          seed['tree-mesh'][tree.name] = tree
          seed['show-tree-mesh'][tree.name] = tree
          break
        }
        case 'face': {
          break
        }
        case 'host': {
          break
        }
        case 'form': {
          break
        }
        case 'suit': {
          break
        }
        case 'task': {
          break
        }
        case 'note': {
          break
        }
        default:
          throw new Error(`${term} ${link}`)
      }
    }
  })

  card.seed['load-list'].forEach(load => {
    if (!base.card_mesh.has(load.link)) {
      const loadText = fs.readFileSync(load.link, 'utf-8')
      // console.log('LOAD', load.link)
      const tree = parse(loadText)
      if (load.link.match(/deck\/\w+\.link\/base\.link/)) {
        base.system[load.link] = loadText
        parseCodeCard.parseDeckCard(load.link, tree, base)
      } else {
        parseCodeCard(load.link, loadText, tree, base)
      }
    }
  })

  card.seed['bear-list'].forEach(link => {
    if (!base.card_mesh.has(link)) {
      // console.log('LOAD BEAR', link)
      const loadText = fs.readFileSync(link, 'utf-8')
      const tree = parse(loadText)
      parseCodeCard(link, loadText, tree, base)
    }
  })
}

function parseBear(nest, card, dir) {
  const str = []
  nest.nest.forEach(nest => {
    if (shared.isText(nest)) {
      const text = shared.getText(nest, card)
      str.push(text)
    }
  })
  return shared.findPath(str.join(''), dir)
}

function parseTree(nest, card, dir) {
  const name = shared.getSimpleTerm(nest.nest[0])
  const tree = {
    like: 'tree',
    name,
    take: [],
    hook: {}
  }
  nest.nest.slice(1).forEach(nest => {
    if (shared.isSimpleTerm(nest)) {
      const term = shared.getSimpleTerm(nest)
      switch (term) {
        case 'take':
          tree.take.push(parseTake(nest, card, dir))
          break
        case 'hook':
          const hook = parseTreeHook(nest, card, dir)
          tree.hook[hook.name] = hook
          break
        default:
          throw new Error(`${term} - ${card.seed.link}`)
      }
    } else {
      throw new Error(`${card.seed.link}`)
    }
  })
  return tree
}

function parseTreeHook(nest, card, dir) {
  const name = shared.getSimpleTerm(nest.nest[0])
  const hook = {
    name,
    link: nest.nest.slice(1)
  }
  return hook
}

function parseLoad(nest, card, dir) {
  const load = {
    like: 'load',
    link: null,
    take: [],
    load: [],
  }
  // console.log(JSON.stringify(nest.nest[0], null, 2))
  // console.log(dir, shared.getText(nest.nest[0]))

  load.link = shared.findPath(shared.getText(nest.nest[0]), dir)

  nest.nest.slice(1).forEach(nest => {
    switch (nest.like) {
      case 'nest': {
        if (shared.isSimpleTerm(nest)) {
          const term = shared.getSimpleTerm(nest)
          switch (term) {
            case 'take':
              const take = parseLoadTake(nest)
              load.take.push(take)
              break
            case 'load':
              const childDir = pathResolve.dirname(load.link)
              // console.log('CHILD', childDir, nest)
              load.load.push(parseLoad(nest, card, childDir))
              break
            default:
              throw new Error(`${term} ${card.seed.link}`)
          }
        }
        break
      }
      default:
        throw new Error(`${nest.like} ${card.seed.link}`)
    }
  })

  return load
}

function parseTake(nest, card, dir) {
  const name = shared.getSimpleTerm(nest.nest[0])
  const take = {
    name,
    like: undefined,
    void: false,
  }
  nest.nest.slice(1).forEach(nest => {
    if (shared.isSimpleTerm(nest)) {
      const term = shared.getSimpleTerm(nest)
      switch (term) {
        case 'like':
          // TODO
          break
        case 'void':
          // TODO
          const voidState = shared.getSimpleTerm(nest)
          take.void = voidState === 'true'
          break
        default:
          throw new Error(`${term} - ${card.seed.link}`)
      }
    } else {
      throw new Error(card.seed.link)
    }
  })
  console.log(take)
  return take
}

function parseLoadTake(nest) {
  const scope = nest.nest[0]
  const scopeTerm = shared.getSimpleTerm(scope)
  const name = scope.nest[0]
  const nameTerm = shared.getSimpleTerm(name)
  return {
    like: scopeTerm,
    name,
  }
}

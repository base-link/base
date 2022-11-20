
const fs = require('fs')
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

  linkTree.nest.forEach(nest => {
    if (shared.doesHaveFind(nest)) {
      throw new Error('Oops ' + link)
    } else if (shared.isSimpleTerm(nest)) {
      const term = shared.getSimpleTerm(nest)
      switch (term) {
        case 'bear': {
          const bear = parseBear(nest, card)
          seed['bear-list'].push(bear)
          break
        }
        default:
          throw new Error(link)
      }
    }
  })

  // call it card.seed
  card.bind(seed)

  console.log(card)
}

function parseBear(nest, card) {
  return shared.getText(nest.nest[0])
}

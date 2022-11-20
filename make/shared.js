
const fs = require('fs')
const pathResolve = require('path')

module.exports = {
  getSimpleTerm,
  isSimpleTerm,
  doesHaveFind,
  isText,
  getText,
  findPath,
}

function isText(nest) {
  if (nest.line.length > 1) {
    return false
  }

  let line = nest.line[0]
  if (line.like === 'text') {
    return true
  }

  return false
}

function getText(nest) {
  if (nest.line.length > 1) {
    return false
  }

  let line = nest.line[0]
  if (line.like === 'text') {
    return line.link[0].cord
  }

  return false
}

function getSimpleTerm(nest) {
  if (nest.line.length > 1) {
    return
  }

  let line = nest.line[0]
  if (line.like !== 'term') {
    return
  }

  if (line.link.length !== 1) {
    return
  }

  let link = line.link[0]
  if (link.like === 'cord') {
    return link.cord
  }
}

function isSimpleTerm(nest) {
  if (nest.line.length > 1) {
    return false
  }

  let line = nest.line[0]
  if (line.like !== 'term') {
    return false
  }

  if (line.link.length !== 1) {
    return false
  }

  let link = line.link[0]
  if (link.like === 'cord') {
    return true
  }

  return false
}

function doesHaveFind(nest) {
  for (let i = 0, n = nest.line.length; i < n; i++) {
    let line = nest.line[i]
    if (line.like !== 'term') {
      continue
    }

    for (let j = 0, m = line.link.length; j < m; j++) {
      let link = line.link[j]
      if (link.like === 'nest' && link.size === 1) {
        return true
      }
    }
  }

  return false
}

function findPath(link, context = process.cwd()) {
  if (link.startsWith('@treesurf')) {
    link = link.replace(/@treesurf\/(\w+)/, (_, $1) => `../${$1}.link`)
  }

  link = pathResolve.join(context, link)

  if (fs.existsSync(`${link}/base.link`)) {
    link = `${link}/base.link`
  } else if (fs.existsSync(`${link}.link`)) {
    link = `${link}.link`
  } else {
    throw new Error(`Path ${link} not found.`)
  }

  return link
}

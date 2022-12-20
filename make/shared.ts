import fs from 'fs'
import pathResolve from 'path'
import { ASTForkType, ASTTreeLinkType } from './server/type'
import type {
  ParserNodeType,
  ParserNestNodeType,
} from './parse'

export default {
  getSimpleTerm,
  isSimpleTerm,
  doesHaveFind,
  isText,
  getText,
  findPath,
  isCode,
  getCodeAsNumber,
  isMark,
  getMark,
  copyObject,
  addToTreeLink,
  makeTreeLink,
}

function addToTreeLink(
  tree: ASTTreeLinkType,
  link: ParserNodeType,
): void {
  tree.link.push(link)
  if (link.like['tree-link']) {
    tree.size++
  }
}

function makeTreeLink(name: string) {
  return {
    like: 'tree-link',
    name,
    link: [],
    size: 0,
  }
}

function getMark(nest: ParserNestNodeType) {
  const line = nest.line[0]

  if (line && line.like === 'mark') {
    return line.mark
  }
}

function copyObject(
  a: Record<string, unknown>,
  b: Record<string, unknown>,
) {
  Object.keys(a).forEach(key => {
    b[key] = a[key]
  })
}

function isMark(nest: ParserNestNodeType): boolean {
  if (nest.line.length > 1) {
    return false
  }

  if (nest.line.length === 0) {
    return false
  }

  let line = nest.line[0]
  if (line && line.like === 'mark') {
    return true
  }

  return false
}

function getCodeAsNumber(nest: ParserNestNodeType): number {
  let line = nest.line[0]

  if (line && line.like === 'code') {
    let type = line.base
    let rest = line.code

    switch (type) {
      case 'b':
        return parseInt(rest, 2)
      case 'x':
        return parseInt(rest, 16)
      case 'o':
        return parseInt(rest, 8)
      case 'h':
        return parseInt(rest, 16)
      default:
        throw new Error(line.code)
    }
  } else {
    throw new Error('Oops')
  }
}

function isCode(nest: ParserNestNodeType): boolean {
  if (nest.line.length > 1) {
    return false
  }

  if (nest.line.length === 0) {
    return false
  }

  let line = nest.line[0]
  if (line && line.like === 'code') {
    return true
  }

  return false
}

function isText(nest: ParserNestNodeType): boolean {
  if (nest.line.length > 1) {
    return false
  }

  if (nest.line.length === 0) {
    return false
  }

  let line = nest.line[0]
  if (line && line.like === 'text') {
    return true
  }

  return false
}

function getSimpleTerm(
  nest: ParserNestNodeType,
): string | undefined {
  if (nest.line.length > 1) {
    return
  }

  let line = nest.line[0]
  if (!line) {
    return
  }

  if (line.like !== 'term') {
    return
  }

  if (line.link.length !== 1) {
    return
  }

  let link = line.link[0]
  if (link && link.like === 'cord') {
    return link.cord
  }
}

function isSimpleTerm(nest: ParserNestNodeType): boolean {
  if (nest.line.length > 1) {
    return false
  }

  if (nest.line.length === 0) {
    return false
  }

  let line = nest.line[0]
  if (!line) {
    return false
  }

  if (line.like !== 'term') {
    return false
  }

  if (line.link.length !== 1) {
    return false
  }

  let link = line.link[0]
  if (link && link.like === 'cord') {
    return true
  }

  return false
}

function doesHaveFind(nest: ParserNestNodeType): boolean {
  for (let i = 0, n = nest.line.length; i < n; i++) {
    let line = nest.line[i]
    if (line) {
      if (line.like !== 'term') {
        continue
      }

      for (let j = 0, m = line.link.length; j < m; j++) {
        let link = line.link[j]
        if (link && link.like === 'slot' && link.size === 1) {
          return true
        }
      }
    }
  }

  return false
}

function findPath(
  link: string,
  context = process.cwd(),
): string {
  if (link.startsWith('@treesurf')) {
    link = pathResolve
      .resolve(
        link.replace(
          /@treesurf\/(\w+)/,
          (_: string, $1: string): string => `../${$1}.link`,
        ),
      )
      .replace(/\/$/, '')
  } else {
    link = pathResolve.join(context, link).replace(/\/$/, '')
  }

  if (fs.existsSync(`${link}/base.link`)) {
    link = `${link}/base.link`
  } else if (fs.existsSync(`${link}.link`)) {
    link = `${link}.link`
  } else {
    throw new Error(`Path ${link} not found.`)
  }

  return link
}

import fs from 'fs'
import pathResolve from 'path'

import parse, {
  ParserNestNodeType,
  ParserNodeType,
} from '~parse'

import { ASTCordType, Base } from '~server'

import { LexicalScope } from './scope'

export function getLinkHost(link: string): string {
  return pathResolve.dirname(link)
}

export function getText(
  nest: ParserNestNodeType,
  scope: LexicalScope,
): string | undefined {
  if (nest.line.length > 1) {
    return
  }

  let line = nest.line[0]
  if (!line) {
    return
  }

  if (line.like !== 'text') {
    return
  }

  const str: Array<string> = []

  line.link.forEach(link => {
    switch (link.like) {
      case 'cord':
        str.push(link.cord)
        break
      case 'slot':
        // TODO
        const text: string = 'readNest(link, seed)'
        str.push(text)
        break
      default:
        throw new Error('Oops')
    }
  })

  return str.join('')
}

export function getTextDependencyList(
  nest: ParserNestNodeType,
): Array<ParserNestNodeType> {
  if (nest.line.length > 1) {
    return []
  }

  let line = nest.line[0]
  if (!line) {
    return []
  }

  if (line.like !== 'text') {
    return []
  }

  const array: Array<ParserNestNodeType> = []

  line.link.forEach(link => {
    switch (link.like) {
      case 'cord':
        break
      case 'slot':
        array.push(link.nest)
        break
      default:
        throw new Error('Oops')
    }
  })

  return array
}

export function getTextNest(fork) {
  if (fork.nest.line.length > 1) {
    return
  }

  let line = fork.nest.line[0]
  if (line.like !== 'text') {
    return
  }

  const knit = this.makeKnit({
    like: 'text',
  })

  line.link.forEach(link => {
    switch (link.like) {
      case 'cord':
        knit.tree.push({
          cord: link.cord,
          like: 'cord',
        })
        break
      case 'nest': {
        const nestFork = this.extendObject(fork, {
          nest: link,
        })
        const read = this.readNest(nestFork)
        this.addToTreeLink(knit, read)
        break
      }
      default:
        throw new Error(seed.link)
    }
  })

  if (!knit.size) {
    const str = []
    knit.tree.forEach(link => {
      str.push(link.cord)
    })
    return this.makeCord(str.join(''))
  }

  return tree
}

export function isText(nest: ParserNestNodeType): boolean {
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

export function isTextNest(nest: ParserNestNodeType): boolean {
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

export function makeCord(cord: string): ASTCordType {
  return {
    cord,
    like: 'cord',
  }
}

export function parseTextIntoTree(
  text: string,
): ParserNodeType {
  return parse(text)
}

export function readTextFile(base: Base, link: string): string {
  return (
    base.text_mesh.get(link) ?? fs.readFileSync(link, 'utf-8')
  )
}

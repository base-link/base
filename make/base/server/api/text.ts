import parse, {
  ParserNodeType,
  ParserNestNodeType,
} from '../../../parse'
import fs from 'fs'
import pathResolve from 'path'
import { ASTCordType, BaseType } from '../type'
import Base from '../base'

export function readTextFile(base: Base, link: string): string {
  return (
    base.text_mesh.get(link) ?? fs.readFileSync(link, 'utf-8')
  )
}

export function getLinkHost(link: string): string {
  return pathResolve.dirname(link)
}

export function makeCord(cord: string): ASTCordType {
  return {
    like: 'cord',
    cord,
  }
}

export function parseTextIntoTree(
  text: string,
): ParserNodeType {
  return parse(text)
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
          like: 'cord',
          cord: link.cord,
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

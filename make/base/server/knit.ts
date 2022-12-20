import type { ASTTreeLinkType } from '../../shared'
import Base from './base'

const KNIT_LINK = ['tree', 'mesh', 'size', 'like']
const KNIT_FORM = {
  name: 'knit',
}

type ASTKnitType = {
  like: 'knit'
  slot: number
  size: number
  tree: Array<unknown>
  mesh: Object
  base?: ASTKnitType
}

type ASTMeshType = {
  like: 'mesh'
  mesh: Object
}

type ASTListType = {
  like: 'list'
  list: Array<unknown>
}

export default {
  makeKnit(mesh: Object, base?: ASTKnitType) {
    const slot = base ? base.tree.length : 0

    const knit: ASTKnitType = {
      like: 'knit',
      base,
      slot,
      size: 0,
      tree: [],
      mesh,
    }

    if (base) {
      // this.addToTreeLink(base, knit)
    }

    return knit
  },

  getPropertyValue(knit: ASTKnitType, name: string): unknown {
    if (knit == null) {
      return knit
    }

    if (KNIT_LINK.includes(name)) {
      return knit[name]
    } else {
      return knit.mesh[name]
    }

    // switch (value.like.name) {
    //   case 'cord':
    //     value = value.cord
    //     break
    //   case 'mark':
    //     value = value.mark
    //     break
    //   default:
    //     throw new Error(value.like)
    // }

    // return value
  },

  makeMesh(): ASTMeshType {
    return {
      like: 'mesh',
      mesh: {},
    }
  },

  makeList(): ASTListType {
    return {
      like: 'list',
      list: [],
    }
  },

  // addToTreeLink(knit: ASTKnitType, link) {
  //   const slot = knit.tree.length
  //   knit.tree.push(link)
  //   if (link.like === 'knit') {
  //     knit.size++
  //   }
  //   return slot
  // },
}

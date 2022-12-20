import {
  ASTMeshType,
  CompilerKnitType,
  CompilerListType,
  CompilerMeshType,
} from '~server'

const KNIT_LINK = ['tree', 'mesh', 'size', 'like']

export function makeKnit<
  P extends ASTMeshType,
  Q extends ASTMeshType = ASTMeshType,
>(mesh: P, base?: CompilerKnitType<Q>): CompilerKnitType<P, Q> {
  const slot: number = base ? base.tree.length : 0

  const knit: CompilerKnitType<P, Q> = {
    like: 'compiler-knit',
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
}

export function getPropertyValue(
  knit: CompilerKnitType<ASTMeshType>,
  name: string,
): unknown {
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
}

export function makeMesh<T>(): CompilerMeshType<T> {
  return {
    like: 'compiler-mesh',
    mesh: <T>{},
  }
}

export function makeList<T>(): CompilerListType<T> {
  return {
    like: 'compiler-list',
    list: <Array<T>>[],
  }
}

// addToTreeLink(knit: ASTKnitType, link) {
//   const slot = knit.tree.length
//   knit.tree.push(link)
//   if (link.like === 'knit') {
//     knit.size++
//   }
//   return slot
// },

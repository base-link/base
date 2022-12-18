
const KNIT_LINK = ['tree', 'mesh', 'size', 'like']
const KNIT_FORM = {
  name: 'knit'
}

module.exports = {
  makeKnit(mesh, base) {
    const slot = base && base.tree.length

    const knit = {
      like: 'knit',
      base,
      slot,
      size: 0,
      tree: [],
      mesh,
    }

    if (base) {
      this.addToTreeLink(base, knit)
    }

    return knit
  },

  getPropertyValue(mesh, name) {
    let value

    if (mesh == null) {
      return mesh
    }

    if (mesh.like.name === 'knit' && KNIT_LINK.includes(name)) {
      value = mesh[name]
    } else {
      value = mesh.mesh[name]
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

    return value
  },

  makeMesh() {
    return {
      link: 'mesh',
      mesh: {}
    }
  },

  makeList() {
    return {
      link: 'list',
      list: []
    }
  },

  addToTreeLink(knit, link) {
    const slot = knit.tree.length
    knit.tree.push(link)
    if (link.like === 'knit') {
      knit.size++
    }
    return slot
  },
}

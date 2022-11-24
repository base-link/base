
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
      base.tree.push(knit)
    }

    return knit
  },

  makeMesh() {
    return {
      link: 'mesh',
      mesh: {}
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

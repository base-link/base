
module.exports = {
  makeTreeLink(name, base) {
    const link = {
      like: 'tree-link',
      base,
      slot: base.link.length,
      name,
      link: [],
      size: 0
    }

    base.link.push(link)

    return link
  },
}

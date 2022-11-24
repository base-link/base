
module.exports = {
  mintNestTree(nest, seed) {
    if (this.isTextNest(nest)) {
      return this.getTextNest(nest, seed)
    } else if (shared.isMark(nest)) {

    } else if (shared.isSimpleTerm(nest)) {

    }
  },

  readNest(fork) {
    let value = fork.fork

    fork.nest.line.forEach(line => {
      switch (line.like) {
        case 'term':
          if (line.link.length > 1) {
            throw new Error(seed.link)
          } else {
            const link = line.link[0]
            if (value.hasOwnProperty(link.cord)) {
              value = value[link.cord]
            }
          }
          break
        default:
          throw new Error(line.like + ' ' + seed.link)
      }
    })
    return value
  },
}

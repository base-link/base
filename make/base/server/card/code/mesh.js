
module.exports = {
  mintCodeForm(fork) {
    const form = this.makeKnit({
      like: 'form',
      name: null,
      base: [],
      link: this.makeMesh(),
      task: this.makeMesh(),
      wear: this.makeMesh(),
      hook: this.makeMesh(),
    }, fork.knit)

    return form
  },

  mintCodeTaskMesh(parent, key, tree, seed) {
    const task = this.makeKnit({
      like: 'task',
      name: null,
      base: null,
      take: this.makeMesh(),
      task: this.makeMesh(),
      free: null,
      call: [],
    })

    return task
  },

  mintCodeLoad(fork) {
    const load = this.makeKnit({
      like: 'load',
      link: null,
      take: []
    }, fork.knit)

    fork.nest.nest[0]

    fork.tree.link.forEach((link, i) => {
      if (i === 0) {
        link.text = shared.findPath(link.text, fork.card.mesh['link-host'])
        load.link = link
      } else {
        load.take.push(link)
      }
    })

    const childFork = this.extendObject(fork, { mesh: load })
    this.convertToMesh(childFork)
  },

  mintCodeFuseMesh(fork) {
    const fuse = this.makeKnit({
      like: 'fuse',
      name: null,
      bind: [],
    }, fork.knit)

    const nameFork = this.extendObject(fork, { nest: fork.nest.nest[0] })
    const name = this.getTerm(nameFork)

    this.addToTreeLink(fuse, name)

    fork.nest.nest.slice(1).forEach(nest => {
      const nestFork = this.extendObject(fork, { nest })
      if (shared.isSimpleTerm(nestFork)) {
        const term = shared.getTerm(nestFork)
        switch (term) {
          case 'loan': {
            const loanFork = this.extendObject(nestFork, { nest: nest.nest[0] })
            const loan = shared.getTerm(loanFork)
            this.addToTreeLink(fuse, loan)
            fuse.mesh.bind.push(loan)
            break
          }
          case 'mark': {
            const mark = parseMark(nest.nest[0])
            this.addToTreeLink(fuse, mark)
            fuse.mesh.bind.push(mark)
            break
          }
          case 'term': {
            const termFork = this.extendObject(nestFork, { nest: nest.nest[0] })
            const term = shared.getTerm(termFork)
            this.addToTreeLink(fuse, term)
            fuse.mesh.bind.push(term)
            break
          }
          default:
            throw new Error(`${term} - ${card.seed.link}`)
        }
      } else {
        throw new Error(`${card.seed.link}`)
      }
    })
  },

  mintCodeTreeMesh(nest, seed) {

  },

  mintCodeFaceMesh(nest, seed) {

  },

  mintCodeHostMesh(nest, seed) {

  },

  mintCodeSuitMesh(nest, seed) {

  },

  mintCodeTaskMesh(nest, seed) {

  },
}

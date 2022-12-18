
const mintMeshMixin = require('./mesh')
const mintTreeMixin = require('./tree')

module.exports = {
  ...mintMeshMixin,
  ...mintTreeMixin,

  mintCodeCard(link) {
    const text = this.readTextFile(link)
    const textTree = this.parseTextIntoTree(text)
    const linkHost = this.getLinkHost(link)
    const card = this.card(link)
    const knit = this.makeKnit({
      like: 'code-card',
      base: this,
      link: this.makeCord(link),
      'link-host': this.makeCord(linkHost),
      'text-tree': textTree,
      'load-list': this.makeList(),
      'bear-list': this.makeList(),
      'tree-mesh': this.makeMesh(),
      'form-mesh': this.makeMesh(),
      'suit-mesh': this.makeMesh(),
      'task-mesh': this.makeMesh(),
      'host-mesh': this.makeMesh(),
      'face-mesh': this.makeMesh(),
      'test-mesh': this.makeMesh(),
      'load-mesh': this.makeMesh(),
      'show-tree-mesh': this.makeMesh(),
      'show-form-mesh': this.makeMesh(),
      'show-suit-mesh': this.makeMesh(),
      'show-task-mesh': this.makeMesh(),
      'show-host-mesh': this.makeMesh(),
      'show-face-mesh': this.makeMesh(),
      'show-test-mesh': this.makeMesh(),
      'find-mesh': this.makeMesh(),
      'hook-mesh': this.makeMesh(),
      // 'task-text-mesh': {},
      // 'form-text-mesh': {},
      // 'tree-link': {
      //   like: 'tree-link',
      //   link: [],
      // },
    })

    card.bind(knit)

    const fork = {
      card: knit,
      knit,
      // this the scope passed into
      // interpolation functions for lexical scope.
      fork: knit
    }

    textTree.nest.forEach(nest => {
      const childFork = this.extendObject(fork, { nest })
      this.mintCodeCardNest(childFork)
    })

    // this.mintCodeCardMesh(fork)
  },
}

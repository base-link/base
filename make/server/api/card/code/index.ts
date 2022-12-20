import { Base, api } from '~server'

export * from './mesh'
export * from './tree'

export function mintCodeCard(base: Base, link: string): void {
  const text = api.readTextFile(base, link)
  const textTree = api.parseTextIntoTree(text)
  const linkHost = api.getLinkHost(link)
  const card = base.card(link)
  const knit = api.makeKnit({
    base,
    'bear-list': [],
    'face-mesh': {},
    'find-mesh': {},
    'form-mesh': {},
    'hook-mesh': {},
    'host-mesh': {},
    like: 'code-card',
    link: link,
    'link-host': linkHost,
    'load-list': [],
    'load-mesh': {},
    'show-face-mesh': {},
    'show-form-mesh': {},
    'show-host-mesh': {},
    'show-suit-mesh': {},
    'show-task-mesh': {},
    'show-test-mesh': {},
    'show-tree-mesh': {},
    'suit-mesh': {},
    'task-mesh': {},
    'test-mesh': {},
    'text-tree': textTree,
    'tree-mesh': {},
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
    // this the scope passed into
    // interpolation functions for lexical scope.
    fork: knit,
    knit,
  }

  if (textTree.like === 'nest') {
    textTree.nest.forEach(nest => {
      const childFork = { ...fork, nest }
      api.mintCodeCardNest(childFork)
    })
  }

  // this.mintCodeCardMesh(fork)
}

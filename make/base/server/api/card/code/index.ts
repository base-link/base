import Base from '../../../base'
import { api } from '../../..'
import { ASTCardCodeType, ASTKnitType } from '../../../type'

export * from './mesh'
export * from './tree'

export function mintCodeCard(base: Base, link: string): void {
  const text = api.readTextFile(base, link)
  const textTree = api.parseTextIntoTree(text)
  const linkHost = api.getLinkHost(link)
  const card = base.card(link)
  const knit = api.makeKnit({
    like: 'code-card',
    base,
    link: api.makeCord(link),
    'link-host': api.makeCord(linkHost),
    'text-tree': textTree,
    'load-list': api.makeList(),
    'bear-list': api.makeList(),
    'tree-mesh': api.makeMesh(),
    'form-mesh': api.makeMesh(),
    'suit-mesh': api.makeMesh(),
    'task-mesh': api.makeMesh(),
    'host-mesh': api.makeMesh(),
    'face-mesh': api.makeMesh(),
    'test-mesh': api.makeMesh(),
    'load-mesh': api.makeMesh(),
    'show-tree-mesh': api.makeMesh(),
    'show-form-mesh': api.makeMesh(),
    'show-suit-mesh': api.makeMesh(),
    'show-task-mesh': api.makeMesh(),
    'show-host-mesh': api.makeMesh(),
    'show-face-mesh': api.makeMesh(),
    'show-test-mesh': api.makeMesh(),
    'find-mesh': api.makeMesh(),
    'hook-mesh': api.makeMesh(),
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
    fork: knit,
  }

  if (textTree.like === 'nest') {
    textTree.nest.forEach(nest => {
      const childFork = api.extendObject(fork, { nest })
      api.mintCodeCardNest(childFork)
    })
  }

  // this.mintCodeCardMesh(fork)
}

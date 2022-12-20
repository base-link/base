import shared from '../../../../shared'

export function mintCodeCardNest(fork): void {
  if (shared.doesHaveFind(fork.nest)) {
    throw new Error('Oops ' + fork.card.mesh.link)
  } else if (shared.isSimpleTerm(fork.nest)) {
    const term = shared.getSimpleTerm(fork.nest)
    switch (term) {
      case 'bear': {
        this.mintCodeBear(fork)
        break
      }
      case 'load': {
        this.mintCodeLoad(fork)
        break
      }
      case 'fuse': {
        this.mintCodeFuse(fork)
        break
      }
      case 'tree': {
        this.mintCode(fork)
        break
      }
      case 'face': {
        this.mintCodeFace(fork)
        break
      }
      case 'host': {
        this.mintCodeHost(fork)
        break
      }
      case 'form': {
        this.mintCodeForm(fork)
        break
      }
      case 'suit': {
        this.mintCodeSuit(fork)
        break
      }
      case 'task': {
        this.mintCodeTask(fork)
        break
      }
      case 'note': {
        break
      }
      default:
        throw new Error(`${term} ${fork.card.link}`)
    }
  }
}

export function mintCodeBear(fork): void {
  const linkFork = this.extendObject(fork, {
    nest: fork.nest.nest[0],
  })
  const link = this.getTextNest(linkFork)
  if (link.like.name === 'cord') {
    link.cord = this.makeCord(
      shared.findPath(
        link.cord,
        fork.card.mesh['link-host'].cord,
      ),
    )
  }
  this.addToTreeLink(fork.knit, link)
  fork.knit.mesh.link = this.loadLink(link)
  fork.nest.nest.slice(1).forEach(nest => {
    // hide
  })
}

export function loadLink(link) {
  if (link.like === 'nest') {
    return
  }

  return link
}

export function convertToMesh(fork) {
  fork.tree.base[fork.tree.slot] = fork.mesh
  fork.tree.base.size--
  if (!fork.tree.base.size) {
    this.mintTreeToMesh(fork.tree.base)
  }
}

export function mintTreeToMesh(tree) {}

export function mintCodeLoadNest(fork) {
  // this.expectSimpleTerm(nest, seed)
  if (shared.isSimpleTerm(fork.nest)) {
    const term = shared.getSimpleTerm(fork.nest)
    switch (term) {
      case 'take':
        this.mintCodeLoadTake(fork)
        break
      case 'load':
        this.mintCodeLoad(fork)
        break
      default:
        throw new Error(`${term} ${card.seed.link}`)
    }
  }
}

export function mintCodeLoadTake(fork) {}

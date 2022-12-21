import {
  ASTFormType,
  ASTKnitType,
  BaseCardCodeMeshMixinType,
  BaseType,
} from '../../../type'

export function mintCodeFaceTree(fork) {}

export function mintCodeForm(
  this: BaseType,
  fork,
): ASTKnitType<ASTFormType> {
  return form
}

export function mintCodeFuseMesh(fork) {
  const fuse = this.makeKnit(
    {
      bind: [],
      like: 'fuse',
      name: null,
    },
    fork.knit,
  )

  const nameFork = this.extendObject(fork, {
    nest: fork.nest.nest[0],
  })
  const name = this.getTerm(nameFork)

  this.addToTreeLink(fuse, name)
  fuse.mesh.name = name

  fork.nest.nest.slice(1).forEach(nest => {
    const nestFork = this.extendObject(fork, { nest })
    if (shared.isSimpleTerm(nestFork)) {
      const term = shared.getTerm(nestFork)
      switch (term) {
        case 'loan': {
          const loanFork = this.extendObject(nestFork, {
            nest: nest.nest[0],
          })
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
          const termFork = this.extendObject(nestFork, {
            nest: nest.nest[0],
          })
          const term = shared.getTerm(termFork)
          this.addToTreeLink(fuse, term)
          fuse.mesh.bind.push(term)
          break
        }
        case 'bind': {
          break
        }
        default:
          throw new Error(`${term} - ${card.seed.link}`)
      }
    } else {
      throw new Error(`${card.seed.link}`)
    }
  })
}

export function mintCodeHostTree(fork) {}

export function mintCodeLoad(fork) {
  const load = this.makeKnit(
    {
      bear: [],
      like: 'load',
      link: null,
      take: [],
    },
    fork.knit,
  )

  fork.nest.nest[0]

  fork.tree.link.forEach((link, i) => {
    if (i === 0) {
      const loadLink = {
        cord: shared.findPath(
          link.text,
          fork.card.mesh['link-host'],
        ),
        like: 'cord',
      }
      load.link = loadLink
    } else {
      load.take.push(link)
    }
  })

  const childFork = this.extendObject(fork, { mesh: load })
  this.convertToMesh(childFork)
}

export function mintCodeSuitTree(fork) {}

export function mintCodeTaskMesh(parent, key, tree, seed) {
  const task = this.makeKnit({
    base: null,
    call: [],
    free: null,
    like: 'task',
    name: null,
    take: this.makeMesh(),
    task: this.makeMesh(),
  })

  return task
}

export function mintCodeTaskTree(fork) {}

export function mintCodeTree(fork) {}

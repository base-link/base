import {
  ErrorType,
  Mesh,
  MeshDependencyPartType,
  MeshDependencyType,
  Nest,
  NestInputType,
  Tree,
  TreeNodeType,
  api,
} from '~'

export function assertString(
  object: unknown,
  error?: () => ErrorType,
): asserts object is string {
  if (!api.isString(object)) {
    api.throwError(
      error ? error() : api.generateMissingStringError(object),
    )
  }
}

export function checkDependency(
  dependency: MeshDependencyType,
): void {
  let value: unknown = dependency.context.fork.data

  if (dependency.met) {
    return
  }

  let i = 0
  while (i < dependency.path.length) {
    const part = dependency.path[i]

    if (
      part &&
      api.isRecord(value) &&
      value &&
      part.name in value
    ) {
      part.met = true

      if (i === dependency.path.length - 1) {
        dependency.met = true
        return
      } else {
        value = value[part.name]
      }
    } else {
      return
    }

    i++
  }
}

export function isString(object: unknown): object is string {
  return api.isNativeString(object)
}

export function parseTextIntoTree(text: string): TreeNodeType {
  return api.parseLinkText(text)
}

export function processDynamicTextNest(
  input: NestInputType,
  job: (i: NestInputType) => void,
): void {
  const dependencyList = api.resolveTextDependencyList(
    input,
    job,
  )

  const card = api.getProperty(input, 'card')
  api.assertCard(card)

  card.dependencyList.push(...dependencyList)

  dependencyList.forEach(dep => {
    api.checkDependency(dep)
  })

  const metDependencyList = dependencyList.filter(
    dep => dep.met,
  )

  if (!metDependencyList.length) {
    job(input)
  }
}

export function processTextNest(
  input: NestInputType,
  job: (i: NestInputType) => void,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.DynamicText: {
      api.processDynamicTextNest(input, job)
      break
    }
    case Nest.StaticText:
      job(input)
      break
    default:
      api.throwError(
        api.generateUnhandledNestCaseError(input, type),
      )
  }
}

export function readDependency(
  input: unknown,
  dependency: MeshDependencyType,
): unknown {
  let value = input

  if (dependency.met) {
    dependency.path.forEach(part => {
      if (api.isRecord(value)) {
        value = value[part.name]
      }
    })
  } else {
    value = undefined
  }

  return value
}

export function readNest(input: NestInputType): unknown {
  let value: unknown = input.fork.data

  input.nest.line.forEach(nest => {
    switch (nest.like) {
      case Tree.Term:
        const name = api.resolveStaticTerm({
          ...input,
          term: nest,
        })

        api.assertString(name)

        if (api.isRecord(value)) {
          value = value[name]
        }
        break
      default:
        throw new Error(nest.like)
    }
  })

  return value
}

export function resolveNestDependencyList(
  input: NestInputType,
  job: (i: NestInputType) => void,
): Array<MeshDependencyType> {
  const array: Array<MeshDependencyType> = []
  const dependency: MeshDependencyType = {
    callbackList: [job],
    context: input,
    like: Mesh.Dependency,
    met: false,
    path: [],
  }
  array.push(dependency)

  input.nest.line.forEach(nest => {
    if (nest.like === Tree.Term) {
      // TODO: solve for interpolated terms too.
      const name = api.resolveStaticTerm({
        ...input,
        term: nest,
      })

      api.assertString(name)

      const dependencyPart: MeshDependencyPartType = {
        callbackList: [],
        like: Mesh.DependencyPart,
        met: false,
        name,
        parent: dependency,
      }

      dependency.path.push(dependencyPart)
    }
  })

  return array
}

export function resolveText(
  input: NestInputType,
): string | undefined {
  const nest = input.nest

  if (nest.line.length > 1) {
    return
  }

  let line = nest.line[0]
  if (!line) {
    return
  }

  if (line.like !== Tree.Text) {
    return
  }

  const str: Array<unknown> = []

  line.link.forEach(link => {
    switch (link.like) {
      case Tree.Cord:
        str.push(link.cord)
        break
      case Tree.Slot:
        // TODO
        const text = api.readNest({
          ...input,
          index: 0,
          nest: link.nest,
        })

        str.push(text)
        break
      default:
        throw new Error('Oops')
    }
  })

  return str.join('')
}

export function resolveTextDependencyList(
  input: NestInputType,
  job: (i: NestInputType) => void,
): Array<MeshDependencyType> {
  const nest = input.nest

  if (nest.line.length > 1) {
    return []
  }

  let line = nest.line[0]
  if (!line) {
    return []
  }

  if (line.like !== Tree.Text) {
    return []
  }

  const array: Array<MeshDependencyType> = []

  line.link.forEach(link => {
    switch (link.like) {
      case Tree.Cord:
        break
      case Tree.Slot:
        const dependencies = api.resolveNestDependencyList(
          {
            ...input,
            index: 0,
            nest: link.nest,
          },
          job,
        )
        array.push(...dependencies)
        break
      default:
        throw new Error('Oops')
    }
  })

  return array
}

export function textIsInterpolated(
  input: NestInputType,
  size: number = 1,
): boolean {
  const nest = input.nest

  for (let i = 0, n = nest.line.length; i < n; i++) {
    let line = nest.line[i]
    if (line) {
      if (line.like !== Tree.Text) {
        continue
      }

      for (let j = 0, m = line.link.length; j < m; j++) {
        let link = line.link[j]
        if (
          link &&
          link.like === Tree.Slot &&
          link.size === size
        ) {
          return true
        }
      }
    }
  }

  return false
}

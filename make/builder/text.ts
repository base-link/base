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
  const dependencyList = api.resolveTextDependencyList(input)
  const valueList = dependencyList.filter(nest => {})
  // TODO: figure out when to re-evaluate a dependency.
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

export function resolveNestDependencyList(
  input: NestInputType,
): Array<MeshDependencyType> {
  const array: Array<MeshDependencyType> = []
  const dependency: MeshDependencyType = {
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

  const str: Array<string> = []

  line.link.forEach(link => {
    switch (link.like) {
      case Tree.Cord:
        str.push(link.cord)
        break
      case Tree.Slot:
        // TODO
        const text: string = 'readNest(link, seed)'
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
        const dependencies = api.resolveNestDependencyList({
          ...input,
          index: 0,
          nest: link.nest,
        })
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

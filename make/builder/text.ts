import { MeshHint, Site, Tree, code } from '~'
import type {
  MeshInputType,
  SiteDependencyPartType,
  SiteDependencyType,
  SiteScopeType,
  TreeNodeType,
} from '~'

export function parseTextIntoTree(text: string): TreeNodeType {
  return code.parseLinkText(text)
}

export function processDynamicTextNest(
  input: MeshInputType,
  job: (i: MeshInputType) => void,
): void {
  const dependencyList = code.resolveTextDependencyList(
    input,
    job,
  )

  const card = code.getProperty(input, 'card')
  code.assertCard(card)

  const unmetDependencyList = dependencyList.filter(
    dep => !code.checkDependency(input, dep),
  )

  card.base.dependency.push(...unmetDependencyList)

  if (!unmetDependencyList.length) {
    job(input)
  }
}

export function processTextNest(
  input: MeshInputType,
  job: (i: MeshInputType) => void,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case MeshHint.DynamicText: {
      code.processDynamicTextNest(input, job)
      break
    }
    case MeshHint.StaticText:
      job(input)
      break
    default:
      code.throwError(
        code.generateUnhandledNestCaseError(input, type),
      )
  }
}

export function readDependency(
  input: MeshInputType,
  dependency: SiteDependencyType,
): unknown {
  const scope = code.findInitialScope(input, dependency)

  if (scope) {
    let value: unknown = scope.data

    dependency.path.forEach(part => {
      if (code.isRecord(value)) {
        const childValue = value[part.name]
        value = childValue
      } else {
        value = undefined
      }
    })

    return value
  }
}

export function readNest(input: MeshInputType): unknown {
  let value: unknown = input.lexicalScope.data
  const nest = code.assumeNest(input)

  nest.line.forEach((nest, i) => {
    switch (nest.like) {
      case Tree.Term:
        const name = code.resolveStaticTerm(
          code.extendWithObjectScope(input, nest),
        )

        code.assertString(name)

        if (code.isRecord(value) && name in value) {
          value = value[name]
        } else {
          value = undefined
        }
        break
      default:
        throw new Error(nest.like)
    }
  })

  return value
}

export function resolveNestDependencyList(
  input: MeshInputType,
  job: (i: MeshInputType) => void,
): Array<SiteDependencyType> {
  const array: Array<SiteDependencyType> = []
  const dependency: SiteDependencyType = {
    callbackList: [job],
    children: [],
    context: input,
    like: Site.Dependency,
    partial: false,
    path: [],
  }
  array.push(dependency)

  code.assumeNest(input).line.forEach(nest => {
    if (nest.like === Tree.Term) {
      // TODO: solve for interpolated terms too.
      const name = code.resolveStaticTerm(
        code.extendWithObjectScope(input, nest),
      )

      code.assertString(name)

      const dependencyPart: SiteDependencyPartType = {
        callbackList: [],
        like: Site.DependencyPart,
        name,
        parent: dependency,
      }

      dependency.path.push(dependencyPart)
    }
  })

  return array
}

export function resolveText(
  input: MeshInputType,
): string | undefined {
  const nest = code.assumeNest(input)

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
        const text = code.readNest(
          code.extendWithNestScope(input, {
            index: 0,
            nest: link.nest,
          }),
        )

        str.push(text)
        break
      default:
        throw new Error('Oops')
    }
  })

  return str.join('')
}

export function resolveTextDependencyList(
  input: MeshInputType,
  job: (i: MeshInputType) => void,
): Array<SiteDependencyType> {
  const nest = code.assumeNest(input)

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

  const array: Array<SiteDependencyType> = []

  line.link.forEach(link => {
    switch (link.like) {
      case Tree.Cord:
        break
      case Tree.Slot:
        const dependencies = code.resolveNestDependencyList(
          code.extendWithNestScope(input, {
            index: 0,
            nest: link.nest,
          }),
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
  input: MeshInputType,
  size: number = 1,
): boolean {
  const nest = code.assumeNest(input)

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

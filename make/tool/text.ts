import { Link, LinkHint, Site, code } from '~'
import type {
  MeshInputType,
  SiteDependencyPartType,
  SiteDependencyType,
} from '~'

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
    case LinkHint.DynamicText: {
      code.processDynamicTextNest(input, job)
      break
    }
    case LinkHint.StaticText:
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

export function resolveText(
  input: MeshInputType,
): string | undefined {
  const nest = code.assumeNest(input)

  if (nest.like !== Link.Text) {
    return
  }

  const str: Array<unknown> = []

  nest.segment.forEach(seg => {
    switch (seg.like) {
      case Link.String:
        str.push(seg.value)
        break
      case Link.Plugin:
        const text = code.readNest(
          code.extendWithNestScope(input, {
            index: 0,
            nest: seg.nest[0],
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

  if (nest.like !== Link.Text) {
    return []
  }

  const array: Array<SiteDependencyType> = []

  nest.segment.forEach(seg => {
    switch (seg.like) {
      case Link.String:
        break
      case Link.Plugin:
        const dependencies = code.resolveTreeDependencyList(
          code.extendWithNestScope(input, {
            index: 0,
            nest: seg.nest[0],
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

export function resolveTreeDependencyList(
  input: MeshInputType,
  job: (i: MeshInputType) => void,
): Array<SiteDependencyType> {
  const array: Array<SiteDependencyType> = []
  const dependency: SiteDependencyType = {
    callbackList: [job],
    context: input,
    like: Site.Dependency,
    path: [],
  }
  array.push(dependency)

  const nest = code.assumeNest(input)

  switch (nest.like) {
    case Link.Term: {
      const name = code.resolveTerm(
        code.extendWithNestScope(input, {
          index: 0,
          nest,
        }),
      )

      code.assertString(name)

      const dependencyPart: SiteDependencyPartType = {
        callbackList: [],
        like: Site.DependencyPart,
        name,
        parent: dependency,
      }

      dependency.path.push(dependencyPart)
      break
    }
    case Link.Path: {
      break
    }
    case Link.Tree: {
      break
    }
    default:
      throw new Error('Oops')
  }

  return array
}

export function textIsInterpolated(
  input: MeshInputType,
  size: number = 1,
): boolean {
  const nest = code.assumeNest(input)

  if (nest.like !== Link.Text) {
    return false
  }

  for (const seg of nest.segment) {
    if (seg.like === Link.Plugin) {
      return true
    }
  }

  return false
}

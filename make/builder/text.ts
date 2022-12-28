import { Internal, Nest, Tree, api } from '~'
import type {
  APIInputType,
  InternalDependencyPartType,
  InternalDependencyType,
  InternalScopeType,
  TreeNodeType,
} from '~'

export function parseTextIntoTree(text: string): TreeNodeType {
  return api.parseLinkText(text)
}

export function processDynamicTextNest(
  input: APIInputType,
  job: (i: APIInputType) => void,
): void {
  const dependencyList = api.resolveTextDependencyList(
    input,
    job,
  )

  const card = api.getProperty(input, 'card')
  api.assertCard(card)

  const unmetDependencyList = dependencyList.filter(dep =>
    api.checkDependency(input, dep),
  )

  card.base.dependency.push(...unmetDependencyList)

  if (!unmetDependencyList.length) {
    job(input)
  }
}

export function processTextNest(
  input: APIInputType,
  job: (i: APIInputType) => void,
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
  input: APIInputType,
  dependency: InternalDependencyType,
): unknown {
  const scope = api.findInitialScope(input, dependency)

  if (scope) {
    let value: unknown = scope.data

    dependency.path.forEach(part => {
      if (api.isRecord(value)) {
        const childValue = value[part.name]
        value = childValue
      } else {
        value = undefined
      }
    })

    return value
  }
}

export function readNest(input: APIInputType): unknown {
  let scope: InternalScopeType = input.lexicalScope

  api.assumeNest(input).line.forEach(nest => {
    switch (nest.like) {
      case Tree.Term:
        const name = api.resolveStaticTerm(
          api.extendWithObjectScope(input, nest),
        )

        api.assertString(name)

        // TODO
        // if (api.isRecord(scope.data) && name in scope.data) {
        //   scope = scope.data[name]
        // }
        break
      default:
        throw new Error(nest.like)
    }
  })

  return undefined
  // return value
}

export function resolveNestDependencyList(
  input: APIInputType,
  job: (i: APIInputType) => void,
): Array<InternalDependencyType> {
  const array: Array<InternalDependencyType> = []
  const dependency: InternalDependencyType = {
    callbackList: [job],
    children: [],
    context: input,
    like: Internal.Dependency,
    partial: false,
    path: [],
  }
  array.push(dependency)

  api.assumeNest(input).line.forEach(nest => {
    if (nest.like === Tree.Term) {
      // TODO: solve for interpolated terms too.
      const name = api.resolveStaticTerm(
        api.extendWithObjectScope(input, nest),
      )

      api.assertString(name)

      const dependencyPart: InternalDependencyPartType = {
        callbackList: [],
        like: Internal.DependencyPart,
        name,
        parent: dependency,
      }

      dependency.path.push(dependencyPart)
    }
  })

  return array
}

export function resolveText(
  input: APIInputType,
): string | undefined {
  const nest = api.assumeNest(input)

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
        const text = api.readNest(
          api.extendWithNestScope(input, {
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
  input: APIInputType,
  job: (i: APIInputType) => void,
): Array<InternalDependencyType> {
  const nest = api.assumeNest(input)

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

  const array: Array<InternalDependencyType> = []

  line.link.forEach(link => {
    switch (link.like) {
      case Tree.Cord:
        break
      case Tree.Slot:
        const dependencies = api.resolveNestDependencyList(
          api.extendWithNestScope(input, {
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
  input: APIInputType,
  size: number = 1,
): boolean {
  const nest = api.assumeNest(input)

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

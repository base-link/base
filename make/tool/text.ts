import { Link, LinkHint, code } from '~'
import type {
  SiteDependencyPartType,
  SiteDependencyType,
  SiteProcessInputType,
} from '~'

export function assertStringPattern(
  input: SiteProcessInputType,
  string: string,
  pattern: RegExp,
): void {
  if (!string.match(pattern)) {
    code.throwError(code.generateInvalidPatternError(input, pattern))
  }
}

export function processDynamicTextNest(
  input: SiteProcessInputType,
  job: (i: SiteProcessInputType) => void,
): void {
  const dependencyList = code.resolveTextDependencyList(input, job)

  const card = input.module

  const unmetDependencyList = dependencyList.filter(
    dep => !code.checkDependency(input, dep),
  )

  // card.base.dependency.push(...unmetDependencyList)

  if (!unmetDependencyList.length) {
    job(input)
  }
}

export function processTextNest(
  input: SiteProcessInputType,
  job: (i: SiteProcessInputType) => void,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.DynamicText: {
      code.processDynamicTextNest(input, job)
      break
    }
    case LinkHint.StaticText:
      job(input)
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

export function readDependency(
  input: SiteProcessInputType,
  dependency: SiteDependencyType,
): unknown {
  const scope = code.findInitialEnvironment(input, dependency)

  if (scope) {
    let value: unknown = scope.bindings

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

export function readLinkIndex(input: SiteProcessInputType): unknown {
  const nest = input.link.element

  if (nest.type === Link.Index) {
    const child = nest.nest[0]
    code.assertGenericLink(child)

    switch (child.type) {
      case Link.Tree:
        return readLinkTree(
          code.withEnvironment(input, {
            nest: child,
          }),
        )
      case Link.Path:
        return readLinkPath(
          code.withEnvironment(input, {
            nest: child,
          }),
        )
      case Link.Term:
        return readLinkTerm(
          code.withEnvironment(input, {
            nest: child,
          }),
        )
      default:
        throw new Error('Never')
    }
  }
}

export function readLinkPath(input: SiteProcessInputType): unknown {
  const nest = input.link.element
  code.assertLink(nest, Link.Path)

  let i = 0

  const first = nest.segment[i++]
  const firstTerm = code.resolveTermString(
    code.withEnvironment(input, { nest: first }),
  )

  code.assertString(firstTerm)
  let value = code.getEnvironmentProperty(input.environment, firstTerm)

  while (i < nest.segment.length) {
    const seg = nest.segment[i++]

    switch (seg?.type) {
      case Link.Index: {
        const index = code.readLinkIndex(
          code.withEnvironment(input, { nest: seg }),
        )

        if (code.isRecord(value) && code.isString(index)) {
          value = code.getProperty(value, index)
        } else {
          value = undefined
        }
        break
      }
      case Link.Term: {
        const term = code.resolveTermString(
          code.withEnvironment(input, { nest: seg }),
        )

        if (code.isRecord(value) && code.isString(term)) {
          value = code.getProperty(value, term)
        } else {
          value = undefined
        }
        break
      }
      default:
        throw new Error('Compiler error')
    }
  }

  return value
}

export function readLinkPlugin(input: SiteProcessInputType): unknown {
  const nest = input.link.element

  if (nest.type === Link.Plugin) {
    const child = nest.nest[0]
    code.assertGenericLink(child)

    switch (child.type) {
      case Link.Tree:
        return readLinkTree(
          code.withEnvironment(input, {
            nest: child,
          }),
        )
      case Link.Path:
        return readLinkPath(
          code.withEnvironment(input, {
            nest: child,
          }),
        )
      case Link.Term:
        return readLinkTerm(
          code.withEnvironment(input, {
            nest: child,
          }),
        )
      default:
        throw new Error('Never')
    }
  }
}

export function readLinkTerm(input: SiteProcessInputType): unknown {
  const term = code.resolveTermString(input)
  code.assertString(term)
  return code.getEnvironmentProperty(input.environment, term)
}

export function readLinkTree(input: SiteProcessInputType): unknown {
  const nest = input.link.element
  code.assertLink(nest, Link.Tree)
  throw new Error('TODO')
  return undefined
}

export function resolvePathDependencyList(
  input: SiteProcessInputType,
  parent: SiteDependencyType,
): Array<SiteDependencyPartType> {
  const array: Array<SiteDependencyPartType> = []

  const path = code.assumeLink(input, Link.Path)

  path.segment.forEach(seg => {
    if (seg.type === Link.Index) {
      code.throwError(code.generateCompilerTodoError())
    } else {
      array.push(
        ...resolveTermStringDependencyList(
          code.withEnvironment(input, { nest: seg }),
          parent,
        ),
      )
    }
  })

  return array
}

export function resolveTermStringDependencyList(
  input: SiteProcessInputType,
  parent: SiteDependencyType,
): Array<SiteDependencyPartType> {
  const name = code.resolveTermString(input)

  code.assertString(name)

  const dependencyPart: SiteDependencyPartType = {
    callbackList: [],
    name,
    parent,
  }

  return [dependencyPart]
}

export function resolveText(
  input: SiteProcessInputType,
): string | undefined {
  const nest = input.link.element

  if (nest.type !== Link.Text) {
    return
  }

  const str: Array<unknown> = []

  nest.segment.forEach(seg => {
    switch (seg.type) {
      case Link.String:
        str.push(seg.value)
        break
      case Link.Plugin:
        const text = code.readLinkPlugin(
          code.withEnvironment(input, {
            index: 0,
            nest: seg,
          }),
        )

        str.push(text)
        break
      default:
        code.throwError(code.generateInvalidCompilerStateError())
    }
  })

  return str.join('')
}

export function resolveTextDependencyList(
  input: SiteProcessInputType,
  job: (i: SiteProcessInputType) => void,
): Array<SiteDependencyType> {
  const nest = input.link.element

  if (nest.type !== Link.Text) {
    return []
  }

  const array: Array<SiteDependencyType> = []

  nest.segment.forEach(seg => {
    switch (seg.type) {
      case Link.String:
        break
      case Link.Plugin:
        const dependencies = code.resolveTreeDependencyList(
          code.withEnvironment(input, {
            index: 0,
            nest: seg.nest[0],
          }),
          job,
        )
        array.push(...dependencies)
        break
      default:
        code.throwError(code.generateInvalidCompilerStateError())
    }
  })

  return array
}

export function resolveTreeDependencyList(
  input: SiteProcessInputType,
  job: (i: SiteProcessInputType) => void,
): Array<SiteDependencyType> {
  const array: Array<SiteDependencyType> = []
  const dependency: SiteDependencyType = {
    callbackList: [job],
    context: input,
    path: [],
  }
  array.push(dependency)

  const nest = input.link.element

  switch (nest.type) {
    case Link.Term: {
      dependency.path.push(
        ...resolveTermStringDependencyList(input, dependency),
      )
      break
    }
    case Link.Path: {
      dependency.path.push(
        ...resolvePathDependencyList(input, dependency),
      )
      break
    }
    case Link.Tree: {
      code.throwError(code.generateCompilerTodoError())
      break
    }
    default:
      code.throwError(code.generateInvalidCompilerStateError())
  }

  return array
}

export function textIsInterpolated(
  input: SiteProcessInputType,
  size: number = 1,
): boolean {
  const nest = input.link.element

  if (nest.type !== Link.Text) {
    return false
  }

  for (const seg of nest.segment) {
    if (seg.type === Link.Plugin) {
      return true
    }
  }

  return false
}

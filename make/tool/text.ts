import {
  CompilerError,
  Link,
  LinkHint,
  SiteDependencyObserverParentType,
  SiteDependencyObserverType,
  code,
} from '~'
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

export function assumeText(input: SiteProcessInputType): string {
  const text = code.resolveText(input)
  code.assertString(text)
  return text
}

export function bindText(
  input: SiteProcessInputType,
  callback: () => void,
): void {
  const dependencyTree = code.resolveTextDependencyTree(input)
  const leafDependencyList = code.getLeafDependencyList(dependencyTree)
}

export function connectDependency(
  parent: SiteDependencyObserverType,
  binding: SiteDependencyObserverParentType,
  child: SiteDependencyObserverType,
): void {
  child.parent = binding
  binding.remaining++
  parent.children.push(child)
}

export function getLeafDependencyList(
  tree: SiteDependencyObserverType,
  array: Array<SiteDependencyObserverType> = [],
): Array<SiteDependencyObserverType> {
  tree.children.forEach(child => {
    if (typeof child === 'object') {
      if (!child.children.length) {
        array.push(child)
      } else {
        getLeafDependencyList(child, array)
      }
    }
  })
  return array
}

export function processDynamicTextNest(
  input: SiteProcessInputType,
): void {
  const dependencyList = code.resolveTextDependencyTree(input)

  const card = input.module

  const unmetDependencyTree = dependencyList.filter(
    dep => !code.checkDependency(input, dep),
  )

  // card.base.dependency.push(...unmetDependencyTree)

  if (!unmetDependencyTree.length) {
    job(input)
  }
}

export function readLinkIndex(input: SiteProcessInputType): unknown {
  const nest = input.link.element

  if (nest.type === Link.Index) {
    const child = nest.nest[0]
    code.assertGenericLink(child)

    switch (child.type) {
      case Link.Tree:
        return code.readLinkTree(code.withLink(input, child))
      case Link.Path:
        return code.readLinkPath(code.withLink(input, child))
      case Link.Term:
        return code.readLinkTerm(code.withLink(input, child))
      default:
        throw new Error('Never')
    }
  }
}

export function readLinkPath(input: SiteProcessInputType): unknown {
  const nest = code.assumeLink(input, Link.Path)

  let i = 0

  const first = nest.segment[i++]
  code.assertGenericLink(first)
  const firstTerm = code.resolveTermString(code.withLink(input, first))

  code.assertString(firstTerm)
  let value = code.getEnvironmentProperty(input.environment, firstTerm)

  while (i < nest.segment.length) {
    const seg = nest.segment[i++]

    switch (seg?.type) {
      case Link.Index: {
        const index = code.readLinkIndex(code.withLink(input, seg))

        if (code.isRecord(value) && code.isString(index)) {
          value = code.getProperty(value, index)
        } else {
          value = undefined
        }
        break
      }
      case Link.Term: {
        const term = code.resolveTermString(code.withLink(input, seg))

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
        return code.readLinkTree(code.withLink(input, child))
      case Link.Path:
        return code.readLinkPath(code.withLink(input, child))
      case Link.Term:
        return code.readLinkTerm(code.withLink(input, child))
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

export function resolveDynamicPathDependencyTree(
  input: SiteProcessInputType,
): SiteDependencyObserverType {
  const path = code.assumeLink(input, Link.Path)

  const observer = {
    children: [],
    node: path,
    path: [],
  }

  const binding = {
    observer,
    remaining: 0,
  }

  path.segment.forEach((seg, i) => {
    if (seg.type === Link.Index) {
      code.throwError(code.generateCompilerTodoError())
    } else {
      code.connectDependency(
        observer,
        binding,
        resolveTermDependencyTree(code.withLink(input, seg, i)),
      )
    }
  })

  return observer
}

export function resolveDynamicTermDependencyTree(
  input: SiteProcessInputType,
): SiteDependencyObserverType {
  const term = code.assumeLink(input, Link.Term)

  const observer: SiteDependencyObserverType = {
    children: [],
    node: term,
    path: [],
  }

  const binding = {
    observer,
    remaining: 0,
  }

  term.segment.forEach((seg, i) => {
    if (seg.type === Link.String) {
      observer.children.push(seg.value)
    } else {
      code.connectDependency(
        observer,
        binding,
        code.resolvePluginDependencyTree(code.withLink(input, seg, i)),
      )
    }
  })

  return observer
}

export function resolvePathDependencyTree(
  input: SiteProcessInputType,
): SiteDependencyObserverType {
  const type = code.getLinkHint(input)

  switch (type) {
    case LinkHint.StaticPath: {
      return code.resolveStaticPathDependencyTree(input)
    }
    case LinkHint.DynamicPath: {
      return code.resolveDynamicPathDependencyTree(input)
    }
    default:
      code.throwError(code.generateInvalidCompilerStateError())
      throw new CompilerError()
  }
}

export function resolvePluginDependencyTree(
  input: SiteProcessInputType,
): SiteDependencyObserverType {
  const nest = input.link.element

  const observer = {
    children: [],
    node: nest,
    path: [],
  }

  const binding = {
    observer,
    remaining: 0,
  }

  switch (nest.type) {
    case Link.Term: {
      code.connectDependency(
        observer,
        binding,
        code.resolveTermDependencyTree(input),
      )
      break
    }
    case Link.Path: {
      code.connectDependency(
        observer,
        binding,
        code.resolvePathDependencyTree(input),
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

  return observer
}

export function resolveStaticPathDependencyTree(
  input: SiteProcessInputType,
): SiteDependencyObserverType {
  const path = code.assumeLink(input, Link.Path)

  const observer = {
    children: [],
    node: path,
    path: [],
  }

  const binding = {
    observer,
    remaining: 0,
  }

  path.segment.forEach((seg, i) => {
    if (seg.type === Link.Index) {
      code.throwError(code.generateCompilerTodoError())
    } else {
      code.connectDependency(
        observer,
        binding,
        resolveTermDependencyTree(code.withLink(input, seg, i)),
      )
    }
  })

  return observer
}

export function resolveStaticTermDependencyTree(
  input: SiteProcessInputType,
): SiteDependencyObserverType {
  const term = code.assumeLink(input, Link.Term)
  const string: Array<string> = []

  const observer: SiteDependencyObserverType = {
    children: [],
    node: term,
    path: [],
  }

  term.segment.forEach((seg, i) => {
    if (seg.type === Link.String) {
      string.push(seg.value)
    } else {
      code.throwError(code.generateInvalidCompilerStateError())
    }
  })

  observer.path.push(string.join(''))

  return observer
}

export function resolveTermDependencyTree(
  input: SiteProcessInputType,
): SiteDependencyObserverType {
  const type = code.getLinkHint(input)

  switch (type) {
    case LinkHint.StaticTerm: {
      return code.resolveStaticTermDependencyTree(input)
    }
    case LinkHint.DynamicTerm: {
      return code.resolveDynamicTermDependencyTree(input)
    }
    default:
      code.throwError(code.generateInvalidCompilerStateError())
      throw new CompilerError()
  }
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
        const text = code.readLinkPlugin(code.withLink(input, seg, 0))
        str.push(text)
        break
      default:
        code.throwError(code.generateInvalidCompilerStateError())
    }
  })

  return str.join('')
}

export function resolveTextDependencyTree(
  input: SiteProcessInputType,
): SiteDependencyObserverType {
  const nest = code.assumeLink(input, Link.Text)

  const observer: SiteDependencyObserverType = {
    children: [],
    node: nest,
    path: [],
  }

  const binding = {
    observer,
    remaining: 0,
  }

  nest.segment.forEach(seg => {
    switch (seg.type) {
      case Link.String:
        observer.children.push(seg.value)
        break
      case Link.Plugin:
        const childNest = seg.nest[0]
        code.assertGenericLink(childNest)
        code.connectDependency(
          observer,
          binding,
          code.resolvePluginDependencyTree(
            code.withLink(input, childNest, 0),
          ),
        )
        break
      default:
        code.throwError(code.generateInvalidCompilerStateError())
    }
  })

  return observer
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

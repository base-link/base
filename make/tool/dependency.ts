import {
  CompilerError,
  Link,
  LinkHint,
  SiteDependencyObserverParentType,
  SiteDependencyObserverType,
  SiteProcessInputType,
  code,
} from '~'

export function addDependencyTreeObserver(
  input: SiteProcessInputType,
  list: Array<SiteDependencyObserverType>,
): void {
  // list.forEach()
}

export function canResolveDependencyTree(
  input: SiteProcessInputType,
  list: Array<SiteDependencyObserverType>,
): boolean {
  if (list.length === 0) {
    return true
  }

  const stack = list.concat()

  while (stack.length) {
    const observer = stack.shift()
    code.assertRecord(observer)

    // we made it back to the base
    if (!observer.parent) {
      return true
    }

    const name = observer.path[0]
    code.assertString(name)

    if (code.hasEnvironmentVariable(input.environment, name)) {
      if (observer.parent) {
        observer.parent.remaining--
        if (observer.parent.remaining === 0) {
          stack
        }
      }
    }
  }

  return false
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

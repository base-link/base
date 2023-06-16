import { MeshLoad } from '../form'

export function addDependencyTreeObserver(
  load: MeshLoad,
  list: Array<SiteDependencyObserverType>,
): void {
  // list.forEach()
}

export function canResolveDependencyTree(
  load: MeshLoad,
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

    if (code.hasEnvironmentVariable(load.environment, name)) {
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
  load: MeshLoad,
): SiteDependencyObserverType {
  const path = code.assumeLink(load, Link.Path)

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
        resolveTermDependencyTree(code.withLink(load, seg, i)),
      )
    }
  })

  return observer
}

export function resolveDynamicTermDependencyTree(
  load: MeshLoad,
): SiteDependencyObserverType {
  const term = code.assumeLink(load, Link.Term)

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
        code.resolvePluginDependencyTree(code.withLink(load, seg, i)),
      )
    }
  })

  return observer
}

export function resolvePathDependencyTree(
  load: MeshLoad,
): SiteDependencyObserverType {
  const type = code.getLinkHint(load)

  switch (type) {
    case LinkHint.StaticPath: {
      return code.resolveStaticPathDependencyTree(load)
    }
    case LinkHint.DynamicPath: {
      return code.resolveDynamicPathDependencyTree(load)
    }
    default:
      code.throwError(code.generateInvalidCompilerStateError())
      throw new CompilerError()
  }
}

export function resolvePluginDependencyTree(
  load: MeshLoad,
): SiteDependencyObserverType {
  const nest = load.link.element

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
        code.resolveTermDependencyTree(load),
      )
      break
    }
    case Link.Path: {
      code.connectDependency(
        observer,
        binding,
        code.resolvePathDependencyTree(load),
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
  load: MeshLoad,
): SiteDependencyObserverType {
  const path = code.assumeLink(load, Link.Path)

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
        resolveTermDependencyTree(code.withLink(load, seg, i)),
      )
    }
  })

  return observer
}

export function resolveStaticTermDependencyTree(
  load: MeshLoad,
): SiteDependencyObserverType {
  const term = code.assumeLink(load, Link.Term)
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
  load: MeshLoad,
): SiteDependencyObserverType {
  const type = code.getLinkHint(load)

  switch (type) {
    case LinkHint.StaticTerm: {
      return code.resolveStaticTermDependencyTree(load)
    }
    case LinkHint.DynamicTerm: {
      return code.resolveDynamicTermDependencyTree(load)
    }
    default:
      code.throwError(code.generateInvalidCompilerStateError())
      throw new CompilerError()
  }
}

export function resolveTextDependencyTree(
  load: MeshLoad,
): SiteDependencyObserverType {
  const nest = code.assumeLink(load, Link.Text)

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
            code.withLink(load, childNest, 0),
          ),
        )
        break
      default:
        code.throwError(code.generateInvalidCompilerStateError())
    }
  })

  return observer
}
